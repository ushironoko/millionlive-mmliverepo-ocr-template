require('dotenv').config()
const getPlayResultJSON = require('./elastic_request')
const jsonWrite = require('./jsonwrite')
const download = require('./download')

async function main() {
  const res = await getPlayResultJSON()
  console.log(res)
  await jsonWrite(res)
  console.log(res)
  await download()
}

main()