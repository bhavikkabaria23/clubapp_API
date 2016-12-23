
var mongoose = require('mongoose');
var server = require('../unit-test-server.js');
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');

var registrationRepo = require('../repo/registration');
var playerProfileRepo = require('../repo/playerProfile');
var assessmentRepo = require('../repo/assessment');
var skillRepo = require('../repo/skills');
var serviceRepo = require('../repo/service');
var coachRepo = require('../repo/coach');
var sessionRepo = require('../repo/sessions');
var usersRepo = require('../repo/users');
var ownerRepo = require('../repo/owner');
var memberRepo = require('../repo/member');

var resources = require('../resource.json');

after(function (done) {
    require('../dropDb.js');
    done();
});

var registrationId;
var contactPerson1_id;
var contactPerson2_id;
var footballAcademyDetails_id;
var playingHistory_id;
var studyWorkDetails_id;
var registrationId_2;
var contactPerson1_id_2;
var contactPerson2_id_2;
var footballAcademyDetails_id_2;
var playingHistory_id_2;
var studyWorkDetails_id_2;
describe("User", function () {
    var users = {};
    var userId;
    var password;
    var coachFFANumber;
    var playerFFANumber;
    var directorFFANumber;
    var adminFFANumber;
    describe("signUp() function", function () {
        it("Signup user as a admin with valid data", function (done) {
            users.mobileNumber = "87878887";
            users.address = "New Mock test for admin";
            users.password = password = "test@123";
            users.fFANumber = adminFFANumber = "222222";
            //Role of admin is "2"
            users.role = 2;
            usersRepo.signUp(users, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('token');
                    result.should.have.property('userID');
                    done();
                }
            });
        });
        it("Signup user as a technical director with valid data", function (done) {
            users.mobileNumber = "123123123";
            users.address = "New Mock test";
            users.password = password = "test@123";
            users.fFANumber = directorFFANumber = "11111111";
            //Role of tech director is "4"
            users.role = 4;
            usersRepo.signUp(users, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('token');
                    result.should.have.property('userID');
                    done();
                }
            });
        });
        it("Signup user with duplicate FFANumber", function (done) {
            users.mobileNumber = "123123123";
            users.address = "New Mock test";
            users.password = "test@123";
            users.fFANumber = "11111111";
            users.role = 4;
            usersRepo.signUp(users, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                result.should.have.property('message', 'duplicateFFANumber');
                done();
            });
        });
        it("Signup user as a player with valid data", function (done) {
            users.mobileNumber = "9494949494";
            users.address = "Player address";
            users.password = "test@123";
            users.fFANumber = playerFFANumber = "555555";
            //Role of player is "5"
            users.role = 5;
            usersRepo.signUp(users, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('token');
                    result.should.have.property('userID');
                    done();
                }
            });
        });
        it("If signup as a role of coach then create coach profile", function (done) {
            users.mobileNumber = "98989898";
            users.address = "coach address";
            users.password = "test@123";
            users.fFANumber = coachFFANumber = "333333";
            // Role os coach is "3"
            users.role = 3;
            usersRepo.signUp(users, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('token');
                    result.should.have.property('userID');
                    done();
                }
            });
        });
    });
    describe("createRootUser() function", function () {
        it("Create root user with predefined data", function (done) {
            usersRepo.createRootUser(function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create root user with duplicate FFANumber", function (done) {
            usersRepo.createRootUser(function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                result.should.have.property('message', 'duplicateFFANumber');
                done();
            });
        });
    });
    describe("get() function", function () {
        it("Get all users", function (done) {
            usersRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('users');
                    result.users.should.be.a('array');
                    userId = result.users[0]._id;
                    done();
                }
            });
        });
    });
    describe("getById() function", function () {
        it("Get a single user by valid user id", function (done) {
            usersRepo.getById(userId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('users');
                    done();
                }
            });
        });
        it("Get a single user by invalid or wrong user id", function (done) {
            usersRepo.getById("invalid", function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("getByFFANumber() function", function () {
        it("Get a single user by valid FFANumber", function (done) {
            usersRepo.getByFFANumber(directorFFANumber, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('users');
                    done();
                }
            });
        });
        it("Get a single user by invalid or wrong FFANumber", function (done) {
            usersRepo.getByFFANumber("invalid", function (result) {
                result.should.have.property('users', null);
                done();
            });
        });
    });
    describe("signin() function", function () {
        it("Signin user as a root admin with valid FFANumber and password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = '1234567890';
            req.body.password = users.password;
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('_id');
                    result.should.have.property('token');
                    result.should.have.property('role', 1);
                    done();
                }
            });
        });
        it("Signin user as an admin with valid FFANumber and password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = adminFFANumber;
            req.body.password = users.password;
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('_id');
                    result.should.have.property('token');
                    result.should.have.property('role', 2);
                    done();
                }
            });
        });
        it("Signin user as a tehnical director with valid FFANumber and password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = directorFFANumber;
            req.body.password = users.password;
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('_id');
                    result.should.have.property('token');
                    result.should.have.property('role', 4);
                    done();
                }
            });
        });
        it("Signin user as a coach with valid FFANumber and password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = coachFFANumber;
            req.body.password = users.password;
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('_id');
                    result.should.have.property('token');
                    result.should.have.property('role', 3);
                    result.should.have.property('coach');
                    done();
                }
            });
        });
        it("Signin user as a player with valid FFANumber and password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = playerFFANumber;
            req.body.password = users.password;
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('_id');
                    result.should.have.property('token');
                    result.should.have.property('role', 5);
                    done();
                }
            });
        });
        it("Signin user with invalid or wrong password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = directorFFANumber;
            req.body.password = 'admintest';
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('message', resources.message.incorrect_password);
                done();
            });
        });
        it("Signin user with invalid FFANumber or password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = 'invalid';
            req.body.password = 'invalid';
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('message', 'User Undefined');
                done();
            });
        });
        it("Signin user with empty FFANumber or password", function (done) {
            var req = {
                body: {}
            };
            req.body.fFANumber = '';
            req.body.password = '';
            var res = {};
            var next = {};
            usersRepo.signin(req, res, next, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('message', 'Please fill out all fields.');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update an user with valid data", function (done) {
            users._id = userId;
            users.mobileNumber = "564898456";
            users.address = "update director address";
            users.password = "test@123";
            users.fFANumber = "121212";
            users.role = 4;
            usersRepo.put(users, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update an user with duplicate FFANumber", function (done) {
            users._id = userId;
            users.mobileNumber = "564898456";
            users.address = "update director address";
            users.password = "test@123";
            users.fFANumber = "555555";
            users.role = 4;
            usersRepo.put(users, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                result.should.have.property('message', 'duplicateFFA');
                done();
            });
        });
        it("Update an user with invalid id", function (done) {
            users._id = 'invalid';
            users.mobileNumber = "564898456";
            users.address = "update director address";
            users.password = "test@123";
            users.fFANumber = "555555";
            users.role = 4;
            usersRepo.put(users, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
});

describe("Registration", function () {
    describe("saveAgeGroup() function", function () {
        it("Add predefined age groups (static)", function (done) {
            registrationRepo.saveAgeGroup(function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
    });
    describe("getAgeGroup() function", function () {
        it("Get age groups by passing valid max age of 16", function (done) {
            registrationRepo.getAgeGroup(16, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('ageGroup');
                    result.ageGroup.should.be.a('array');
                    done();
                }
            });
        });
        it("Get age groups by passing valid max age greater than 19", function (done) {
            registrationRepo.getAgeGroup(20, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('ageGroup');
                    result.ageGroup.should.be.a('array');
                    done();
                }
            });
        });
        it("Get age groups by passing valid max age less than 16", function (done) {
            registrationRepo.getAgeGroup(14, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('ageGroup');
                    result.ageGroup.should.be.a('array');
                    done();
                }
            });
        });
        it("Get age groups by passing invalid max age", function (done) {
            registrationRepo.getAgeGroup('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("post() function", function () {
        it("Create a new registration with valid data", function (done) {
            var registration = {
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "playerName": "John Smith",
                "objectivesAmbitions": "good players",

                "headCoachName": "John Marshal",
                "academicSessionPerWeekCount": 0,
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "schoolDetails": "school details",
                "employementDetails": "employe details",

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl@gmail.com",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "suspensionsDetails": "details of suspensions",
                "injuriesDetails": "details of injury"
            };
            registrationRepo.post(registration, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create another registration with valid data", function (done) {
            var registration = {
                "email": "test3@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "playerName": "John Smith",
                "objectivesAmbitions": "good players",

                "headCoachName": "John Marshal",
                "academicSessionPerWeekCount": 0,
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "schoolDetails": "school details",
                "employementDetails": "employe details",

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl@gmail.com",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "suspensionsDetails": "details of suspensions",
                "injuriesDetails": "details of injury"
            };
            registrationRepo.post(registration, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create a new registration with duplicate email", function (done) {
            var registration = {
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "playerName": "John Smith",
                "objectivesAmbitions": "good players",

                "headCoachName": "John Marshal",
                "academicSessionPerWeekCount": 0,
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "schoolDetails": "school details",
                "employementDetails": "employe details",

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl@gmail.com",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "suspensionsDetails": "details of suspensions",
                "injuriesDetails": "details of injury"
            };
            registrationRepo.post(registration, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("emailExist() function", function () {
        it("Check for email which exists", function (done) {
            var registration = {
                "email": "test2@gmail.com",
            }
            registrationRepo.emailExist(registration, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Check for email which doesn't exist ", function (done) {
            var registration = {
                "email": "abc@gmail.com",
            }
            registrationRepo.emailExist(registration, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', false);
                    done();
                }
            });
        });
    });
    describe("get() function", function () {
        it("Get all registrations", function (done) {
            registrationRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('registrations');
                    result.registrations.should.be.a('array');
                    registrationId = result.registrations[0]._id;
                    contactPerson1_id = result.registrations[0].contactPerson1
                    contactPerson2_id = result.registrations[0].contactPerson2
                    footballAcademyDetails_id = result.registrations[0].footballAcademyDetails
                    playingHistory_id = result.registrations[0].playingHistory
                    studyWorkDetails_id = result.registrations[0].studyWorkDetails

                    registrationId_2 = result.registrations[1]._id;
                    contactPerson1_id_2 = result.registrations[1].contactPerson1
                    contactPerson2_id_2 = result.registrations[1].contactPerson2
                    footballAcademyDetails_id_2 = result.registrations[1].footballAcademyDetails
                    playingHistory_id_2 = result.registrations[1].playingHistory
                    studyWorkDetails_id_2 = result.registrations[1].studyWorkDetails
                    done();
                }
            });
        });
    });
    describe("getById() function", function () {
        it("Get a single registration by valid id", function (done) {
            registrationRepo.getById(registrationId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('registration');
                    result.registration.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a single registration by invalid or wrong id", function (done) {
            registrationRepo.getById('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update a registration by valid data", function (done) {
            var registration = {
                "_id": registrationId,
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "65656565",
                "playerName": "John Makers",
                "objectivesAmbitions": "good players",
                "modifiedDate": Date.now(),

                "footballAcademyDetails_id": footballAcademyDetails_id,
                "headCoachName": "John Marshal",
                "academicSessionPerWeekCount": 0,
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "studyWorkDetails_id": studyWorkDetails_id,
                "schoolDetails": "school details update",
                "employementDetails": "employe details update",

                "contactPerson1_id": contactPerson1_id,
                "contact1_personName": "xyz xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "999999999",
                "contact1_email": "rleidl2@gmail.com",

                "contactPerson2_id": contactPerson2_id,
                "contact2_personName": "abc abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "543563656",
                "contact2_email": "marshal@gmail.com",

                "playingHistory_id": playingHistory_id,
                "previousClub2015": "2015 details update",
                "previousClub2016": "2016 details update",
                "suspensionsDetails": "details of suspensions update",
                "injuriesDetails": "details of injury update"
            }
            registrationRepo.put(registration, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a registration with invalid id", function (done) {
            var registration = {
                "_id": 'invalid',
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "65656565",
                "playerName": "John Makers",
                "objectivesAmbitions": "good players",
                "modifiedDate": Date.now(),

                "footballAcademyDetails_id": footballAcademyDetails_id,
                "headCoachName": "John Marshal",
                "academicSessionPerWeekCount": 0,
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "studyWorkDetails_id": studyWorkDetails_id,
                "schoolDetails": "school details update",
                "employementDetails": "employe details update",

                "contactPerson1_id": contactPerson1_id,
                "contact1_personName": "xyz xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "999999999",
                "contact1_email": "rleidl2@gmail.com",

                "contactPerson2_id": contactPerson2_id,
                "contact2_personName": "abc abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "543563656",
                "contact2_email": "marshal@gmail.com",

                "playingHistory_id": playingHistory_id,
                "previousClub2015": "2015 details update",
                "previousClub2016": "2016 details update",
                "suspensionsDetails": "details of suspensions update",
                "injuriesDetails": "details of injury update"
            }
            registrationRepo.put(registration, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("exportToCsv() function", function () {
        it("Get all registrations for export to CSV", function (done) {
            registrationRepo.exportToCsv(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('registrations');
                    result.registrations.should.be.a('array');
                    done();
                }
            });
        });
    });
});

var player_id;
describe("Player Profile", function () {
    describe("post() function", function () {
        it("Create a new player with valid data", function (done) {
            var player = {
                "contactPerson1_id": contactPerson1_id,
                "contactPerson2_id": contactPerson2_id,
                "studyWorkDetails_id": studyWorkDetails_id,
                "playingHistory_id": playingHistory_id,
                "footballAcademyDetails_id": footballAcademyDetails_id,
                "_id": registrationId,

                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": "John Smith",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Marshal",
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main_thumb"
                    }
                ],

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl2@gmail.com"
            };
            playerProfileRepo.post(player, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create a new player with duplicate email", function (done) {
            var player = {
                "contactPerson1_id": contactPerson1_id,
                "contactPerson2_id": contactPerson2_id,
                "studyWorkDetails_id": studyWorkDetails_id,
                "playingHistory_id": playingHistory_id,
                "footballAcademyDetails_id": footballAcademyDetails_id,
                "_id": registrationId,

                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": "John Smith",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Marshal",
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main_thumb"
                    }
                ],

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl2@gmail.com"
            };
            playerProfileRepo.post(player, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
        it("Create another player with valid data and unique email", function (done) {
            var player = {
                "contactPerson1_id": contactPerson1_id_2,
                "contactPerson2_id": contactPerson2_id_2,
                "studyWorkDetails_id": studyWorkDetails_id_2,
                "playingHistory_id": playingHistory_id_2,
                "footballAcademyDetails_id": footballAcademyDetails_id_2,
                "_id": registrationId_2,

                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test5@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "89898989",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": "John Smith",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Marshal",
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main_thumb"
                    }
                ],

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl2@gmail.com"
            };
            playerProfileRepo.post(player, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
    });
    describe("emailExist() function", function () {
        it("Check for email which exists", function (done) {
            // This email should be inserted to check this test case.
            var player = {
                "email": "test2@gmail.com",
            }
            playerProfileRepo.emailExist(player, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Check for email which doesn't exist ", function (done) {
            var player = {
                "email": "xyz@gmail.com",
            }
            playerProfileRepo.emailExist(player, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', false);
                    done();
                }
            });
        });
    });
    describe("get() function", function () {
        it("Get all players", function (done) {
            playerProfileRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('players');
                    result.players.should.be.a('array');
                    player_id = result.players[0]._id;
                    done();
                }
            });
        });
    });
    describe("getById() function", function () {
        it("Get a single player by valid id", function (done) {
            playerProfileRepo.getById(player_id, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('player');
                    result.player.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a single player by invalid or wrong id", function (done) {
            playerProfileRepo.getById('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("addToSession() function", function () {
        it("Add player to session by passing valid id and a session key", function (done) {
            var player = {
                "_id": player_id,
                "sessionKey": "201611231800U009"
            };
            playerProfileRepo.addToSession(player, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Add player to session by passing invalid id", function (done) {
            var player = {
                "_id": 'invalid',
                "sessionKey": "201611231800U009"
            };
            playerProfileRepo.addToSession(player, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update a player with valid data", function (done) {
            var player = {
                "_id": player_id,
                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test3@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": "John Smith",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Marshal",
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",
                "modifiedDate": Date.now(),
                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main_thumb"
                    }
                ],
                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl2@gmail.com",
                "coaches": [],
            };
            playerProfileRepo.put(player, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done();
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a player with invalid id", function (done) {
            var player = {
                "_id": 'invalid',
                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test3@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": "John Smith",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Marshal",
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",
                "modifiedDate": Date.now(),
                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main_thumb"
                    }
                ],
                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl2@gmail.com",
                "coaches": [],
            };
            playerProfileRepo.put(player, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
        it("Update a player with duplicate email", function (done) {
            var player = {
                "_id": player_id,
                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test5@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": "John Smith",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Marshal",
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",
                "modifiedDate": Date.now(),
                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                        "name": "main_thumb"
                    }
                ],
                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl2@gmail.com",
                "coaches": [],
            };
            playerProfileRepo.put(player, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
});
var coachId; ``
var coachEmail;
describe("Coach", function () {
    describe("post() function", function () {
        it("Create a new coach with valid data", function (done) {
            var coaches = {};
            coaches.suspensionsDetails = "details of suspension";
            coaches.email = "mockvolker.buhl@gmx.de";
            coaches.mobileNumber = "0435 266 099";
            coaches.homeNumber = "545435";
            coaches.residentialAddress = "Sydney";
            coaches.gender = "male";
            coaches.childrenRegistration = "5454554";
            coaches.coachingLicence = "545435435";
            coaches.fFANumber = "71115554";
            coaches.birthDate = "2001-02-01T00:00:00.000Z";
            coaches.coachName = "mock Volker";
            coaches.givenName = "mock";
            coaches.familyName = "mock";
            coaches.previousClub2015 = "2015 details";
            coaches.previousClub2016 = "2016 details";

            coaches.contact1_personName = "xyz";
            coaches.contact1_relationship = "father";
            coaches.contact1_contactNumber = "43564365436";
            coaches.contact1_email = "xyz@gmail.com";

            coaches.images = []
            coachRepo.post(coaches, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create a new coach with duplicate email", function (done) {
            var coaches = {};
            coaches.suspensionsDetails = "details of suspension";
            coaches.email = "mockvolker.buhl@gmx.de";
            coaches.mobileNumber = "0435 266 099";
            coaches.homeNumber = "545435";
            coaches.residentialAddress = "Sydney";
            coaches.gender = "male";
            coaches.childrenRegistration = "5454554";
            coaches.coachingLicence = "545435435";
            coaches.fFANumber = "71115554";
            coaches.birthDate = "2001-02-01T00:00:00.000Z";
            coaches.coachName = "mock Volker";
            coaches.givenName = "mock";
            coaches.familyName = "mock";
            coaches.previousClub2015 = "2015 details";
            coaches.previousClub2016 = "2016 details";

            coaches.contact1_personName = "xyz";
            coaches.contact1_relationship = "father";
            coaches.contact1_contactNumber = "43564365436";
            coaches.contact1_email = "xyz@gmail.com";

            coaches.images = []
            coachRepo.post(coaches, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("exists() function", function () {
        it("Check for email which exists", function (done) {
            coachRepo.exists('mockvolker.buhl@gmx.de', function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Check for email which doesn't exists", function (done) {
            coachRepo.exists('mocktest@gmail.com', function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', false);
                    done();
                }
            });
        });
    });
    describe("get() function", function () {
        it("Get all coaches", function (done) {
            coachRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('coaches');
                    result.coaches.should.be.a('array');
                    coachId = result.coaches[0]._id;
                    coachEmail = result.coaches[0].email;
                    done();
                }
            });
        });
    });
    describe("getById() function", function () {
        it("Get a single coach by valid id", function (done) {
            coachRepo.getById(coachId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('coach');
                    result.coach.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a single coach by invalid or wrong id", function (done) {
            coachRepo.getById('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("assignToSession() function", function () {
        it("Assign coach to one or more sessions by passing valid id and array of sessions", function (done) {
            var coaches = {};
            coaches._id = coachId;
            coaches.sessions = [
                {
                    "startDateTime": "2016-11-15T00:00:00.000Z",
                    "sessionKey": "201610281800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-11-05T18:00:00.000Z",
                    "sessionKey": "201610231800U009",
                    "ended": false
                }
            ]
            coachRepo.assignToSession(coaches, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Assign coach to one or more sessions by passing invalid id and array of sessions", function (done) {
            var coaches = {};
            coaches._id = 'invalid';
            coaches.sessions = [
                {
                    "startDateTime": "2016-11-15T00:00:00.000Z",
                    "sessionKey": "201610281800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-11-05T18:00:00.000Z",
                    "sessionKey": "201610231800U009",
                    "ended": false
                }
            ]
            coachRepo.assignToSession(coaches, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update a coach with valid data", function (done) {
            var coaches = {}
            coaches._id = coachId;
            coaches.suspensionsDetails = "Update details of suspension";
            coaches.email = "Updatemockvolker.buhl@gmx.de";
            coaches.mobileNumber = "0435 266 099";
            coaches.homeNumber = "222222";
            coaches.residentialAddress = "Update Sydney";
            coaches.gender = "male";
            coaches.childrenRegistration = "222222";
            coaches.coachingLicence = "5454444";
            coaches.fFANumber = "71115554";
            coaches.birthDate = "2001-02-01T00:00:00.000Z";
            coaches.coachName = "Update mock Volker";
            coaches.givenName = "Update mock";
            coaches.familyName = "Update mock";
            coaches.previousClub2015 = "2015 details";
            coaches.previousClub2016 = "2016 details";

            coaches.contact1_personName = "xyz";
            coaches.contact1_relationship = "father";
            coaches.contact1_contactNumber = "43564365436";
            coaches.contact1_email = "xyz@gmail.com";
            coaches.images = []
            coachRepo.put(coaches, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a coach with invalid id", function (done) {
            var coaches = {};
            coaches._id = 'invalid';
            coaches.suspensionsDetails = "Update details of suspension";
            coaches.email = "Updatemockvolker.buhl@gmx.de";
            coaches.mobileNumber = "0435 266 099";
            coaches.homeNumber = "222222";
            coaches.residentialAddress = "Update Sydney";
            coaches.gender = "male";
            coaches.childrenRegistration = "222222";
            coaches.coachingLicence = "5454444";
            coaches.fFANumber = "71115554";
            coaches.birthDate = "2001-02-01T00:00:00.000Z";
            coaches.coachName = "Update mock Volker";
            coaches.givenName = "Update mock";
            coaches.familyName = "Update mock";
            coaches.previousClub2015 = "2015 details";
            coaches.previousClub2016 = "2016 details";

            coaches.contact1_personName = "xyz";
            coaches.contact1_relationship = "father";
            coaches.contact1_contactNumber = "43564365436";
            coaches.contact1_email = "xyz@gmail.com";
            coaches.images = []
            coachRepo.put(coaches, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
});

describe("Session", function () {
    var sessions = {};
    var sessionId;
    describe("post() function", function () {
        it("Create a new session with valid data", function (done) {
            sessions.sessionKey = "201611231800U009";
            sessionRepo.post(sessions, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create a new session with duplicate session key", function (done) {
            sessions.sessionKey = "201611231800U009";
            sessionRepo.post(sessions, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("get() function", function () {
        it("Get all sessions", function (done) {
            sessionRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('sessions');
                    result.sessions.should.be.a('array');
                    sessionId = result.sessions[0]._id;
                    done();
                }
            });
        });
    });
    describe("getAllBySession() function", function () {
        it("Get a session,players and coaches by pssing valid a session key", function (done) {
            sessionRepo.getAllBySession(sessions.sessionKey, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('sessionResult');
                    result.sessionResult.session.should.be.a('object');
                    result.sessionResult.players.should.be.a('array');
                    result.sessionResult.coaches.should.be.a('array');
                    done();
                }
            });
        });
        it("Get a session,players and coaches by pssing invalid a session key", function (done) {
            sessionRepo.getAllBySession('invalid', function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('sessionResult');
                    result.sessionResult.should.have.property('session', null);
                    result.sessionResult.players.should.be.a('array', []);
                    result.sessionResult.coaches.should.be.a('array', []);
                    done();
                }
            });
        });
    });
    describe("getById() function", function () {
        it("Get a single session by valid id", function (done) {
            sessionRepo.getById(sessionId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('session');
                    result.session.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a single session by invalid or wrong id", function (done) {
            sessionRepo.getById("invalid", function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update a session with valid data", function (done) {
            sessions._id = sessionId;
            sessions.sessionKey = "201612231800U009";
            sessionRepo.put(sessions, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a session with invalid id", function (done) {
            sessions._id = 'invalid';
            sessions.sessionKey = "201612231800U009";
            sessionRepo.put(sessions, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("closesession() function", function () {
        it("Close a session by valid session id", function (done) {
            sessionRepo.closesession(sessionId, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Close a session by invalid session id", function (done) {
            sessionRepo.closesession('invalid', function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
});

describe("Skill", function () {
    var skills = {};
    var skillId;
    describe("post() function", function () {
        it("Create a new skill with valid data", function (done) {
            skills.name = "test skill";
            skills.instructions = "test instruction";
            skillRepo.post(skills, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
    });
    describe("get() function", function () {
        it("Get all skills", function (done) {
            skillRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('skills');
                    result.skills.should.be.a('array');
                    skillId = result.skills[0]._id;
                    done();
                }
            });
        });
    });
    describe("getById() function", function () {
        it("Get a single skill by valid id", function (done) {
            skillRepo.getById(skillId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('skill');
                    result.skill.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a single skill by invalid or wrong id", function (done) {
            skillRepo.getById("invalid", function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update a skill with valid data", function (done) {
            skills._id = skillId;
            skills.name = "test skill update";
            skills.instructions = "test instruction update";
            skillRepo.put(skills, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a skill with invalid id", function (done) {
            skills._id = 'invalid';
            skills.name = "test skill update";
            skills.instructions = "test instruction update";
            skillRepo.put(skills, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("removeAll() function", function () {
        it("Remove all skills", function (done) {
            skillRepo.removeAll(function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
    });
});

describe("Assessment", function () {
    var assessment = {};
    var assessmentId;
    describe("post() function", function () {
        it("Create a new assessment with valid data", function (done) {
            assessment.player_id = player_id;
            assessment.coach_id = coachId;
            assessment.assessments = [
                {
                    "instructions": "Mock his is how we do it",
                    "rating": 4,
                    "name": "Mock test"
                },
                {
                    "instructions": "Mock this is how we do it",
                    "rating": 3,
                    "name": "Mock test2"
                }
            ];
            assessment.sessionKey = "201610231800U009";
            assessment.position = 2;
            assessment.note = "testing";
            assessmentRepo.post(assessment, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
    });
    describe("get() function", function () {
        it("Get all assessments", function (done) {
            assessmentRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('assessment');
                    result.assessment.should.be.a('array');
                    assessmentId = result.assessment[0]._id;
                    done();
                }
            });
        });
    });
    describe("exists() function", function () {
        it("Check for assessment exists by passing valid coach id,player id and session key", function (done) {
            assessment._id = assessmentId;
            assessment.player_id = player_id;
            assessment.coach_id = coachId;
            assessment.sessionKey = "201610231800U009";
            assessmentRepo.exists(assessment, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('assessment');
                    result.assessment.should.be.a('array');
                    done();
                }
            });
        });
        it("Check for assessment exists by passing valid player id and session key", function (done) {
            assessment._id = assessmentId;
            assessment.player_id = player_id;
            assessment.coach_id = null;
            assessment.sessionKey = "201610231800U009";
            assessmentRepo.exists(assessment, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('assessment');
                    result.assessment.should.be.a('array');
                    done();
                }
            });
        });
        it("Check for assessment exists by passing invalid coach id,player id and session key", function (done) {
            assessment._id = 'invalid';
            assessment.player_id = 'invalid';
            assessment.coach_id = 'invalid';
            assessment.sessionKey = "invalid";
            assessmentRepo.exists(assessment, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('assessment');
                    result.assessment.should.be.a('array', []);
                    done();
                }
            });
        });
    });
    describe("put() function", function () {
        it("Update an assessment with valid data", function (done) {
            assessment._id = assessmentId;
            assessment.player_id = player_id;
            assessment.coach_id = coachId;
            assessment.assessments = [
                {
                    "instructions": "Update Mock his is how we do it",
                    "rating": 4,
                    "name": "Update Mock test"
                },
                {
                    "instructions": "Update Mock this is how we do it",
                    "rating": 3,
                    "name": "Update Mock test2"
                }
            ];
            assessment.sessionKey = "201610231800U009";
            assessment.position = 2;
            assessment.note = "Update testing";
            assessmentRepo.put(assessment, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update an assessment with invalid id", function (done) {
            assessment._id = 'invalid';
            assessment.player_id = player_id;
            assessment.coach_id = coachId;
            assessment.assessments = [
                {
                    "instructions": "Update Mock his is how we do it",
                    "rating": 4,
                    "name": "Update Mock test"
                },
                {
                    "instructions": "Update Mock this is how we do it",
                    "rating": 3,
                    "name": "Update Mock test2"
                }
            ];
            assessment.sessionKey = "201610231800U009";
            assessment.position = 2;
            assessment.note = "Update testing";
            assessmentRepo.put(assessment, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
});

describe("Remove data methods", function () {
    describe("Player Profile", function () {
        it("Remove a players profile logically", function (done) {
            playerProfileRepo.removeLogicalById(player_id, function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
        it("Remove a players profile physically", function (done) {
            playerProfileRepo.removePhysicalById(player_id, function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
        it("Remove all players profile", function (done) {
            playerProfileRepo.removeAll(function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
    });
    describe("Registration", function () {
        it("Remove all age groups", function (done) {
            registrationRepo.removeAgeGroup(function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
        it("Create a new registration with valid data to remove registration", function (done) {
            var registration = {
                "email": "test2@gmail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "678910",
                "playerName": "John Smith",
                "objectivesAmbitions": "good players",

                "headCoachName": "John Marshal",
                "academicSessionPerWeekCount": 0,
                "contactDetails": "767676567",
                "arrangedBy": "Sports",
                "destination": "Sydney",
                "purposeOfTrip": "training",

                "schoolDetails": "school details",
                "employementDetails": "employe details",

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",

                "contact2_personName": "abc",
                "contact2_relationship": "brother",
                "contact2_contactNumber": "80980809",
                "contact2_email": "rleidl@gmail.com",

                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",
                "suspensionsDetails": "details of suspensions",
                "injuriesDetails": "details of injury"
            };
            registrationRepo.post(registration, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Get all registrations to remove", function (done) {
            registrationRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('registrations');
                    result.registrations.should.be.a('array');
                    registrationId = result.registrations[0]._id;
                    done();
                }
            });
        });
        it("Remove a registration physically", function (done) {
            registrationRepo.removePhysicalById(registrationId, function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
    });
    describe("Assessment", function () {
        it("Remove all assessments", function (done) {
            assessmentRepo.removeAll(function (result) {
                result.should.have.property('status', true);
                done();
            });
        });
    });
});

var ownerId;
var owner;
describe("Owner", function () {
    var owners = {};
    describe("post() function", function () {
        it("Create a new owner", function (done) {
            owners.email = "ownertest@gmail.com";
            owners.password = "test@123";
            ownerRepo.post(owners, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('token');
                    result.should.have.property('ownerID');
                    done();
                }
            });
        });
        it("Create a new owner with empty email and password", function (done) {
            owners.email = "";
            owners.password = "";
            ownerRepo.post(owners, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', false);
                    result.should.have.property('message', resources.message.blank_fields);
                    done();
                }
            });
        });
    });

    describe("get() function", function () {
        it("Get all owners", function (done) {
            ownerRepo.get(function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('owners');
                    result.owners.should.be.a('array');
                    ownerId = result.owners[0]._id;
                    owner = result.owners[0];
                    done();
                }
            });
        });
    });

    describe("getById() function", function () {
        it("Get a owner by passing valid owner id", function (done) {
            ownerRepo.getById(ownerId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('owners');
                    done();
                }
            });
        });
        it("Get a owner by passing invalid owner id", function (done) {
            ownerRepo.getById('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });

    describe("signin() function", function () {
        it("Signin owner with valid email and password", function (done) {
            var req = {
                body: {}
            };
            req.body.email = owner.email;
            req.body.password = 'test@123';
            var res = {};
            var next = {};
            ownerRepo.signin(req, res, next, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message', resources.message.blank_fields);
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    result.should.have.property('ownerID');
                    result.should.have.property('token');
                    done();
                }
            });
        });
        it("Signin owner with empty email and password", function (done) {
            var req = {
                body: {}
            };
            req.body.email = '';
            req.body.password = '';
            var res = {};
            var next = {};
            ownerRepo.signin(req, res, next, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('message', resources.message.blank_fields);
                done();
            });
        });
        it("Signin owner with invalid or wrong password", function (done) {
            var req = {
                body: {}
            };
            req.body.email = owner.email;
            req.body.password = 'admin';
            var res = {};
            var next = {};
            ownerRepo.signin(req, res, next, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('message', resources.message.incorrect_password);
                done();
            });
        });
        it("Signin owner with invalid or wrong email and password", function (done) {
            var req = {
                body: {}
            };
            req.body.email = 'invalid';
            req.body.password = 'invalid';
            var res = {};
            var next = {};
            ownerRepo.signin(req, res, next, function (result) {
                result.should.have.property('status', false);
                done();
            });
        });
    });
});

var serviceId;
describe("Service", function () {
    describe("post() function", function () {
        it("Create a new service by passing owner", function (done) {
            var service = {
                "name": "Facebook",
                "description": "Facebook description"
            };
            serviceRepo.post(service, owner, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('message');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });

        it("Create a new service by passing null owner", function (done) {
            var service = {
                "name": "Facebook",
                "description": "Facebook description"
            };
            serviceRepo.post(service, null, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });

    describe("getServiceByOwnerId() function", function () {
        it("Get services by passing valid ownerId", function (done) {
            serviceRepo.getServiceByOwnerId(ownerId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('services');
                    result.services.should.be.a('array');
                    serviceId = result.services[0]._id;
                    done();
                }
            });
        });

        it("Get services by passing invalid ownerId", function (done) {
            serviceRepo.getServiceByOwnerId('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });

    describe("getById() function", function () {
        it("Get a service by passing valid service id", function (done) {
            serviceRepo.getById(serviceId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('service');
                    result.service.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a service by passing invalid service id", function (done) {
            serviceRepo.getById('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });

    describe("put() function", function () {
        it("Update a service by passing valid service id", function (done) {
            var service = {
                "description": "Facebook description update",
                "image": ""
            };
            serviceRepo.put(serviceId, service, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a service by passing invalid service id", function (done) {
            var service = {
                "description": "Facebook description update",
                "image": ""
            };
            serviceRepo.put('invalid', service, function (result) {
                result.should.have.property('status', false);
                done();
            });
        });
    });

    describe("ownerParams() function", function () {
        it("Get a owner by passing valid owner id as a param", function (done) {
            serviceRepo.ownerParams(ownerId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('owner');
                    done();
                }
            });
        });
        it("Get a owner by passing invalid owner id as a param", function (done) {
            serviceRepo.ownerParams('invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
});

var memberId;
var serviceName = "Facebook";
describe("Member", function () {
    describe("post() function", function () {
        it("Create a member by passing valid service name", function (done) {
            var member = {
                "givenName": "John",
                "additionalName": "K",
                "familyName": "Smith",
                "email": "john@gmail.com",
                "telephone": "45354565343",
                "address": "Sydney Australia",
                "password": "test@123",
                "image": ""
            };
            memberRepo.post(serviceName, member, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Create a member by passing null service name", function (done) {
            var member = {
                "givenName": "John",
                "additionalName": "K",
                "familyName": "Smith",
                "email": "john@gmail.com",
                "telephone": "45354565343",
                "address": "Sydney Australia",
                "password": "test@123",
                "image": ""
            };
            memberRepo.post(null, member, function (result) {
                result.should.have.property('error');
                result.should.have.property('status', false);
                done();
            });
        });
    });
    describe("get() function", function () {
        it("Get members by passing valid service name", function (done) {
            memberRepo.get(serviceName, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('members');
                    result.members.should.be.a('array');
                    memberId = result.members[0]._id;
                    done();
                }
            });
        });
        it("Get members by passing null service name", function (done) {
            memberRepo.get(null, function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("getById() function", function () {
        it("Get a member by passing valid member id and service name", function (done) {
            memberRepo.getById(serviceName, memberId, function (result) {
                if (result.error) {
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('member');
                    result.member.should.be.a('object');
                    done();
                }
            });
        });
        it("Get a member by passing invalid member id and valid service name", function (done) {
            memberRepo.getById(serviceName, 'invalid', function (result) {
                result.should.have.property('error');
                done();
            });
        });
        it("Get a member by passing valid member id and null service name", function (done) {
            memberRepo.getById(null, memberId, function (result) {
                result.should.have.property('error');
                done();
            });
        });
    });
    describe("put() function", function () {
        it("Update a member by passing valid member id and service name", function (done) {
            var member = {
                "_id": memberId,
                "givenName": "John",
                "additionalName": "K",
                "familyName": "Marshal",
                "email": "johnm@gmail.com",
                "telephone": "87897989",
                "address": "Sydney Australia updated",
                "image": ""
            };
            memberRepo.put(serviceName, member, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Update a member by passing invalid member id and valid service name", function (done) {
            var member = {
                "_id": 'invalid',
                "givenName": "John",
                "additionalName": "K",
                "familyName": "Marshal",
                "email": "johnm@gmail.com",
                "telephone": "87897989",
                "address": "Sydney Australia updated",
                "image": ""
            };
            memberRepo.put(serviceName, member, function (result) {
                result.should.have.property('error');
                result.should.have.property('status', false);
                done();
            });
        });
        it("Update a member by passing valid member id and null service name", function (done) {
            var member = {
                "_id": memberId,
                "givenName": "John",
                "additionalName": "K",
                "familyName": "Marshal",
                "email": "johnm@gmail.com",
                "telephone": "87897989",
                "address": "Sydney Australia updated",
                "image": ""
            };
            memberRepo.put(null, member, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });
});
describe("Remove member and service", function () {
    var serviceName = "Facebook";
    describe("remove() function", function () {
        it("Remove a member by passing valid member id and service name", function (done) {
            memberRepo.remove(serviceName, memberId, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Remove a member by passing valid member id and null service name", function (done) {
            memberRepo.remove(null, memberId, function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
        it("Remove a member by passing invalid member id and valid service name", function (done) {
            memberRepo.remove(serviceName, 'invalid', function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });

    });
    describe("removeServiceByServiceId() function", function () {
        it("Remove a service by passing valid service id", function (done) {
            serviceRepo.removeServiceByServiceId(serviceId, function (result) {
                if (result.error) {
                    result.should.have.property('status', false);
                    result.should.have.property('error');
                    done(result.error);
                }
                else {
                    result.should.have.property('status', true);
                    done();
                }
            });
        });
        it("Remove a service by passing invalid service id", function (done) {
            serviceRepo.removeServiceByServiceId('invalid', function (result) {
                result.should.have.property('status', false);
                result.should.have.property('error');
                done();
            });
        });
    });

});
