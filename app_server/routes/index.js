var express = require('express');
var router = express.Router();
var ctrlDishes = require('../controllers/dishes');
var ctrlOthers = require('../controllers/others');

//App Homepage
router.get('/', ctrlOthers.angularApp);

module.exports = router;
