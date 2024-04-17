const express = require('express');
const app = express();
const morgan = require("morgan");
app.use(morgan('dev'));
const apiRouter = require('./api/index.js');
const PORT = 8080;
const client = require('./db/client.js');
client.connect();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})