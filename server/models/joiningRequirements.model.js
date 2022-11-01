const mongoose = require('mongoose');

const joiningRequirementsSchema = new mongoose.Schema({
    names: {type: String, require: true},
    tenantGender: {type: String, require: true},
    email: {type: String, require: true},
    phoneNumber: {type: String, require: true},
    age: {type: String, require: true},
    gender: {type: String, required: true},
    maritalStatus: {type: String, required: true},
    languages: {type: String, required: true},
    hasPet: {type: String, required: true},
    hasSpecialMedicalConditions: {type: String, required: true},
    smoke: {type: String, required: true},
    moreDescriptions: {type: String, required: false},
    postDate: {type: String, required: true},
    numberOfJoinRequests: {type: String, required: false},
    refererEmail: {type: String, required: false},
    refererPhoneNumber: {type: String, required: false}
});

const JoiningRequirements = mongoose.model('joiningRequirements', joiningRequirementsSchema);

module.exports = JoiningRequirements