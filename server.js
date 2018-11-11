const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const compression = require('compression');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const bookServer = 'http://54.200.6.195';
const reviewsServer = 'http://18.144.35.212';
const similarServer = 'http://ec2-52-53-209-206.us-west-1.compute.amazonaws.com';
const gridServer = 'http://ec2-18-188-150-95.us-east-2.compute.amazonaws.com';

const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(compression());

app.get('/rooms/:homeid', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.all('/similar/rooms/:id', (req, res) => {
  console.log("redirecting to Similar server");
  apiProxy.web(req, res, {target: similarServer});
})

app.all('/rooms/:homeid/reviews', (req, res) => {
  console.log("redirecting to Reviews server");
  apiProxy.web(req, res, {target: reviewsServer});
});

app.all('/api/rooms/:id', (req, res) => {
  console.log("redirecting to Grid server");
  apiProxy.web(req, res, {target: gridServer});
});

app.all('/price/:roomid', (req, res) => {
  console.log("redirecting to Booking server");
  apiProxy.web(req, res, {target: bookServer});
});

app.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`)
});
