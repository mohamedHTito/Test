const express = require('express');
const router = express.Router();
const modulePlant = require('../../controller/adminPages/plant')


router.get('/selectAll', modulePlant.selectAll);
router.get('/selectAllEnd', modulePlant.selectAllEnd);

router.post('/create', modulePlant.insertPlant);

module.exports = router;