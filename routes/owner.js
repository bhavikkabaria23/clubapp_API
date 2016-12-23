var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
var resources = require('../resource.json');
var owner = require('../repo/owner');//owner.js is the name of the file
/* GET owners listing. */
router.get('/', function(req, res, next) {
    owner.get(function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.owners);
    });
});
// router.get('/Owners', function (req, res, next) {
//     Owner.find(function (err, owners) {
//         if (err) { return next(err); }

//         res.json(owners);
//     });
// });

router.get('/:ownerID', function(req, res, next) {
    owner.getById(req.params.ownerID, function(result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.owners);
    });
});

router.post('/signup', function(req, res, next) {
    owner.post(req.body, function(result) {
        if (result.hasOwnProperty('statusCode') && result.statusCode == 400) {
            res.status(400).json({
                message: result.message
            })
        }        
        res.json({
            status: result.status,
            token: result.token,
            ownerID: result.ownerID,
            message: result.message,
            error: result.error
        })
    });
});

router.post('/signin', function(req, res, next) {
    owner.signin(req, res, next, function(result) {
        if (result.hasOwnProperty('statusCode') && result.statusCode == 400) {
            res.status(400).json({
                message: result.message
            })
        }
        res.json({
            status: result.status,
            token: result.token,
            ownerID: result.ownerID,
            message: result.message
        })
    });
});


module.exports = router;