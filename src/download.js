const request = require('request')
const fs = require('fs')
const ocr = require('./ocr')

module.exports = function download() {
  try {
    let repo = JSON.parse(fs.readFileSync('./response.json', 'utf8'))
    const parse = repo.map(x => {
      return x._source.entities
    })

    const urls = parse.filter(x => x != null).map(x => {
      return x.media[0].media_url_https
    })

    urls.map(url => {
      let s = url.lastIndexOf('/')
      let filename = url.substr(s + 1)
      let filepath = process.env.IMAGES_DIR_PATH + filename
      let writeFileStream = fs.createWriteStream(filepath)

      request(url)
        .pipe(writeFileStream)
        .on('close', function() {
          console.log(url, 'saved')
        })
    })
  } catch (error) {
    console.log(error)
  }
}
