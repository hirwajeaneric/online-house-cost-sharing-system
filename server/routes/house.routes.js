const express = require('express');
const { list, testing, save, update, removeHouse, findByStatus, findByLocation, findByTenant, broadSearch, findByVerified } = require('../controllers/house.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findByStatus', findByStatus);
router.get('/findByVerified', findByVerified);
router.get('/findByLocation', findByLocation);
router.get('/findByTenant', findByTenant);
router.get('/search', broadSearch);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete', removeHouse);

module.exports = router;