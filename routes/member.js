var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
var member = require('../repo/member');//member.js is the name of the file

// Initialize connection once
router.get('/:serviceName', auth, function (req, res, next) {
    member.get(req.params.serviceName, function (result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.members);
    });
});

router.get('/:serviceName/id/:id', auth, function (req, res, next) {
    member.getById(req.params.serviceName, req.params.id, function (result) {
        if (result.error) {
            res.json(result.error);
        }
        res.json(result.member);
    });
});

router.put('/:serviceName', auth, function (req, res, next) {
    member.put(req.params.serviceName, req.body, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

router.post('/:serviceName', auth, function (req, res, next) {
    member.post(req.params.serviceName, req.body, function (result) {
        res.json({ status: result.status, error: result.error });
    });

});

router.delete('/:serviceName/id/:id', auth, function (req, res, next) {
    member.remove(req.params.serviceName, req.params.id, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

module.exports = router;