const express = require('express');
const { 
    deleteByContractNumber, 
    deleteContract, 
    save, 
    update, 
    findByTenantId, 
    findByOwnerId, 
    findByNumber, 
    findById, 
    list, 
    testing, 
    findByOwnerUsername, 
    findByTenantOneUsername, 
    findByTenantTwoUsername, 
    findByHouseNumber
} = require('../controllers/contract.controller');
const router = express.Router();

router.get('/test', testing);
router.get('/list', list);
router.get('/findById', findById);
router.get('/findByNumber', findByNumber);
router.get('/findByHouseNumber', findByHouseNumber);
router.get('/findByOwnerId', findByOwnerId);
router.get('/findByTenantId', findByTenantId);
router.get('/findByOwnerUsername', findByOwnerUsername);
router.get('/findByTenantOneUsername', findByTenantOneUsername);
router.get('/findByTenantTwoUsername', findByTenantTwoUsername);
router.post('/save', save);
router.put('/update', update);
router.delete('/delete-contract', deleteContract);
router.delete('/deleteByContractNumber', deleteByContractNumber);

module.exports = router;