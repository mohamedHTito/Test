const express = require('express');
const router = express.Router();
const modulePlantAcre = require('../../controller/adminPages/plantAcre')


router.post('/create', modulePlantAcre.insertPlantAcre);

module.exports = router;