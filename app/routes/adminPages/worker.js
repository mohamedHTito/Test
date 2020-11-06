const express = require('express');
const router = express.Router();
const moduleWorker = require('../../controller/adminPages/worker')


router.get('/selectWorkerPosition', moduleWorker.selectWorkerPosition);

router.get('/selectDeleted', moduleWorker.selectAllDeleted);


router.post('/create', moduleWorker.insertWorker);


router.post('/update',moduleWorker.updateWorker);
router.post('/delete',moduleWorker.deleteWorker);

router.post('/restore', moduleWorker.restoreWorker);

module.exports = router;