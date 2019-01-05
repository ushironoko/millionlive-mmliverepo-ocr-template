require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Tesseract = require('tesseract.js')
const log_file = fs.createWriteStream('ocr_results.log', {
  flags: 'a'
})

async function readdir() {
  return new Promise(resolve => {
    fs.readdir(process.env.IMAGES_DIR_PATH, (error, list) => {
      const filepaths = list.map(x => path.join(process.env.IMAGES_DIR_PATH, x))
      resolve(filepaths)
    })
  })
}

async function recognize() {
  const filepaths = await readdir()

  return Promise.all(
    filepaths.map(async filepath => {
      await Tesseract.recognize(filepath)
        .progress(function(p) {
          console.log('progress', p)
        })
        .catch(err => console.error(err))
        .then(function(result) {
          log_file.write(result.text)
        })
    })
  )
}

recognize().then(() => process.exit(0))
