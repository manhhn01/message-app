const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const app = express();
const apiRouter = express.Router();

app.use(express.json());

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
