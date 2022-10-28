const express = require('express');
const { testing, list, save, update, broadSearch, deleteRequest } = require('../controllers/joinRequirement.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/search', broadSearch);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete', deleteRequest);

module.exports = router;