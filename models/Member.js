var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MembersSchema = new Schema({
    givenName: String,
    additionalName: String,
    familyName: String,
    email: { type: String, unique: true, required: true },
    telephone: String,
    createdBy: String,
    modifiedBy: String,
    address: String,
    password: { type: String, required: true },
    salt: String,
    image: { data: Buffer, contentType: String },
    isActive: { type: Boolean, default: true }
});
module.exports = MembersSchema;