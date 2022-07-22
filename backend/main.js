const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const { urlencoded, json } = require('express');
const { Server } = require('socket.io');
const errorHandle = require('./middleware/errorHandle');

const app = express();
const server = require('http').createServer(app);
const io = new Server(server, {
  path: '/socket',
});

dotenv.config({ path: '../.env' });

const port = process.env.SERVER_PORT || 3000;

app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use(json());
app.use(urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, Content-Type, Accept'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const apiRouter = express.Router();
require('./routes')(apiRouter);
app.use('/api', apiRouter);

app.use(errorHandle);

require('./socket')(io);

server.listen(port, () => {
  console.log('Server is running on port ' + port);
});
