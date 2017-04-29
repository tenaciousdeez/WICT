//Get Home page
module.exports.homeDishList = function(req, res, next){
  res.render('dishes-list', { title: 'Home' });
};

//Get Dish Info page
module.exports.dishInfo = function(req, res, next){
  res.render('dish-info', { title: 'Dish Info' });
};

//Get Add Comment page
module.exports.addComment = function(req, res, next){
  res.render('index', { title: 'Add Comment' });
};
