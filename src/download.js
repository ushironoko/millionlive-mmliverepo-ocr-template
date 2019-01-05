const request = require('request')
const fs = require('fs')
const url = 'https://pbs.twimg.com/media/DwF7SBvUcAUK6kq.jpg'
const filename = './images/pic.png'

const writeFileStream = fs.createWriteStream(filename)

request(url)
  .pipe(writeFileStream)
  .on('close', function() {
    console.log(url, 'saved to', filename)
  })
