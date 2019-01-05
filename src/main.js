require('dotenv').config()
const jsonWrite = require('./jsonwrite')
const getPlayResultJSON = require('./elastic_request')
const download = require('./download')

async function requestImages() {
  const res = await getPlayResultJSON()

  await jsonWrite(res)

  await download()
}

requestImages()
