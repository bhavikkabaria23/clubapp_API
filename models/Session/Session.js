var mongoose = require('mongoose');

var CoachSchema = mongoose.Schema({
    coach_id: String,
    fFANumber: String,
    givenName: String,
    familyName: String
}, {
    _id: false
});
var PlayerSchema = mongoose.Schema({
    player_id: String,
    playerID: String,
    ffaNumber: String,
    givenName: String,
    familyName: String
}, {
    _id: false
});

var SessionSchema = new mongoose.Schema({
    sessionKey: {
        type: String,
        unique: true,
        required: true
    },
    startDateTime: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    coaches: [CoachSchema],
    players: [PlayerSchema],
    ended: {
        type:Boolean,
        default: false
    },
    skills: [{
        name: String,
        instructions: String
    }]
});
mongoose.model('Session', SessionSchema, 'Session');
