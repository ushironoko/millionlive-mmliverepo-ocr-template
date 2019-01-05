require('dotenv').config()
const jsonWrite = require('./jsonwrite')
const getPlayResultJSON = require('./elastic_request')

function main() {
  getPlayResultJSON().then(res => {
    jsonWrite(res)
  })
}

main()
