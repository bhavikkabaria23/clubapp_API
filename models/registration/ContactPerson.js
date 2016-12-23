var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
    personName: String,
    relationship: String,
    contactNumber: String,
    email: String,
    basicDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BasicDetails'
    }
});

mongoose.model('ContactPerson1', ContactSchema, 'ContactPerson1');
mongoose.model('ContactPerson2', ContactSchema, 'ContactPerson2');