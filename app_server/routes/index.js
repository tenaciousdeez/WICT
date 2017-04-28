var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

//Get Home Page
router.get('/', ctrlMain.index);

module.exports = router;
