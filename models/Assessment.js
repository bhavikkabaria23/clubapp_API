var mongoose = require('mongoose');

var AssessmentSchema = new mongoose.Schema({
    player_id: String,
    coach_id: String,
    sessionKey: String,
    assessments: [{
        name: String,
        instructions: String,
        rating: Number
    }],
    position: Number,
    note: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    isActive: { type: Boolean, default: true },
});

mongoose.model('Assessment', AssessmentSchema, 'Assessment');