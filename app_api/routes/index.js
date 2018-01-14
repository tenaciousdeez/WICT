var express = require('express');
var router = express.Router();
var ctrlDishes = require('../controllers/dishes');
var ctrlComments = require('../controllers/comments');
//var ctrlImageComments = require('../controllers/imageComments');

//Dishes routes
router.get('/dishes', ctrlDishes.dishesListByDistance);
router.post('/dishes', ctrlDishes.dishesCreate);
router.get('/dishes/:dishid', ctrlDishes.dishesReadOne);
router.put('/dishes/:dishid', ctrlDishes.dishesUpdateOne);
router.delete('/dishes/:dishid', ctrlDishes.dishesDeleteOne);

//Comments routes
router.post('/dishes/:dishid/comments', ctrlComments.commentsCreate);
router.get('/dishes/:dishid/comments/:commentid', ctrlComments.commentsReadOne);
router.put('/dishes/:dishid/comments/:commentid', ctrlComments.commentsUpdateOne);
router.delete('/dishes/:dishid/comments/:commentid', ctrlComments.commentsDeleteOne);

module.exports = router;
