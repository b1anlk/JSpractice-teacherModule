const mongoose = require('mongoose');

const Teachers =  mongoose.Schema({
    name : {type: String, required: true},
    phnum : {type: String, required: true},
    age : {type: String, required: true}
});

module.exports = mongoose.model('Teachers',Teachers);
