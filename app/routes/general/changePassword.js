const express = require('express');
const router = express.Router();
 
const modulechangePassword = require('../../controller/general/changePassword');



router.post('/user', modulechangePassword.changeUserPassword);
router.post('/changeUserPasswordById', modulechangePassword.changeUserPasswordById);



module.exports = router;