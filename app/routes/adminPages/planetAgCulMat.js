const express = require('express');
const router = express.Router();
const planetAgCulMatWorker = require('../../controller/adminPages/planetAgCulMat')


router.post('/create', planetAgCulMatWorker.insertPlantAgriculturalMaterials);

module.exports = router;