const dotenv = require('dotenv');
const express = require('express');
const { urlencoded, json } = require('express');
dotenv.config({ path: '../.env' });

const port = process.env.SERVER_PORT || 3000;

const app = express();
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

require('./routes/auth.routes')(app);
require('./routes/protectedRoutes/index.routes')(app);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
