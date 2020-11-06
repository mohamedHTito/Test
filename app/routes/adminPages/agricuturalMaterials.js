const express = require('express');
const router = express.Router();
const moduleAgricuturalMaterials = require('../../controller/adminPages/agricuturalMaterials')

router.get('/selectAll', moduleAgricuturalMaterials.selectAll);

router.get('/selectDeleted', moduleAgricuturalMaterials.selectAllDeleted);


router.post('/create', moduleAgricuturalMaterials.insertAgriculturalMaterials);


router.post('/update',moduleAgricuturalMaterials.updateAgriculturalMaterials);
router.post('/delete',moduleAgricuturalMaterials.deleteAgriculturalMaterials);

router.post('/restore', moduleAgricuturalMaterials.restoreAgriculturalMaterials);

module.exports = router;