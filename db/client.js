const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/record_shop')


module.exports = client;