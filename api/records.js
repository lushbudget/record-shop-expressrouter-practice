const express = require("express");
const recordsRouter = express.Router();
const { createRecord, deleteRecord, getAllRecords } = require('../db/records.js');
https://desktop.postman.com/?desktopVersion=10.24.16&userId=33091076&teamId=0
recordsRouter.get('/', async (req, res, next) => {
  console.log(`HELLO`)
  try {
    const allRecords = await getAllRecords();
    res.send(allRecords)
  } catch (error) {
    next(error)
    
  }
})

recordsRouter.post('/', async (req, res, next) => {
  try {
    const {artist_name, album_name, isAvailable} = req.body;
    const newRecord = await createRecord(artist_name, album_name, isAvailable);
    res.send(newRecord)
  } catch (error) {
    next(error)
 }
})

recordsRouter.delete('/:id', async (req, res, next) => {
  try {
    const inputId = req.params.id;
    const result = await deleteRecord(inputId);
    res.send(result)
  } catch (error) {
    res.sendStatus(500)
    next(error);
  }
})

module.exports = recordsRouter;