# millionlive-mmliverepo-ocr-template

## これは何？

MillionMIXライブレポート結果ツイート画像から情報を取得してため込むテンプレート

## 構成

- Elasticsearch（Amazon Elasticsearch Service）
- Logstash
  - Logstash Twitter input plugin
  - logstash-output-amazon_es（Amazon Elasticsearch Serviceの場合）
- Tesseract

## 簡単な流れ

1. LogstashがTwitter input pluginで特定キーワード検索をして、結果をlogstash-output-amazon_esでAWSのElasticsearchへプッシュ
2. Elasticserchへsearch、レスポンスを `response.json` へ書き込み
3. `response.json` を `download.js` が読み込んで、`media_url` から画像を取得、取得結果をTesseract.jsで読み取り

## 備考

- Logstashの検索ワード設定次第でMMレポ以外も読める。"6MIXのライブレポート" とか。そうするとより広範囲のPの統計が取れる。
- Tesseract.jsの精度が微妙。座標とか入れてないから当然だけど、出力がJSONじゃないのが結構辛く、より高精度で扱いやすいサービスに差し替えるのも手。
- Logstashを動かすインスタンスは最低でもメモリ2GB必要。念のため4GB確保しておくのもあり。EC2インスタンスで言えばt2.midium以上になる。
- Logstash、Elasticsearchのインデックス、このリポジトリの`elasticsearchapi.js`、`.env`を対応する形へ書き換えることでミリシタのスクショ以外に対応させることができる。
- OCR結果をどこかへアップロードする機能はない。（そのうち作る）