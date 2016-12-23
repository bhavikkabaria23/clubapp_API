var mongoose = require('mongoose');

var SkillsSchema = new mongoose.Schema({
    name: String,
    instructions: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

mongoose.model('Skills', SkillsSchema, 'Skills');
