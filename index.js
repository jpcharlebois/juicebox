require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();
const app = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:8000'}));
server.use(cors());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

// server.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// GET - / - returns homepage
server.get('/', (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(__dirname + '/public/index.html');
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});