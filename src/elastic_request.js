const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: process.env.ELASTIC_SEARCH_URL,
  log: 'trace'
})

module.exports = async function getPlayResultJSON() {
  let res = ''
  try {
    res = await client.search({
      index: 'twitter',
      body: {
        sort: { '@timestamp': { order: 'desc' } },
        size: 20,
        _source: [
          'entities.media.display_url',
          'entities.media.media_url_https',
          'text'
        ],
        aggs: {},
        query: { match_all: {} }
      }
    })
    console.log(res.hits.hits)
  } catch (error) {
    console.trace(error.message)
  }
  return res
}
