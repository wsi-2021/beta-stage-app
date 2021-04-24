const fs = require('fs/promises');
const mdb = require('../db/connect');
const path = require('path');

async function seedDatabase() {
  const connection = await mdb.connect();
  const db = connection.db(`${process.env.NODE_ENV}--vax-data`);
  const collection = db.collection('by_zip');
  const json = await fs.readFile(path.join(__dirname, `../var/data/fetched.json`));
  const data = JSON.parse(json);

  try {
    await collection.drop();
  } catch(e) {
    console.error(e.message);
  }

  try {
    for (let d of data) {
      await collection.updateOne({_id: d._id}, { '$set': d}, {upsert: true});
    }
    await collection.createIndex('zip_code');
    const count = await collection.countDocuments({});
    console.log('Record count:', count);
  } catch(error) {
    console.error(error.message);
  } finally {
    // close the database connection
    if (connection) {
      connection.close();
    }
  }
}

module.exports = {
  seedDatabase
};
