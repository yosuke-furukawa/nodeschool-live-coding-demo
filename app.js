const express = require('express');
const app = express();
const axios = require('axios');
const qs = require('querystring');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const API_GIFMAGAZINE_DOMAIN = 'http://api.gifmagazine.net';
const API_GIFMAGAZINE_PATH = '/v1/gifs/search';
const API_URL = API_GIFMAGAZINE_DOMAIN + API_GIFMAGAZINE_PATH;
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'template', 'main.tmpl'));
const compiled = _.template(TEMPLATE);

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  const q = qs.stringify(req.query);
  const url = API_URL + '?' + q;
  axios.get(url).then((results) => {
    const data = results.data.data;
    const images = data.map((d) => `<li><img src=${d.image.default.url} /></li>`);
    res.send(compiled({images: images, q: req.query.q}));
  }).catch(next);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
