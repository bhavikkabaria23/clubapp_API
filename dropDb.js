var mongoose = require('mongoose');

module.exports = mongoose.connection.db.dropDatabase();

