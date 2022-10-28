const express = require('express');
const { list, signin, signup, updateAccount, deleteAccount, testing } = require('../controllers/admin.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.post('/signin', signin);
router.post('/signup', signup);
router.put('/update', updateAccount);
router.delete('/delete', deleteAccount);

module.exports = router;