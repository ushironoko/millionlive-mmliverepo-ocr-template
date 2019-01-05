require('dotenv').config()
const jsonWrite = require('./jsonwrite')
const getPlayResultJSON = require('./elastic_request')
const download = require('./download')
const ocr = require('./ocr')

function main() {
  //ElasticsearchからJSON取得
  getPlayResultJSON()
    .then(res => {
      //取得したJSONをファイルにエクスポート
      jsonWrite(res)
    })
    .then(() => {
      //response.json の url を使って画像を取得
      download()
    })
    .then(() => {
      //images/ 配下の画像を OCR 読み取りして結果をエクスポート
      ocr()
    })
}

main()
