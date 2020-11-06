const express = require('express');
const router = express.Router();
const plantWorker = require('../../controller/adminPages/plantWorker')


router.post('/create', plantWorker.insertPlantWorker);

module.exports = router;