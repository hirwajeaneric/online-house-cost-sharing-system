const express = require('express');
const { list, signin, signup, updateAccount, deleteAccount, testing, findByUsername } = require('../controllers/tenant.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findByUsername', findByUsername);
router.post('/signin', signin);
router.post('/signup', signup);
router.put('/update', updateAccount);
router.delete('/delete', deleteAccount);

module.exports = router;