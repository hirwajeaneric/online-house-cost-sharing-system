const express = require('express');
const { list, testing, save, update, deleteRequest, findById,  findByHouseId, findByUsername } = require('../controllers/rentRequest.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findById', findById);
router.get('/findByHouseId', findByHouseId);
router.get('/findByUsername', findByUsername);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete', deleteRequest);

module.exports = router;