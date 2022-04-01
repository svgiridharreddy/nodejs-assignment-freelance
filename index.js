const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

// const { getRedisClient } = require('./services/db.service');
// const path = require('path');


// const hostname = '127.0.0.1';
// const port = 8000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const PORT = 8000;

const routes = require('./routes');

const app = express();

// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

app.listen(PORT, () => {
console.log('Server listening on port: ' + PORT);
});
