const fs = require('fs')
const log_file = fs.createWriteStream(__dirname + '/log.log', { flags: 'w' })
const log_stdout = process.stdout
const Tesseract = require('tesseract.js')
const filename = './images/pic.png'

Tesseract.recognize(filename)
  .progress(function(p) {
    console.log('progress', p)
  })
  .catch(err => console.error(err))
  .then(function(result) {
    log_file.write(result.text)
    log_stdout.write(result.text)
    process.exit(0)
  })
