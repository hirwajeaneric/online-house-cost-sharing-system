const rentRequestModel = require('../models/rentRequest.model');

exports.testing = (req, res, next) => {
    res.send('Rent Request Router works well!');
}

exports.list = (req, res, next) => {
    rentRequestModel.find()
    .then(response=> {
        if (response) {
        res.status(200).send(response)
        } else {
        res.status(404).send("No rent request available")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findById = (req, res, next) => {
    rentRequestModel.findById(req.query.id)
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No rent request available.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.findByHouseId = (req, res, next) => {
    rentRequestModel.find({houseId: req.query.houseId})
    .then(response=> {
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send("No request available.")
        }
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.save = (req, res, next) => {
    rentRequestModel.create(req.body)
    .then(response => {
        res.status(201).send({ message: 'Request sent!', rentRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    rentRequestModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(201).send({ message: 'Request updated!', rentRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.deleteRequest = (req, res, next) => {
    rentRequestModel.findByIdAndDelete(req.query.id)
    .then(response => {
        res.status(200).send({ message: 'Rent Request deleted!', rentRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}
