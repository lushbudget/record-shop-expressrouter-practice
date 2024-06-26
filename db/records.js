const client = require('./client.js')

const deleteRecord = async (id) => {
  const deletedRecord = await client.query(`
  DELETE FROM record_library
  WHERE id = ${id}
  RETURNING *;
  `)
  return deletedRecord;
}

const getAllRecords = async () => {
  try {
    console.log(`HELLO`)
    const {rows} = await client.query(`
      SELECT * FROM record_library`)
      
      return rows;
  } catch (error) {
    console.log(error)
    
  }
}


const createRecord = async (artist_name, album_name, isAvailable) => {
  try {
   
    const {rows: [newlyCreatedAlbum]} = await client.query(`
      INSERT INTO record_library (artist_name, album_name, isAvailable)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [artist_name, album_name, isAvailable]);
    
    return newlyCreatedAlbum;
} catch (error) {
    console.log(error)
    throw error;
  }
}

module.exports = {
  createRecord,
  deleteRecord,
  getAllRecords
}