const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const bookServer = 'http://localhost:3001';
const reviewsServer = 'http://localhost:3002';
const similarServer = 'http://localhost:3003';
const gridServer = 'http://localhost:3004';

const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/rooms/:homeid', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.all('')

app.all('/rooms/:homeid/reviews', (req, res) => {
  console.log("redirecting to Reviews server");
  apiProxy.web(req, res, {target: reviewsServer});
});

app.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`)
});
