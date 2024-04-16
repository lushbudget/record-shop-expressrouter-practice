const express = require('express');
const app = express();
const morgan = require("morgan");
app.use(morgan('dev'));
const { createRecord, deleteRecord }  = require('./db/records.js');
const PORT = 8080;
const client = require('./db/client.js')
client.connect();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// app.use((req, res, next) => {
//   console.log("<___BODY LOGGER START_____>");
//   console.log(req.body);
//   console.log("<___BODY LOGGER END_______>");
//   next();
// })



// app.use('/', (req, res, next) => {
//   res.send(`HELLLOOOO`)
// })
// app.get('/records', async (req, res, next) => {
//   client.query(`
//   SELECT * FROM recor
//   `)
// })

app.post('/', async (req, res, next) => {
  try {
    const {artist_name, album_name, isAvailable} = req.body;
    const newRecord = await createRecord(artist_name, album_name, isAvailable);
    res.send(newRecord)
  } catch (error) {
    next(error)
 }
})

app.delete('/:id', async (req, res, next) => {
  try {
    const inputId = req.params.id;
    const result = deleteRecord(inputId);
    res.send(result)
  } catch (error) {
    res.sendStatus(500)
    next(error);
  }
})
app.get('/login', (req, res, next) => {
  res.send(`THIS IS LOGIN PAGE`)
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})