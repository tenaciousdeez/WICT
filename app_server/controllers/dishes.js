var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://wict.herokuapp.com";
}

//Helper Functions
var _isNumeric = function (n) {
  return !isNaN(parseFloat(n) && isFinite(n));
};

var _formatDistance = function(distance) {
  var numDistance, unit;
  if (distance && _isNumeric(distance)) {
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'km';
    } else {
      numDistance = parseInt(distance * 1000,10);
      unit = 'm';
    }
    return numDistance + unit;
  } else {
    return "?";
  }
};

var _showError = function(req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "I checked the whole spice rack but I couldn't find it. I SWEAR!";
  } else if (status === 500) {
    title = "500, we got the ingredients wrong";
    content = "I thought it said baking soda... I THOUGHT IT SAID BAKING SODA!";
  } else {
    title = status + ", unexpected suboptimal outcome";
    content = "Maybe we shouldn't have made Fried Pickle and Garlic Ice Cream.  Who knows?";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var getDishInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/dishes/" + req.params.dishid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        data.coords = {
          lat : body.coords[0],
          lng : body.coords[1]
        };
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

//Get Home page
var renderHomepage = function(req, res, responseBody){
  res.render('dishes-list', {
    title: "See what's cooking around you and show others what you've cooked!",
    pageHeader: {
      title: 'Dishes Near You',
      strapline: 'See what home cooks around you are making!'
    },
    sidebar: "WICT lets you share images of what you cooked with those around you, as well as see what others are cooking."
  });
};

module.exports.homeDishList = function(req, res, next){
  renderHomepage(req, res);
};

//Get Dish Info page
var renderDetailPage = function(req, res, dishDetail) {
  res.render('dish-info', {
    title: dishDetail.name,
    pageHeader: {title: dishDetail.name},
    sidebar: {
      context:'-user- cooked -dish title- on -date of submission-.',
      callToAction: 'Want to share your thoughts on -author name-s -dish name-? Leave a comment!'
    },
    dish: dishDetail
  });
};

module.exports.dishInfo = function(req, res, next){
  getDishInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

//Get Add Comment page

var renderCommentForm = function (req, res, dishDetail) {
  res.render('dish-comment-form', {
    title: 'Add Comment for ' + dishDetail.name,
    pageHeader: { title: 'Comment on ' + dishDetail.cook + '\'s ' + dishDetail.name },
    sidebar: {
      context: dishDetail.cook + ' cooked ' + dishDetail.name + ' on ' + dishDetail.createdOn,
      callToAction: 'Want to share your thoughts on ' + dishDetail.cook + '\'s ' + dishDetail.name + '? Leave a comment!'
    },
    dish: dishDetail,
    error: req.query.err,
    url: req.originalUrl
  });
};

module.exports.addComment = function(req, res, next){
  getDishInfo(req, res, function(req, res, responseData) {
    renderCommentForm(req, res, responseData);
  });
};

module.exports.doAddComment = function(req, res) {
  var requestOptions, path, dishid, postdata;
  dishid = req.params.dishid;
  path = "/api/dishes/" + dishid + "/comments";
  postdata = {
    author: "USER WHO POSTED",
    commentText: req.body.comment
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.commentText) {
    res.redirect('/dish/' + dishid + '/comments/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/dish/' + dishid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
          res.redirect('/dish/' + dishid + '/comments/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};
