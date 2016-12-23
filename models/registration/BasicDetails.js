var mongoose = require('mongoose');

var BasicDetailSchema = new mongoose.Schema({
    dateOfApplication: {
        type: Date,
        default: Date.now
    },
    images: [{
        name: String,
        url: String
    }],
    playerID: String,
    playerName: String,
    fFANumber: String,
    birthDate: Date,
    residentialAddress: String,
    homeNumber: String,
    mobileNumber: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    preferredPlayingPosition: Number,
    ageGroup: String,
    objectivesAmbitions: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    contactPerson1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactPerson1'
    },
    contactPerson2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactPerson2'
    },
    footballAcademyDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FootballAcademyDetails'
    },
    playingHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayingHistory'
    },
    studyWorkDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyWorkDetails'
    }
});

mongoose.model('BasicDetails', BasicDetailSchema, 'BasicDetails');