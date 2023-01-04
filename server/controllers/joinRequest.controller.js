const joinRequestModel = require('../models/joinRequest.model');

exports.testing = (req, res, next) => {
    res.send('Join Request Router works well!');
}

exports.list = (req, res, next) => {
    joinRequestModel.find()
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

exports.findById = (req, res, next) => {
    joinRequestModel.findById(req.query.id)
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

exports.findByUsername = (req, res, next) => {
    joinRequestModel.find({username: req.query.username})
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

exports.findByJoinPost = (req, res, next) => {
    joinRequestModel.find({joinPost: req.query.joinPost})
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
    joinRequestModel.create(req.body)
    .then(response => {
        res.status(201).send({ message: 'Request posted!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    joinRequestModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(201).send({ message: 'Request updated!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.deleteRequest = (req, res, next) => {
    joinRequestModel.findByIdAndDelete(req.query.id)
    .then(response => {
        res.status(200).send({ message: 'Join Request deleted!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}
