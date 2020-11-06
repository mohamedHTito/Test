const express = require('express');
const router = express.Router();
const moduleLogin = require('../../controller/general/login')

router.post('/user', moduleLogin.userlogin);

module.exports = router;