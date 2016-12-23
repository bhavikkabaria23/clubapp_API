var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
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
 Image (name)
 */
var ImageManagerSchema = new mongoose.Schema({
    name: String
});


/*
e.g.
 Previous Club (2016 - Name and Division)
 Previous Club (2015 - Name and Divisiion)
 */
var ClubHistorySchema = new mongoose.Schema({
    year: Number,
    details: String
});

var SessionSchema = new mongoose.Schema({
    sessionKey:String,
    startDateTime:Date,
    ended: {
        type:Boolean,
        default: false
    }
},{
    _id: false
});


var CoachProfileSchema = new mongoose.Schema({
    /*
    Basic details
     */
    dateOfApplication: {
        type: Date,
        default: Date.now
    },
    coachName: String,
    givenName: String,
    familyName: String,
    birthDate: Date,
    fFANumber: String,
    coachingLicence: String,
    childrenRegistration: String,
    sessions: [SessionSchema],
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    images: [{
        name: String,
        url: String
    }],

    /*
    Contact Details
     */
    residentialAddress: String,
    homeNumber: String,
    mobileNumber: String,
    email: {
        type: String,
        unique: true
        //,required: true
    },

    /*
    Contact person 1
     Contact person 2
     */
    contactPerson: [ContactPersonSchema],

    /*
    Playing History
    */
    clubHistory: [ClubHistorySchema],
    suspensionsDetails: String,

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
    }
});

// CoachProfileSchema.methods.setPassword = function (ffanumber) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.fFANumber = crypto.createHash('md5').update(this.salt + ffanumber).digest('hex'); 
// };

// This is not in use
// CoachProfileSchema.methods.validPassword = function(ffanumber) {
//     // console.log("ffanumber is:" + ffanumber);
//     // var passwordHash = crypto.createHash('md5').update(this.salt + ffanumber).digest('hex'); 
//     // return this.fFANumber === passwordHash;
//     return this.fFANumber === ffanumber;
// };

// This is not in use
// // Generate JWT token
// CoachProfileSchema.methods.generateJWT = function() {

//     // set expiration to 60 days
//     var today = new Date();
//     var exp = new Date(today);
//     exp.setDate(today.getDate() + 60);

//     return jwt.sign({
//         _id: this._id,
//         username: this.coachName,
//         exp: parseInt(exp.getTime() / 1000),
//     }, 'SECRET');
// };

mongoose.model('CoachProfile', CoachProfileSchema, 'CoachProfile');