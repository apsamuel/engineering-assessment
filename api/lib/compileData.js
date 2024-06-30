import getRaw from './getRaw.js'

const compileData = async (csv=false) => {
  try {
    const raw = await getRaw('https://data.sfgov.org/api/views/rqzj-sfat/rows.json?accessType=DOWNLOAD')
    const obj = JSON.parse(raw)
    const { meta, data } = obj
    const columnFields = meta.view.columns.map(column => column.fieldName)
    // create list of objects, or csv
    if (csv) return [ columnFields,...data ]
    return data.map((row) => {
      const obj = {}
      columnFields.map((field, index) => {
        obj[field] = row[index]
      })
      return obj
    })
  } catch (error) {
    console.log('error', error)
  }

}

export default compileData