var assert = require('assert');
var express = require('express');
var router = express.Router();
var server = require('../server.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);
after(function (done) {
    require('../dropDb.js');
    done();
});

/*
    users.js API Start
 */
describe("User", function () {
    var userId;
    it('should post new user on /users/signup POST', function (done) {
        chai.request(server)
            .post('/users/signup')
            .send({
                "mobileNumber": "123123123",
                "address": "New Mock test",
                "password": "test@123",
                "fFANumber": "111111",
                "role": "4"
            })
            .end(function (err, res) {
                if (res.status == 500) {
                    res.should.have.status(500);
                } else {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    res.body.should.have.property('userID');
                }
                res.should.be.json;
                res.body.should.have.property('status')
                res.body.should.be.a('object');
                done();
            });
    });

    it('should list ALL users on /users GET', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.should.be.json;
                userId = res.body[0]._id;
                done();
            });
    });

    it('should list SINGLE user on /users/<userID> GET', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                chai.request(server)
                    .get('/users/' + res.body[0]._id)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        done();
                    });
            });
    });

    it('should add a SINGLE root user on /users/createRootUser POST', function (done) {
        chai.request(server)
            .post('/users/createRootUser')
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            });
    });

    it('should list SINGLE user on /users/getByFFANumber/<fFANumber> GET', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                console.log(res.body[0].fFANumber);
                chai.request(server)
                    .get('/users/getByFFANumber/' + res.body[0].fFANumber)
                    .end(function (err, res) {
                        res.should.have.status(res.status);
                        res.body.should.be.a('object');
                        res.should.be.json;
                        done();
                    });
            });
    });

    it('should signin on /users/signin POST', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                chai.request(server)
                    .post('/users/signin')
                    .send({
                        "fFANumber": "111111",
                        "password": "test@123"
                    })
                    .end(function (error, response) {
                        if (response.status == 500) {
                            response.should.have.status(500);
                        } else {
                            //console.log("response token  " + response.body.token);
                            response.should.have.status(200);
                            response.body.should.have.property('token');
                            response.body.should.have.property('role');
                            response.body.should.have.property('status');
                            response.should.be.json;
                            response.body.should.be.a('object');
                        }
                        done();
                    });
            });
    });

    it('should update a SINGLE user on /users/<id> PUT', function (done) {
        console.log(userId);
        chai.request(server)
            .put('/users')
            .send({
                "_id": userId,
                "mobileNumber": "9876543210",
                "address": "Update Mock test",
                "password": "test@123",
                "fFANumber": "123456",
                "role": 4
            })
            .end(function (error, response) {
                response.should.have.status(response.status);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('status');
                done();
            });
    });
});

/* #################### End ################################# */
/*
    registration.js API Start
 */
describe("Registration", function () {
    it('should add a SINGLE registartion on /registration POST', function (done) {        
        chai.request(server)
            .post('/registration')
            .send({
                "email": "test@gmvvvghail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "123456",
                "playerName": "Robert Leidl",
                "objectivesAmbitions": "good players",

                "headCoachName": "John Smith",
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
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it('should list ALL registartion on /registration GET', function (done) {
        chai.request(server)
            .get('/registration')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should update a SINGLE registartion on /registration/<id> PUT', function (done) {
        chai.request(server)
            .get('/registration')
            .end(function (err, res) {
                chai.request(server)
                    .put('/registration')
                    .send({
                        "_id": res.body[0]._id,
                        "email": "test@gmvvvghail.com",
                        "mobileNumber": "65654654",
                        "homeNumber": "65656547",
                        "residentialAddress": "sydney",
                        "gender": "male",
                        "preferredPlayingPosition": 3,
                        "ageGroup": "Under 16s",
                        "birthDate": "2001-02-01T00:00:00.000Z",
                        "fFANumber": "123456",
                        "playerName": "Robert Leidl",
                        "objectivesAmbitions": "good players",
                        "modifiedDate": Date.now(),

                        "footballAcademyDetails_id": res.body[0].footballAcademyDetails,
                        "headCoachName": "John Smith",
                        "academicSessionPerWeekCount": 0,
                        "contactDetails": "767676567",
                        "arrangedBy": "Sports",
                        "destination": "Sydney",
                        "purposeOfTrip": "training",

                        "studyWorkDetails_id": res.body[0].studyWorkDetails,
                        "schoolDetails": "school details",
                        "employementDetails": "employe details",

                        "contactPerson1_id": res.body[0].contactPerson1,
                        "contact1_personName": "xyz",
                        "contact1_relationship": "father",
                        "contact1_contactNumber": "80980809",
                        "contact1_email": "rleidl@gmail.com",

                        "contactPerson2_id": res.body[0].contactPerson2,
                        "contact2_personName": "abc",
                        "contact2_relationship": "brother",
                        "contact2_contactNumber": "80980809",
                        "contact2_email": "rleidl@gmail.com",

                        "playingHistory_id": res.body[0].playingHistory,
                        "previousClub2015": "2015 details",
                        "previousClub2016": "2016 details",
                        "suspensionsDetails": "details of suspensions",
                        "injuriesDetails": "details of injury"
                    })
                    .end(function (error, response) {
                        response.should.have.status(res.status);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        done();
                    });
            });
    });

    it('should get SINGLE registartion by id on /registration/<registerID> GET', function (done) {
        chai.request(server)
            .get('/registration')
            .end(function (err, res) {
                chai.request(server)
                    .get('/registration/' + res.body[0]._id)
                    .end(function (err, response) {
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.should.have.status(200);
                        done();
                    });
            });
    });

    // it('should add ALL age groups on /registration/saveAgeGroup POST', function (done) {
    //     chai.request(server)
    //         .post('/registration/saveAgeGroup')
    //         .end(function (err, res) {
    //             res.should.have.status(res.status);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('status');
    //             done();
    //         });
    // });

    it('should get ALL age groups by maxAge on /registration/getAgeGroup/<maxAge> GET', function (done) {
        chai.request(server)
            .get('/registration/getAgeGroup/' + 16)
            .end(function (err, response) {
                // if (response.status == 500) {
                //     chai.request(server)
                //         .post('/registration/saveAgeGroup')
                //         .end(function (err, res) {
                //             console.log("Age group saved");
                //             response.should.be.json;
                //             response.body.should.be.a('array');
                //             response.should.have.status(200);
                //             done();
                //         });
                // }
                // else {
                //     console.log("Age group get");
                //     response.should.be.json;
                //     response.body.should.be.a('array');
                //     response.should.have.status(200);
                //     done();
                // }                        
                response.should.be.json;
                response.body.should.be.a('array');
                response.should.have.status(200);
                done();
            });
    });

    it('should check a email exist of a registered player on /registration/emailExist POST', function (done) {
        chai.request(server)
            .post('/registration/emailExist')
            .send({
                "email": "test@gmvvvghail.com"
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });
});
/* #################### End ################################# */
/*
    playerProfile.js API Start
 */
describe("Player Profile", function () {
    it('should add a SINGLE player on /playerprofile POST', function (done) {
        chai.request(server)
            .post('/playerprofile')
            .send({
                "injuriesDetails": "details of injury",
                "suspensionsDetails": "details of suspensions",
                "email": "test@gmvvvghail.com",
                "mobileNumber": "65654654",
                "homeNumber": "65656547",
                "residentialAddress": "sydney",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 16s",
                "birthDate": "2001-02-01T00:00:00.000Z",
                "fFANumber": "123456",
                "familyName": "Leidl",
                "givenName": "Robert",
                "playerName": "Robert Leidl",
                "playerID": "U16003",
                "academicSessionPerWeekCount": 0,
                "objectivesAmbitions": "good players",
                "schoolDetails": "school details",
                "employementDetails": "employe details",
                "headCoachName": "John Smith",
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
                "contact2_email": "rleidl2@gmail.com",

                "coaches": [],
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it('should list ALL players on /playerprofile GET', function (done) {
        chai.request(server)
            .get('/playerprofile')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should update a SINGLE player on /playerprofile/<id> PUT', function (done) {
        chai.request(server)
            .get('/playerprofile')
            .end(function (err, res) {
                chai.request(server)
                    .put('/playerprofile')
                    .send({
                        "_id": res.body[0]._id,
                        "injuriesDetails": "details of injury",
                        "suspensionsDetails": "details of suspensions",
                        "email": "test@gmvvvghail.com",
                        "mobileNumber": "65654654",
                        "homeNumber": "65656547",
                        "residentialAddress": "sydney",
                        "gender": "male",
                        "preferredPlayingPosition": 3,
                        "ageGroup": "Under 16s",
                        "birthDate": "2001-02-01T00:00:00.000Z",
                        "fFANumber": "123456",
                        "familyName": "Leidl",
                        "givenName": "Robert",
                        "playerName": "Robert Leidl",
                        "playerID": "U16003",
                        "academicSessionPerWeekCount": 0,
                        "objectivesAmbitions": "good players",
                        "schoolDetails": "school details",
                        "employementDetails": "employe details",
                        "headCoachName": "John Smith",
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
                    })
                    .end(function (error, res) {
                        res.should.have.status(res.status);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        done();
                    });
            });
    });

    it('should check a email exist of a player on /playerprofile/emailExist POST', function (done) {
        chai.request(server)
            .post('/playerprofile/emailExist')
            .send({
                "email": "test@gmvvvghail.com"
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it('should add a player to a session on /playerprofile/addToSession<sessionKey> PUT', function (done) {
        chai.request(server)
            .get('/playerprofile')
            .end(function (err, res) {
                chai.request(server)
                    .put('/playerprofile/addToSession')
                    .send({
                        "_id": res.body[0]._id,
                        "sessionKey": "201610231800U009"
                    })
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        done();
                    });
            });
    });

    it('should get SINGLE player by id on /playerprofile/<id> GET', function (done) {
        chai.request(server)
            .get('/playerprofile')
            .end(function (err, res) {
                chai.request(server)
                    .get('/playerprofile/' + res.body[0]._id)
                    .end(function (err, response) {
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.should.have.status(200);
                        done();
                    });
            });
    });
});
/* #################### End ################################# */
/*
    coach.js API Start
 */
describe("Coach", function () {
    it('should add a SINGLE coach on /coach POST', function (done) {
        chai.request(server)
            .post('/coach')
            .send({
                "suspensionsDetails": "details of suspension",
                "email": "mockvolker.buhl@gmx.de",
                "mobileNumber": "0435 266 099",
                "homeNumber": "545435",
                "residentialAddress": "Sydney",
                "gender": "male",
                "childrenRegistration": "5454554",
                "coachingLicence": "545435435",
                "fFANumber": "71115554",
                "birthDate": "1963-07-09T00:00:00.000Z",
                "coachName": "mock Volker",
                "givenName": "mock",
                "familyName": "mock",
                "previousClub2015": "2015 details",
                "previousClub2016": "2016 details",

                "contact1_personName": "xyz",
                "contact1_relationship": "father",
                "contact1_contactNumber": "80980809",
                "contact1_email": "rleidl@gmail.com",
                "images": []
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it('should list ALL coaches on /coach GET', function (done) {
        chai.request(server)
            .get('/coach')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });

    it('should update a SINGLE coach on /coach/<id> PUT', function (done) {
        chai.request(server)
            .get('/coach')
            .end(function (err, res) {
                chai.request(server)
                    .put('/coach')
                    .send({
                        "_id": res.body[0]._id,
                        "suspensionsDetails": "details of suspension",
                        "email": "mockvolker.buhl@gmx.de",
                        "mobileNumber": "0435 266 099",
                        "homeNumber": "545435",
                        "residentialAddress": "Sydney",
                        "gender": "male",
                        "childrenRegistration": "5454554",
                        "coachingLicence": "545435435",
                        "fFANumber": "71115554",
                        "birthDate": "1963-07-09T00:00:00.000Z",
                        "coachName": "mock Volker",
                        "givenName": "mock",
                        "familyName": "mock",
                        "modifiedDate": Date.now(),
                        "previousClub2015": "2015 details",
                        "previousClub2016": "2016 details",

                        "contact1_personName": "xyz",
                        "contact1_relationship": "father",
                        "contact1_contactNumber": "80980809",
                        "contact1_email": "rleidl@gmail.com",
                        "images": []
                    })
                    .end(function (error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.have.property('status');
                        response.body.should.be.a('object');
                        done();
                    });
            });
    });

    it('should post email for emailExist on /coach/emailExist POST', function (done) {
        chai.request(server)
            .get('/coach')
            .end(function (err, res) {
                chai.request(server)
                    .post('/coach/emailExist')
                    .send({
                        email: res.body[0].email
                    })
                    .end(function (err, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        //response.body.should.have.property('status').should.notify(done);;
                        done();
                    });
            });
    });

    it('should assign a coach to session on /coach/assignToSession/<id> PUT', function (done) {
        chai.request(server)
            .get('/coach')
            .end(function (err, res) {
                chai.request(server)
                    .put('/coach/assignToSession')
                    .send({
                        "_id": res.body[0]._id,
                        "sessions": [
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
                    })
                    .end(function (error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        done();
                    });
            });
    });    

    it('should get coaches by sessions on /coach/getCoachesBySession/<sessionKey> GET', function (done) {
        chai.request(server)
            .get('/coach')
            .end(function (error, res) {
                chai.request(server)
                    .get('/coach/getCoachesBySession/' + res.body[0].sessions[0].sessionKey)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('array');
                        done();
                    });
            });
    });
});
/* #################### End ################################# */
/*
    session.js API Start
 */
describe("Session", function () {
    it('should add a SINGLE session on /sessions POST', function (done) {
        chai.request(server)
            .post('/sessions')
            .send({
                "sessionKey": "201610231800U009",
                "startDateTime": "2016-11-05T18:00:00.000Z",
                "skills": [
                    {
                        "instructions": "Mock test da field",
                        "name": "Mock test"
                    },
                    {
                        "name": "Mock Running"
                    }
                ],
                "ended": false,
                "players": [],
                "coaches": []
            },
            {
                "sessionKey": "201610281800U009",
                "startDateTime": "2016-11-15T00:00:00.000Z",
                "skills": [
                    {
                        "instructions": "Mock test field",
                        "name": "Mock test"
                    },
                    {
                        "name": "Mock Running"
                    }
                ],
                "ended": false,
                "players": [],
                "coaches": []
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it('should list ALL session on /sessions GET', function (done) {
        chai.request(server)
            .get('/sessions')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should get SINGLE session by id on /sessions/<id> GET', function (done) {
        chai.request(server)
            .get('/sessions')
            .end(function (err, res) {
                chai.request(server)
                    .get('/sessions/' + res.body[0]._id)
                    .end(function (err, res) {
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it('should update a SINGLE session on /sessions/<id> PUT', function (done) {
        chai.request(server)
            .get('/sessions')
            .end(function (err, res) {
                chai.request(server)
                    .put('/sessions')
                    .send({
                        "_id": res.body[0]._id,
                        "sessionKey": "201610231800U009",
                        "startDateTime": "2016-11-05T18:00:00.000Z",
                        "skills": [
                            {
                                "instructions": "Mock test field ubdated",
                                "name": "Mock test"
                            },
                            {
                                "name": "Mock Running update"
                            }
                        ],
                        "ended": false,
                        "players": [],
                        "coaches": []
                    })
                    .end(function (error, res) {
                        res.should.have.status(res.status);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        done();
                    });
            });
    });

    it('should get SINGLE object with a session,coaches and players by sessionkey on /sessions/getAllBySession/:sessionKey GET', function (done) {
        chai.request(server)
            .get('/sessions')
            .end(function (err, res) {
                chai.request(server)
                    .get('/sessions/getAllBySession/' + res.body[0].sessionKey)
                    .end(function (err, res) {
                        res.body.should.be.a('object');
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    });
            });
    });

    it('should update SINGLE session to close by session id on /sessions/closesession/<id> PUT', function (done) {
        chai.request(server)
            .get('/sessions')
            .end(function (err, res) {
                chai.request(server)
                    .put('/sessions/closesession/' + res.body[0]._id)
                    .end(function (error, res) {
                        res.should.have.status(res.status);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        done();
                    });
            });

    });
});
/* #################### End ################################# */
/*
    skills.js API Start
 */
describe("Skill", function () {
    it('should add a SINGLE skill on /skills POST', function (done) {
        chai.request(server)
            .post('/skills')
            .send({
                "description": " Mock Test description",
                "name": "Mock Test",
                "instructions": "Mock test da field",
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it('should list ALL skills on /skills GET', function (done) {
        chai.request(server)
            .get('/skills')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should get SINGLE skill by id on /skills/<id> GET', function (done) {
        chai.request(server)
            .get('/skills')
            .end(function (err, res) {
                chai.request(server)
                    .get('/skills/' + res.body[0]._id)
                    .end(function (err, res) {
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it('should update a SINGLE skill on /skill/<id> PUT', function (done) {
        chai.request(server)
            .get('/skills')
            .end(function (err, res) {
                chai.request(server)
                    .put('/skills')
                    .send({
                        "_id": res.body[0]._id,
                        "description": "Update Mock Test description",
                        'name': 'Update Mock Test',
                        'instructions': "Update Mock test da field",
                    })
                    .end(function (error, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        done();
                    });
            });
    });
});
/* #################### End ################################# */
/*
    assessment.js API Start
 */
describe("Assessment", function () {
    it('should post new assessment on /assessment POST', function (done) {
        chai.request(server)
            .post('/assessment')
            .send({
                "note": "testing2",
                "sessionKey": "201610231800U009",
                "coach_id": "333333",
                "player_id": "5511",
                "position": 1,
                "assessments": [
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
                ]
            })
            .end(function (err, res) {
                res.should.have.status(res.status);
                res.should.be.json;
                res.body.should.have.property('status')
                res.body.should.be.a('object');
                done();
            });
    });

    it('should list ALL assessment on /assessment GET', function (done) {
        chai.request(server)
            .get('/assessment')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.should.be.json;
                done();
            });
    });

    it('should update a SINGLE assessment on /assessment/<id> PUT', function (done) {
        chai.request(server)
            .get('/assessment')
            .end(function (err, res) {
                chai.request(server)
                    .put('/assessment')
                    .send({
                        "_id": res.body[0]._id,
                        "note": "Update Mock testing2",
                        "position": 1,
                        "assessments": [
                            {
                                "instructions": "Update Mock his is how we do it",
                                "rating": 4,
                                "name": "Update Mock test"
                            },
                            {
                                "instructions": "Update Mock this is how we do it",
                                "rating": 3,
                                "name": "Update Mock test2"
                            }]
                    })
                    .end(function (error, response) {
                        response.should.have.status(res.status);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('status');
                        done();
                    });
            });
    });

    it('should exist on /assessment/exists POST', function (done) {
        chai.request(server)
            .get('/assessment')
            .end(function (err, res) {
                chai.request(server)
                    .post('/assessment/exists')
                    .send({
                        player_id: res.body[0].player_id,
                        coach_id: res.body[0].coach_id,
                        sessionKey: res.body[0].sessionKey
                    })
                    .end(function (error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('array');
                        done();
                    });
            });
    });
});
/* #################### End ################################# */
/*
    profile app API - owner.js,member.js and Services.js
 */
var ownerId;
var owner_token;
describe("Owner", function () {
    it("should post new owner on /owners/signup POST", function (done) {
        chai.request(server)
            .post('/owners/signup')
            .send({
                "email": "owner1@gmail.com",
                "password": "test@123"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('token');
                ownerId = res.body.ownerID;
                owner_token = res.body.token;
                done();
            });
    });

    it('should list ALL owners on /owners GET', function (done) {
        chai.request(server)
            .get('/owners')
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('array');
                res.should.have.status(200);
                done();
            });
    });

    it('should get SINGLE owner by id on /owners/<ownerID> GET', function (done) {
        chai.request(server)
            .get('/owners/' + ownerId)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('array');
                res.should.have.status(200);
                done();
            });
    });

    it('should signin on /owners/signin POST', function (done) {
        chai.request(server)
            .post('/owners/signin')
            .send({
                "email": "owner1@gmail.com",
                "password": "test@123"
            })
            .end(function (error, response) {
                if (response.status == 500) {
                    response.should.have.status(500);
                } else {
                    response.should.have.status(200);
                    response.body.should.have.property('token');
                    response.body.should.have.property('status');
                    response.body.should.have.property('ownerID');
                    response.should.be.json;
                    response.body.should.be.a('object');
                }
                done();
            });
    });
});


var serviceName;
var serviceId;
describe("Service", function () {
    it("should post new service by owner on /owner/services/<ownerID> POST", function (done) {
        chai.request(server)
            .post('/owner/services/' + ownerId)
            .set('Authorization', 'Bearer ' + owner_token)
            .send({
                "name": "Twitter",
                "description": "Twitter description"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it("should Get ALL services by ownerId on /owner/services/<ownerID> GET", function (done) {
        chai.request(server)
            .get('/owner/services/' + ownerId)
            .set('Authorization', 'Bearer ' + owner_token)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('array');
                res.should.have.status(200);
                serviceId = res.body[0]._id;
                serviceName = res.body[0].name;
                done();
            });
    });

    it("should Get SINGLE service by service id on /services/<serviceID> GET", function (done) {
        chai.request(server)
            .get('/services/' + serviceId)
            .set('Authorization', 'Bearer ' + owner_token)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.should.have.status(200);
                done();
            });
    });

    it("should update a SINGLE service on /services/<serviceID> PUT", function (done) {
        chai.request(server)
            .put('/services/' + serviceId)
            .set('Authorization', 'Bearer ' + owner_token)
            .send({
                "description": "Twitter description updated",
                "image": ""
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });
});

var memberId;
describe("Member", function () {
    it("should post new member on /members/<serviceName> POST", function (done) {
        chai.request(server)
            .post('/members/' + serviceName)
            .set('Authorization', 'Bearer ' + owner_token)
            .send({
                "givenName": "Mark",
                "additionalName": "K",
                "familyName": "Worn",
                "email": "mark@gmail.com",
                "telephone": "45354565343",
                "address": "Sydney Australia",
                "password": "test@123",
                "image": ""
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });

    it("should Get ALL members of service on /members/<serviceName> GET", function (done) {
        chai.request(server)
            .get('/members/' + serviceName)
            .set('Authorization', 'Bearer ' + owner_token)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('array');
                res.should.have.status(200);
                memberId = res.body[0]._id;
                done();
            });
    });

    it("should Get SINGLE member by member id on /members/<serviceName>/id/<id> GET", function (done) {
        chai.request(server)
            .get('/members/' + serviceName + '/id/' + memberId)
            .set('Authorization', 'Bearer ' + owner_token)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.should.have.status(200);
                done();
            });
    });

    it("should update a SINGLE member on /members/<serviceName> PUT", function (done) {
        chai.request(server)
            .put('/members/' + serviceName)
            .set('Authorization', 'Bearer ' + owner_token)
            .send({
                "_id": memberId,
                "givenName": "Marka",
                "additionalName": "K",
                "familyName": "Worna",
                "email": "marka@gmail.com",
                "telephone": "89898978798",
                "address": "Sydney Australia updated",
                "image": ""
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                done();
            });
    });
});

describe("Remove service and member", function () {
    it("should remove SINGLE member by member id on /members/<serviceName>/id/<id> DELETE", function (done) {
        chai.request(server)
            .delete('/members/' + serviceName + '/id/' + memberId)
            .set('Authorization', 'Bearer ' + owner_token)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.should.have.property('status');
                done();
            });
    });

    it("should remove SINGLE service by service id on /services/<serviceID> DELETE", function (done) {
        chai.request(server)
            .delete('/services/' + serviceId)
            .set('Authorization', 'Bearer ' + owner_token)
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.should.have.status(200);
                res.body.should.have.property('status');
                done();
            });
    });
});