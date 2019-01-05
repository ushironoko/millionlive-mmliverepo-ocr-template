const request = require('request')
const fs = require('fs')
const repo = require('../response.json')

async function imageRequest(url, writeFileStream, filename) {
  await request(url)
    .pipe(writeFileStream)
    .on('close', function() {
      console.log(url, 'saved to', filename)
    })
}

module.exports = function download() {
  try {
    const parse = repo.map(x => {
      return x._source.entities
    })

    const urls = parse.filter(x => x != null).map(x => {
      return x.media[0].media_url_https
    })

    urls.map(x => {
      let s = x.lastIndexOf('/')
      let filename = x.substr(s + 1)

      let writeFileStream = fs.createWriteStream(
        process.env.IMAGES_PATH + filename
      )
      imageRequest(x, writeFileStream, filename)
    })
  } catch (error) {
    console.log(error)
  }
}
