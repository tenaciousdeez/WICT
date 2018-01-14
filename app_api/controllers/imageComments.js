var mongoose = require('mongoose');
var Dish = mongoose.model("Dish");

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.commentsCreate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
