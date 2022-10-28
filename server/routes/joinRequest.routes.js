const express = require('express');
const { list, testing, save, update, deleteRequest } = require('../controllers/joinRequest.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete', deleteRequest);

module.exports = router;