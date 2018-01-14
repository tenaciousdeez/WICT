var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Helper method for adding the comments
var doAddComment = function (req, res, dish) {
  if (!dish) {
    sendJsonResponse(res, 404, {
      "message" : "dishid not found"
    });
  } else {
    dish.comments.push({
      author: req.body.author,
      commentText: req.body.commentText
    });
    dish.save(function(err, dish) {
      var thisComment;
      if(err) {
        sendJsonResponse(res, 400, err);
      } else {
        thisComment = dish.comments[dish.comments.length - 1];
        sendJsonResponse(res, 201, thisComment);
      }
    });
  }
};

//Add a comment - CREATE
module.exports.commentsCreate = function(req, res) {
  var dishid = req.params.dishid;
  if (dishid) {
    Dish
      .findById(dishid)
      .select('comments')
      .exec (
        function (err, dish) {
          if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          doAddComment(req, res, dish);
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message" : "Not found, dishid required"
    });
  }
};

//Get a dish - GET
module.exports.commentsReadOne = function(req, res) {
  if (req.params && req.params.dishid && req.params.commentid) {
    Dish
      .findById(req.params.dishid)
      .select('name comments')
      .exec(function(err, dish) {
        var response, comment;
        if (!dish) {
          sendJsonResponse(res, 404, {
            "message" : "dishid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(dish.comments && dish.comments.length > 0) {
          comment = dish.comments.id(req.params.commentid);
          if (!comment) {
            sendJsonResponse(res, 404, {
              "message" : "commentid not found"
            });
          } else {
            response = {
              dish : {
                name : dish.name,
                id : req.params.dishid
              },
              comment : comment
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {
            "message" : "No comments found"
          });
        }
      });
    } else {
      sendJsonResponse(res, 404, {
        "message" : "Not found, dishid and commentid are both required"
      });
    }
  };

//Update a dish - UPDATE
module.exports.commentsUpdateOne = function (res, req) {
  if (!req.params.dishid || !req.params.commentid) {
    sendJsonResponse(res, 404, {
      "message" : "Not found, dishid and commentid are required"
    });
    return;
  }
  Dish
    .findById(req.params.dishid)
    .select('comments')
    .exec(
      function(err, dish) {
        var thisComment;
        if(!dish) {
          sendJsonResponse(res, 404, {
            "message" : "dishid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (dish.comments && dish.comments.length > 0) {
          thisComment = dish.comments.id(req.params.commentid);
          if (!thisComment) {
            sendJsonResponse(res, 404, {
              "message" : "commentid not found"
            });
          } else {
            thisComment.author = req.body.author;
            thisComment.commentText = req.body.commentText;
            dish.save(function (err, dish) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, thisComment);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message" : "No comment to update"
          });
        }
      }
    );
};

//Delete a dish - DELETE
module.exports.commentsDeleteOne = function (req, res) {
  if (!req.params.dishid || !req.params.commentid) {
    sendJsonResponse(res, 404, {
      "message" : "Not found, dishid and commentid are both required"
    });
    return;
  }
  Dish
    .findById(req.params.dishid)
    .select('comments')
    .exec(
      function (err, dish) {
        if (!dish) {
          sendJsonResponse(res, 404, {
            "message" : "dishid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (dish.comments && dish.comments.length > 0) {
          if (!dish.comments.id(req.params.commentid)) {
            sendJsonResponse(res, 404, {
              "message" : "commentid not found"
            });
          } else {
            dish.comments.id(req.params.commentid).remove();
            dish.save(function (err) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message" : "No comment to delete"
          });
        }
      }
    );
};
