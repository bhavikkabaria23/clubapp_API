var express = require('express');
var router = express.Router();

var registration = require('../repo/registration'); //skills.js is the name of the file
router.get('/', function (req, res, next) {
    registration.get(function (result) {
        res.json(result.registrations);
    });
});

router.get("/:registerID", function (req, res, next) {
    registration.getById(req.params.registerID, function (result) {
        res.json(result.registration);
    });
});

// This not in use, just for developer testing purpose
router.delete("/:registerID", function (req, res) {
    registration.removePhysicalByIdId(req.params.registerID, function (result) {
        res.json({ status: result.status, error: result.error });
    });
})

router.post('/', function (req, res, next) {
    registration.post(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.put('/', function (req, res, next) {
    registration.put(req.body, function (result) {
        res.json({ status: result.status, error: result.error, message: result.message });
    });
});

router.get("/getAgeGroup/:maxAge", function (req, res, next) {
    var maxAge = req.params.maxAge;
    registration.getAgeGroup(maxAge, function (result) {
        res.json(result.ageGroup);
    });
})

// This not in use, just for developer testing purpose
router.delete("/AgeGroup", function (req, res, next) {
    registration.removeAgeGroup(function (result) {
        res.json({ status: result.status, error: result.error });
    });
})

// router.get("/getAgeGroup", function(req, res, next) {
//     AgeGroup.find(function(err, ageGroups) {
//         if (err) {
//             return next(err);
//         }
//         res.json(ageGroups);
//     });
// })

//Mock Api method for AgeGroup Logic
router.post("/saveAgeGroup", function (req, res, next) {
    registration.post(function (result) {
        res.json({ status: result.status });
    });
})

router.post("/emailExist", function (req, res, next) {
    registration.post(req.body, function (result) {
        res.json({ status: result.status, error: result.error });
    });
});

router.get('/json/format', function (req, res, next) {
    console.log("bhavik bhavik");
    var sections = [];
    var section = {};

    section = {
        "SectionHeader": "",
        field: [{
            FieldName: "Player Name",
            IsRequired: "Yes",
            Maxlength: 30,
            Type: "String"
        }, {
                FieldName: "FFA Registration Number",
                IsRequired: "No",
                Maxlength: 30,
                Type: "String"
            }, {
                FieldName: "Date of Birth",
                IsRequired: "Yes",
                Maxlength: "",
                Type: "Date"
            }, {
                FieldName: "Age Group",
                IsRequired: "Yes",
                Maxlength: "",
                Type: "String"
            }, {
                FieldName: "Preferred Playing Position",
                IsRequired: "Yes",
                Maxlength: "",
                Type: "String"
            }, {
                FieldName: "Gender",
                IsRequired: "Yes",
                Maxlength: "",
                Type: "String"
            }, {
                FieldName: "Briefly state your objectives and ambitions",
                IsRequired: "No",
                Maxlength: 500,
                Type: "String"
            }]
    }
    sections.push(section);

    section = {
        "SectionHeader": "Contact Details",
        field: [{
            FieldName: "Residential Address",
            IsRequired: "Yes",
            Maxlength: 200,
            Type: "String"
        }, {
                FieldName: "Home Number",
                IsRequired: "Yes",
                Maxlength: 20,
                Type: "String"
            }, {
                FieldName: "Mobile Number",
                IsRequired: "Yes",
                Maxlength: 20,
                Type: "String"
            }, {
                FieldName: "Email Address",
                IsRequired: "Yes",
                Maxlength: 30,
                Type: "String"
            }]
    }
    sections.push(section);
    section = {
        "SectionHeader": "Contact Person - 1",
        field: [{
            FieldName: "Person Name",
            IsRequired: "Yes",
            Maxlength: 30,
            Type: "String"
        }, {
                FieldName: "Relationship",
                IsRequired: "Yes",
                Maxlength: 20,
                Type: "String"
            }, {
                FieldName: "Contact Number",
                IsRequired: "Yes",
                Maxlength: 20,
                Type: "String"
            }, {
                FieldName: "Email Address",
                IsRequired: "Yes",
                Maxlength: 30,
                Type: "String"
            }]
    }
    sections.push(section);
    section = {
        "SectionHeader": "Contact Person - 2",
        field: [{
            FieldName: "Person Name",
            IsRequired: "No",
            Maxlength: 30,
            Type: "String"
        }, {
                FieldName: "Relationship",
                IsRequired: "No",
                Maxlength: 20,
                Type: "String"
            }, {
                FieldName: "Contact Number",
                IsRequired: "No",
                Maxlength: 20,
                Type: "String"
            }, {
                FieldName: "Email Address",
                IsRequired: "No",
                Maxlength: 30,
                Type: "String"
            }]
    }
    sections.push(section);
    section = {
        "SectionHeader": "Study and/or Work Details",
        field: [{
            FieldName: "Details of School",
            IsRequired: "No",
            Maxlength: 500,
            Type: "String"
        }, {
                FieldName: "Details of Employment",
                IsRequired: "No",
                Maxlength: 500,
                Type: "String"
            }]
    }
    sections.push(section);
    section = {
        "SectionHeader": "Playing History",
        field: [{
            FieldName: "Previous Club (2016)",
            IsRequired: "Yes",
            Maxlength: 200,
            Type: "String"
        }, {
                FieldName: "Previous Club (2015)",
                IsRequired: "Yes",
                Maxlength: 200,
                Type: "String"
            }, {
                FieldName: "Details of Current Suspensions",
                IsRequired: "Yes",
                Maxlength: 500,
                Type: "String"
            }, {
                FieldName: "Details of Injuries",
                IsRequired: "Yes",
                Maxlength: 500,
                Type: "String"
            }]
    }
    sections.push(section);
    section = {
        "SectionHeader": "Football Academy or Trainer Details (if applicable)",
        field: [{
            FieldName: "Head Coach Name",
            IsRequired: "No",
            Maxlength: 30,
            Type: "String"
        }, {
                FieldName: "Contact Details. (Phone & Email)",
                IsRequired: "No",
                Maxlength: 200,
                Type: "String"
            }, {
                FieldName: "Number of Sessions per Week",
                IsRequired: "No",
                Maxlength: 10,
                Type: "Number"
            }]
    }
    sections.push(section);

    section = {
        "SectionHeader": "Details of Football Trips (if any)",
        field: [{
            FieldName: "Arranged by",
            IsRequired: "No",
            Maxlength: 30,
            Type: "String"
        }, {
                FieldName: "Destination",
                IsRequired: "No",
                Maxlength: 30,
                Type: "String"
            }, {
                FieldName: "Purpose of Trip",
                IsRequired: "No",
                Maxlength: 500,
                Type: "String"
            }]
    }
    sections.push(section);

    res.json(sections);
});

// This is not use in club app,just use to export to excel externaly
router.get("/export/csv", function (req, res, next) {
    registration.exportToCsv(function (result) {
        res.json(result.registrations);
    });
});

module.exports = router;
