import express from 'express';
import cors from 'cors'
import compileData from './lib/compileData.js';

const app = express();
app.use(cors());
const port = 8080;


app.get('/', (req, res) => {
  res.send('Hungry?');
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})

app.get('/api/trucks', async (req, res) => {
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  res.json(data)
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})