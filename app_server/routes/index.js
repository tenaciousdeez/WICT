var express = require('express');
var router = express.Router();
var ctrlDishes = require('../controllers/dishes');
var ctrlOthers = require('../controllers/others');

//Dishes pages
router.get('/', ctrlDishes.homeDishList);
router.get('/dish', ctrlDishes.dishInfo);
router.get('/dish/comment/new', ctrlDishes.addComment);

//Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;
