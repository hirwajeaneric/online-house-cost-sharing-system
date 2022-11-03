const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
    age: {type: String, require: true},
    gender: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    nationality: {type: String, required: true},
    occupation: {type: String, required: true},
    hasPet: {type: String, required: true},
    specialMedicalConditions: {type: String, required: true},
    handicaped: {type: String, required: true},
    drink: {type: String, required: true},
    smoke: {type: String, required: true},
    comment: {type: String, required: false},
    agreeWithCriteria: {type: String, required: true},
    sendDate: {type: String, required: true},
    approved: {type: String, required: true},
});

const JoinRequest = mongoose.model('joinRequest', joinRequestSchema);

module.exports = JoinRequest