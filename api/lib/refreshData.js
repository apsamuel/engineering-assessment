import compileData from './compileData.js'
import path from 'node:path'
import { writeFile } from 'node:fs/promises'


const refreshData = async () => {
  const data = await compileData()
  await writeFile('./data/foodTrucks.json', JSON.stringify(data, null, 2), 'utf-8')
}


// await refreshData()
export default refreshData