var mongoose = require('mongoose');

var SchoolEmployementSchema = new mongoose.Schema({
    schoolDetails: String,
    employementDetails: String,
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BasicDetails'
    }
});

mongoose.model('StudyWorkDetails', SchoolEmployementSchema, 'StudyWorkDetails');