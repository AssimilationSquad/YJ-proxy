const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.get('rooms/:homeid', (req, res) => {
//   res.sendFile(path.join(__dirname, )) //what are we path.joining with?
// })

// app.

app.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`)
});
