# millionlive-mmliverepo-ocr-template

## これは何？

ミリオンライブの MillionMIX ライブレポート結果ツイート画像から情報を取得してため込むテンプレート

## 構成

- Elasticsearch(Amazon Elasticsearch Service)
- Logstash
  - Logstash Twitter input plugin
  - logstash-output-amazon_es(Amazon Elasticsearch Serviceの場合)
- Tesseract

## 簡単な流れ

1. Logstash が Twitter input plugin で特定キーワード検索をして、結果を logstash-output-amazon_es で AWS の Elasticsearch へプッシュ
2. Elasticserch へ search、レスポンスを `response.json` へ書き込み
3. `response.json` を `download.js` が読み込んで、`media_url` から画像を取得、取得結果を Tesseract.js で読み取り
