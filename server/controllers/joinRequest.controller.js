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

// exports.broadSearch = (req, res, next) => {
//     joinRequestModel.find({ 
//         age: req.query. age, 
//         gender: req.query.gender,
//         maritalStatus: req.query.maritalStatus,
//         languages: req.query.languages,
//         nationality: req.query.bathRooms,
//         occupation: req.query.occupation,
//         hasPet: req.query.hasPet,
//         specialMedicalConditions: req.query.specialMedicalConditions,
//         handicaped: req.query.handicaped,
//         drink: req.query.drink,
//         smoke: req.query.smoke,
//         party: req.query.party,
//         postDate: req.query.postDate,
//         numberOfJoinRequests: req.query.numberOfJoinRequests     
//     })
//     .then(response=> {
//         if (response) {
//             res.status(200).send(response)
//         } else {
//             res.status(404).send("No post available for this filter.")
//         }
//     })
//     .catch(err=>{
//         res.status(500).send("Server error: "+err)
//     })
// }

exports.save = (req, res, next) => {
    joinRequestModel.save()
    .then(response => {
        res.status(200).send({ message: 'Request posted!', joinRequest: response })
    })
    .catch(err=>{
        res.status(500).send("Server error: "+err)
    })
}

exports.update = (req, res, next) => {
    joinRequestModel.findByIdAndUpdate(req.query.id, req.body)
    .then(response => {
        res.status(200).send({ message: 'Request updated!', joinRequest: response })
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
