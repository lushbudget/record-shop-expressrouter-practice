const express = require("express")
const apiRouter = express.Router();

apiRouter.use('/', (req, res) => {
  res.send('THIS IS THE ROOT FOR THE API')
})

const recordsRouter = require('./records.js');
apiRouter.use('/records', recordsRouter);



module.exports = apiRouter;