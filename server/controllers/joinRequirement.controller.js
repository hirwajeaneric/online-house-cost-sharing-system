const joinRequirementModel = require('../models/joiningRequirements.model');
const axios = require('axios');
const { response } = require('express');

exports.testing = (req, res, next) => {
    res.send('Join requirements router works well!');
}

exports.list = (req, res, next) => {
    joinRequirementModel.find()
    .then(response=> {
        if (response) {
        res.status(200).send(response)
        } else {
        res.status(404).send("No houses available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.broadSearch = (req, res, next) => {
    joinRequirementModel.find({ 
        age: req.query. age, 
        gender: req.query.gender,
        maritalStatus: req.query.maritalStatus,
        languages: req.query.languages,
        nationality: req.query.bathRooms,
        occupation: req.query.occupation,
        hasPet: req.query.hasPet,
        specialMedicalConditions: req.query.specialMedicalConditions,
        handicaped: req.query.handicaped,
        drink: req.query.drink,
        smoke: req.query.smoke,
        party: req.query.party,
        postDate: req.query.postDate,
        numberOfJoinRequests: req.query.numberOfJoinRequests     
    })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No post available for this filter.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findById = (req, res, next) => {
    joinRequirementModel.findById(req.query.id)
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No such post available.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByEmail = (req, res, next) => {
    joinRequirementModel.find({ email: req.query.email })
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No post available for this filter.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.save = (req, res, next) => {
    joinRequirementModel.create(req.body)
    .then(response => {
        next();
        res.status(201).send({message: 'Join request saved', joinRequest: response});
    })
    .catch(error=>res.status(500).send({message: error}));
}

exports.updatingHouseData = (req, res, next) => {
    updateHouse(req);
}

function updateHouse(req) {
    const findHouse = (fetchedRequirements) => {
        axios.get(`http://localhost:5000/api/house/findByPhoneNumberOfFirstTenant?phoneNumberOfFirstTenant=${fetchedRequirements[0].phoneNumber}`)
        .then(response => {
            var fetchedHouse = response.data;
            stepTwo(fetchedHouse, fetchedRequirements);
        })
        .catch(error=>console.log(error));
    }

    const findRequirements = (req) => {
        axios.get(`http://localhost:5000/api/joinRequirements/findByEmail?email=${req.body.email}`)
        .then(response => {
          findHouse(response.data);  
        })
        .catch(error=>console.log(error));
    }

    findRequirements(req);

    const stepTwo = (fetchedHouse, fetchedRequirements) => {
        fetchedHouse[0].joinPost = fetchedRequirements[0]._id;
        axios.put(`http://localhost:5000/api/house/update?id=${fetchedHouse[0]._id}`, fetchedHouse[0])
        .then(response => {
            console.log('Successfully Updated house');
            console.log(response.data);
        })
        .catch(error=> console.log(error))
    }
};


exports.update = (req, res, next) => {
    joinRequirementModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(200).send({ message: 'Joining requirements updated!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.deleteRequest = (req, res, next) => {
    joinRequirementModel.findByIdAndDelete(req.query.id)
    .then(response => {
        res.status(200).send({ message: 'Joining requirements deleted!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}
