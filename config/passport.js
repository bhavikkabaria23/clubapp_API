var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Owner = mongoose.model('Owner');
var CoachProfile = mongoose.model('CoachProfile');
var Users = mongoose.model('Users');
var resources = require('../resource.json');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {        
        Owner.findOne({
            email: email
        }, function (err, owner) {
            if (err) {
                return done(err);
            }
            if (!owner) {
                return done(null, false, {
                    message: resources.message.incorrect_username
                });
            }
            if (!owner.validPassword(password)) {
                return done(null, owner, {
                    message: resources.message.incorrect_password
                });
            }
            return done(null, owner);
        });
    }
));

// This is not in use. coach can sign as a user.
// passport.use('local-coach', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'fFANumber'
// },
//     function (email, fFANumber, done) {
//         CoachProfile.findOne({
//             email: email
//         }, function (err, coachProfile) {            
//             if (err) {
//                 return done(err);
//             }
//             if (!coachProfile) {
//                 return done(null, false, {
//                     message: resources.message.incorrect_username
//                 });
//             }
//             if (!coachProfile.validPassword(fFANumber)) {
//                 return done(null, false, {
//                     message: resources.message.incorrect_password
//                 });
//             }
//             return done(null, coachProfile);
//         });
//     }
// ));

passport.use('local-user', new LocalStrategy({
    usernameField: 'fFANumber',
    passwordField: 'password'
},
    function (fFANumber, password, done) {
        Users.findOne({
            fFANumber: fFANumber
        }, function (err, userProfile) {
            if (err) {
                return done(err);
            }
            if (!userProfile) {
                return done(null, false, {
                    message: resources.message.incorrect_username
                });
            }
            if (!userProfile.validPassword(password)) {
                return done(null, userProfile, {
                    message: resources.message.incorrect_password
                });
            }
            return done(null, userProfile);
        });
    }
));