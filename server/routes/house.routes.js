const express = require('express');
const { list, testing, save, update, removeHouse, findByUsername, findByTenant, broadSearch, findByVerified, findById, findByNumber, findByPhoneNumberOfFirstTenant, upload, findByJoinPost } = require('../controllers/house.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findByUsername', findByUsername);
router.get('/findById', findById);
router.get('/findByNumber', findByNumber);
router.get('/findByVerified', findByVerified);
router.get('/findByPhoneNumberOfFirstTenant', findByPhoneNumberOfFirstTenant);
router.get('/findByJoinPost', findByJoinPost);
router.get('/findByTenant', findByTenant);
router.get('/search', broadSearch);
router.post('/save', upload.single('photo'), save);
router.put('/update', upload.single('photo'), update);
router.delete('/delete', removeHouse);

module.exports = router;