require('dotenv').config()
const getPlayResultJSON = require('./elastic_request')
const jsonWrite = require('./jsonwrite')

async function main() {
  const res = await getPlayResultJSON()
  await jsonWrite(res)
}

main()
