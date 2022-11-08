const express = require('express');
const { list, testing, save, update, removeHouse, findByStatus, findByLocation, findByTenant, broadSearch, findByVerified, findByEmail, findById, findByNumber } = require('../controllers/house.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findByStatus', findByStatus);
router.get('/findById', findById);
router.get('/findByNumber', findByNumber);
router.get('/findByVerified', findByVerified);
router.get('/findByEmail', findByEmail);
router.get('/findByLocation', findByLocation);
router.get('/findByTenant', findByTenant);
router.get('/search', broadSearch);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete', removeHouse);

module.exports = router;