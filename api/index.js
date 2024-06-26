import express from 'express';
import cors from 'cors'
import compileData from './lib/compileData.js';

const app = express();
const port = process.env.API_PORT || 8080;
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hungree?');
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})

// This is the endpoint that the frontend will hit to get the data
// expose query params for changing the data model between csv and json
app.get('/api/trucks', async (req, res) => {
  console.log(JSON.stringify({
    method: req.method,
    url: req.url,
    query: req.query,
    params: req.params,
    body: req.body,
  }, null, 2))
  const query = req.query;
  let { format } = query;
  if (!format) format = 'csv'
  const compiled = await compileData(
    // format === 'csv' ? true : false
  );
  const headers = compiled[0];
  const data = compiled.slice(1, )
  res.json(data)
})



app.listen(port, () => {
  console.log(`hungree-api is available on port ${port}`)
})