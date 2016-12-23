var mongoose = require('mongoose');

var PlayingHistorySchema = new mongoose.Schema({
    previousClub2016: String,
    previousClub2015: String,
    suspensionsDetails: String,
    injuriesDetails: String,
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BasicDetails'
    }
});

mongoose.model('PlayingHistory', PlayingHistorySchema, 'PlayingHistory');