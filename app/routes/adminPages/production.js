
const express = require('express');
const router = express.Router();
const moduleProduction = require('../../controller/adminPages/production')

router.post('/create', moduleProduction.insertProduction);

module.exports = router;

