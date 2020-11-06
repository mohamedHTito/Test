const express = require('express');
const router = express.Router();
const modulePosition = require('../../controller/adminPages/position')


router.get('/selectAll', modulePosition.selectAll);
router.get('/selectDeleted', modulePosition.selectAllDeleted);


router.post('/create', modulePosition.insertPosition);


router.post('/update',modulePosition.updatePosition);
router.post('/delete',modulePosition.deletePosition);

router.post('/restore', modulePosition.restorePosition);

module.exports = router;