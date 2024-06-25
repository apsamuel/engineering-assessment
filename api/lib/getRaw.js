import  https from 'node:https'

const url = 'https://data.sfgov.org/api/views/rqzj-sfat/rows.json?accessType=DOWNLOAD'

const getRaw = async (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = ''
      response.on('data', chunk => {
        data += chunk
      })
      response.on('end', () => {
        resolve(data)
      })
    })
  })
}

export default getRaw