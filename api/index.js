import express from 'express';
import cors from 'cors'
import compileData from './lib/compileData.js';

const app = express();
const port = process.env.API_PORT || 8080;


const apiLogger = (req, res, next) => {
  console.log(`api-${req.method.toLowerCase()}`, JSON.stringify({
    timestamp: new Date().toISOString(),
    client: {
      ip: req.ip,
      host: req.headers.host,
      origin: req.headers.origin,
      accept: req.headers.accept,
      agent: req.headers['user-agent'],
    },
    method: req.method,
    url: req.url,
    query: req.query || 'no query',
    params: req.params || 'no params',
    body: req.body,
  }, null, 2))
}

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hungree? You came to the right place!');
})

app.get('/api', (req, res) => {
  apiLogger(req, res);
  res.json({
    message: 'Welcome to the API',
    description: "this is a get specific API (currently)",
    usage: {
      '/api': 'this message',
      '/api/trucks': 'all trucks',
      '/api/trucks/categories': 'all truck categories',
      '/api/trucks/vendors': 'all truck vendors',
      '/api/trucks/vendors/:vendor': 'all trucks for a vendor',
      '/api/trucks/vendors/:vendor/categories': 'all categories for a vendor',
    }
  })
})

app.get('/api/trucks', async (req, res) => {
  apiLogger(req, res);
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



app.get('/api/trucks/categories', async (req, res) => {
  apiLogger(req, res);
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const categories = data
    .map((truck) => truck.fooditems)
    .filter(Boolean)
    .join(';')
    .split(new RegExp('[;:.]', 'g'))
    .map((item) => item.trim().toLowerCase())
    // General Market replacements
    .map((item) => item.replace(
      new RegExp(`(${[
        'all types of food except for bbq on site per fire safety',
        'various menu items & drinks',
        'multiple food trucks & food types'
      ].join('|')})`, 'g'), 'General Market'
    ))
    // Asian Fusion replacements
    .map((item) => item.replace(
      'asian fusion - japanese sandwiches/sliders/misubi', 'Asian Fusion'
    ))
    // Locally Sourced Organics
    .map((item) => item.replace('daily rotating menus consisting of various local & organic vegetable', 'Local Organic'))
    // Sandwiches
    .map((item) => item.replace('pre-packaged swiches', 'Sandwiches'))
    // .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  res.json(Array.from(new Set(categories)))
})

app.get('/api/trucks/vendors', async (req, res) => {
  apiLogger(req, res);
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const vendors = Array.from(new Set(data.map((truck) => truck.applicant)));
  res.json(vendors)
})

app.get('/api/trucks/vendors/:vendor', async (req, res) => {
  apiLogger(req, res);
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const vendor = decodeURIComponent(req.params.vendor);
  const trucks = data.filter((truck) => truck.applicant === vendor);
  res.json(trucks)
})

app.get('/api/trucks/vendors/:vendor/categories', async (req, res) => {
  apiLogger(req, res);
  const compiled = await compileData();
  const headers = compiled[0];
  const data = compiled.slice(1, )
  const vendor = decodeURIComponent(req.params.vendor);
  const trucks = data.filter((truck) => truck.applicant === vendor);
  const categories = trucks
    .map((truck) => truck.fooditems)
    .filter(Boolean)
    .join(';')
    .split(new RegExp('[;:.]', 'g'))
    .map((item) => item.trim())
    .map((item) => item.toLowerCase())
    // general character replacements
    .map((item) => item.trim().toLowerCase().replace( /[/]/, ' & '  ))
    // specific replacements
    .map((item) => item.replace('all types of food except for bbq on site per fire safety', 'General Market'))
    .map((item) => item.replace('asian fusion - japanese sandwiches/sliders/misubi', 'Asian Fusion'))
    .map((item) => item.replace('daily rotating menus consisting of various local & organic vegetable', 'Local Organic'))
    .map((item) => item.replace('pre-packaged swiches', 'Packaged Sandwiches'))
    .filter(Boolean);
  return res.json(Array.from(new Set(categories)))
})

app.listen(port, () => {
  console.log(`hungree-api is available on port ${port}`)
})