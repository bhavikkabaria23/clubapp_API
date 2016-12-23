var mongoose = require('mongoose');

var FootballAcademicSchema = new mongoose.Schema({
    headCoachName: String,
    contactDetails: String,
    academicSessionPerWeekCount: Number,
    arrangedBy: String,
    destination: String,
    purposeOfTrip: String,
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BasicDetails'
    }
});

mongoose.model('FootballAcademyDetails', FootballAcademicSchema, 'FootballAcademyDetails');
