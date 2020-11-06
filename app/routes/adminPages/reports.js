const express = require('express');
const router = express.Router();
const moduleReports = require('../../controller/adminPages/reports')


router.get('/plan', moduleReports.plan);


module.exports = router;