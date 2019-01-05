require('dotenv').config()
const getPlayResultJSON = require('./elasticsearchapi')
const jsonWrite = require('./jsonwrite')

async function fetchResource() {
  const res = await getPlayResultJSON()
  await jsonWrite(res)
}

fetchResource()
