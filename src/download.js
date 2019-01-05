const request = require('request')
const fs = require('fs')
const repo = require('../response.json')
const imagepath = './images/'

async function imageRequest(url,writeFileStream,filename) {
  await request(url)
  .pipe(writeFileStream)
  .on('close', function() {
    console.log(url, 'saved to', filename)
  })
}

const parse = repo.map(x => {
  return x._source.entities
})

const urls = parse.filter(x => x != null).map(x => {
  return x.media[0].media_url_https
})

urls.map(x => {
  let s = x.lastIndexOf('/')
  let filename = x.substr(s + 1)

  const writeFileStream = fs.createWriteStream(imagepath + filename)
  imageRequest(x,writeFileStream,filename)
})
