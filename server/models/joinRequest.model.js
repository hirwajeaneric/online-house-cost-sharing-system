const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
    name: {type: String, require: true}, 
    phoneNumber: {type: String, required: true},
    houseNumber: {type: String, required: true},
    nameOfOccupier: {type: String, required: true},
    location: {type: String, required: true},
    houseDescription: {type: String, required: true},
    houseId: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: String, require: true},
    gender: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    hasPet: {type: String, required: true},
    language: {type: String, required: true},
    specialMedicalConditions: {type: String, required: true},
    medicalCondition: {type: String, required: false},
    smoke: {type: String, required: true},
    comment: {type: String, required: false},
    sendDate: {type: String, required: true},
    approved: {type: String, required: true},
    joinPost: {type: String, required: true},
});

const JoinRequest = mongoose.model('joinRequest', joinRequestSchema);

module.exports = JoinRequest