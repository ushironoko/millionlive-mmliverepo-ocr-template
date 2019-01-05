const fsExtra = require('fs-extra')

module.exports = async function jsonWrite(res) {
  try {
    await fsExtra.writeJson('./response.json', res.hits.hits)
    console.log('write complete')
  } catch (error) {
    console.error(error)
  }
}
