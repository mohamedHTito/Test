const express = require('express');
const router = express.Router();
const moduleAcre = require('../../controller/adminPages/acre')

router.get('/selectAll', moduleAcre.selectAll);

router.get('/selectDeleted', moduleAcre.selectAllDeleted);


router.post('/create', moduleAcre.insertAcre);


router.post('/update',moduleAcre.updateAcre);
router.post('/delete',moduleAcre.deleteAcre);

router.post('/restore', moduleAcre.restoreAcre);
module.exports = router;