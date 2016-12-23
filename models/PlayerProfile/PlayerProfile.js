var mongoose = require('mongoose');

/*
e.g.
 Contact person 1
 Contact person 2 
 */
var ContactPersonSchema = new mongoose.Schema({
    personName: String,
    relationship: String,
    contactNumber: String,
    email: String
});

/*
e.g.
 Previous Club (2016 - Name and Division)
 Previous Club (2015 - Name and Divisiion)
 */
var ClubHistorySchema = new mongoose.Schema({
    year: String,
    details: String
});


/*
e.g.
 Image (name)
 */
var ImageManagerSchema = new mongoose.Schema({
    name: String
});

var coachesSchema = mongoose.Schema({
    coachID: String,
    coachName: String
}, {
    _id: false
});


var PlayerProfileSchema = new mongoose.Schema({
    /*
    Basic details
     */
    dateOfApplication: {
        type: Date,
        default: Date.now
    },
    playerID: String,
    playerName: String,
    givenName: String,
    familyName: String,
    fFANumber: String,
    birthDate: Date,
    ageGroup: String,
    preferredPlayingPosition: Number,
    coaches: [coachesSchema],
    sessionKey: String,
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    objectivesAmbitions: String,

    /*
    Contact Details
     */
    residentialAddress: String,
    homeNumber: String,
    mobileNumber: String,
    email: {
        type: String,
        unique: true,
        required: true
    },

    /*
    Contact person 1
     Contact person 2
     */
    contactPerson: [ContactPersonSchema],

    images: [{
        name: String,
        url: String
    }],
    /*
    Study/Work Details
     */
    schoolDetails: String,
    employementDetails: String,

    /*
    Playing History
    */
    clubHistory: [ClubHistorySchema],
    suspensionsDetails: String,
    injuriesDetails: String,

    /*
    Football Academy, Training and Activity Details
    */
    headCoachName: String,
    contactDetails: String,
    academicSessionPerWeekCount: {
        type: Number,
        default: 0
    },
    arrangedBy: String,
    destination: String,
    purposeOfTrip: String,

    /*
    Default fields
     */
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
    }
});

mongoose.model('PlayerProfile', PlayerProfileSchema, 'PlayerProfile');