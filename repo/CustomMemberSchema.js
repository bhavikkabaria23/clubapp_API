var mongoose = require('mongoose');
var MembersSchema = require('../models/Member');
module.exports = function (name) {
    try {
        return mongoose.model(name, MembersSchema, name);
    } catch (e) {
        //console.log(e.name);
        // if (e.name === 'OverwriteModelError') {
        //     return null;
        // }
    }
}