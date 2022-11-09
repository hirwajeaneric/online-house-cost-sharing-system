const express = require('express');
const { list, testing, save, update, deleteRequest, findById, findByJoinPost } = require('../controllers/joinRequest.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findById', findById);
router.get('/findByJoinPost', findByJoinPost);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete', deleteRequest);

module.exports = router;