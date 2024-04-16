const client = require('./client.js');
const { createRecord } = require('./records.js');


const dropTables = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS record_library;
    DROP TABLE IF EXISTS customers;
  `);
  } catch (error) {
    console.log(`GOT A LITTLE PROBLEM HERE!`)
  }
}

const createTable = async () => {
  try {
    await client.query(`
      CREATE TABLE record_library (
        id SERIAL PRIMARY KEY,
        artist_name VARCHAR(30) NOT NULL,
        album_name VARCHAR(30) NOT NULL,
        isAvailable BOOLEAN NOT NULL
      );
    `)
    
  } catch (error) {
    console.log(error)
  }
}

const rebuildDb = async() => {
  await client.connect()
  console.log(`CONNECTED TO CLIENT`);
  await dropTables();
  await createTable();
  console.log(`TABLES CREATED`)
  await createRecord('Blaze Foley', 'Clay Pigeons', true);
  await createRecord('Sly & the Family Stone', 'Fresh', true);
  await createRecord('Velvet Underground', 'White Light White Heat', true);
  await createRecord('Van Morrison', 'Astral Weeks', false);
  await createRecord('Van Morrison', 'Veedon Fleece', false);
  await createRecord('Dangelo', 'Voodoo', true);
  await createRecord('Frank Sinatra', 'In the Wee Small Hours', false);
  await client.end()
  console.log(`DISCONNECTED FROM CLEEEZY`)

}

rebuildDb();