import express from 'express';
import cors from 'cors'
import compileData from './lib/compileData.js';

const app = express();
const port = process.env.API_PORT || 8080;


const apiLogger = (req, res, next) => {
  console.log(`api-${req.method.toLowerCase()}`, JSON.stringify({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    query: req.query || 'no query',
    params: req.params || 'no params',
    body: req.body,
  }, null, 2))
}

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hungree?');
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})

app.get('/api/trucks', async (req, res) => {
  apiLogger(req, res);
  // console.log(`api-${req.method.toLowerCase()}`, JSON.stringify({
  //   timestamp: new Date().toISOString(),
  //   url: req.url,
  //   query: req.query || 'no query',
  //   params: req.params || 'no params',
  //   body: req.body,
  // }, null, 2))
  const query = req.query;
  let { format } = query;
  if (!format) format = 'csv'
  const compiled = await compileData(
    // TODO: validate we can switch the
  );
  const headers = compiled[0];
  const data = compiled.slice(1, )
  res.json(data)
})

app.get('/api/trucks/vendors', async (req, res) => {
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const vendors = Array.from(new Set(data.map((truck) => truck.applicant)));
  res.json(vendors)
})

app.get('/api/trucks/categories', async (req, res) => {
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const categories = data
    .map((truck) => truck.fooditems)
    .filter(Boolean)
    .join(';')
    .split(new RegExp('[;:.]', 'g'))
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  res.json(Array.from(new Set(categories)))
})

app.get('/api/trucks/:vendor', async (req, res) => {
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const vendor = req.params.vendor;
  const trucks = data.filter((truck) => truck.applicant === vendor);
  res.json(trucks)
})

app.get('/api/trucks/:name/categories', async (req, res) => {
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const name = req.params.name;
  const trucks = data.filter((truck) => truck.applicant === name);
  const categories = trucks
    .map((truck) => truck.fooditems)
    .filter(Boolean)
    .join(';')
    .split(new RegExp('[;:.]', 'g'))
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return res.json(categories)
})

app.listen(port, () => {
  console.log(`hungree-api is available on port ${port}`)
})