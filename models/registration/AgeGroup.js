var mongoose = require('mongoose');

var AgegroupSchema = new mongoose.Schema({
    ageGroup: String,
    maxAge: Number
});

mongoose.model('AgeGroup', AgegroupSchema, 'AgeGroup');