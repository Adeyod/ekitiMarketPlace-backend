const mongoose = require('mongoose');
const connection = mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log(`Mongo Db Connected Successfully ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.log(`Mongo Db failed to connect to ${mongoose.connection.host}`);
  });

module.exports = connection;
