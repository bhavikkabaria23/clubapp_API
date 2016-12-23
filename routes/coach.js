var express = require('express');
var router = express.Router();
var resources = require('../resource.json');
var coach = require('../repo/coach');//coach.js is the name of the file

// delete coach as physically. It is used for testing purpose only.
router.delete('/tempcoach/:coachID', function(req, res) {
    coach.tempcoach(req.params.coachID, function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.send(result.message);
    });
});

router.get('/', function(req, res, next) {
    coach.get(function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.coaches);
    });
});

router.get('/:coachID', function(req, res, next) {
    coach.getById(req.params.coachID, function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.coach);
    });
});

router.post('/', function(req, res, next) {
    coach.post(req.body, function(result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function(req, res, next) {
    coach.put(req.body, function(result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.post("/emailExist", function(req, res, next) {
    coach.exists(req.body.email, function(result) {
        res.json({ status: result.status, error: result.error });
    });
});

router.put('/assignToSession', function(req, res, next) {
    coach.assignToSession(req.body, function(result) {
        res.json({ status: result.status, error: result.error });
    });
});
// This is not in use
// router.post('/signin', function(req, res, next) {
//     coach.signin(req, res, next, function(result) {
//         if (result.hasOwnProperty('statusCode') && result.statusCode == 400) {
//             res.status(400).json({
//                 message: result.message
//             })
//         }
//         res.json({
//             status: result.status,
//             token: result.token,
//             coachID: result.coachID,
//             message: result.message
//         })
//     });
// });

// This is not in use
router.get('/getCoachesBySession/:sessionKey', function(req, res, next) {
    coach.getCoachesBySession(req.params.sessionKey, function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.coaches);
    });
});

module.exports = router;
