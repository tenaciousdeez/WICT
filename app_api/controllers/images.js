var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');

//For geoCalcing
var theEarth = (function () {
  var earthRadius = 3959;

  var getDistanceFromRads = function (rads) {
    return parseFloat(rads * earthRadius);
  };

  var getRadsFromDistance = function (distance) {
    return parseFloat(distance / earthRadius);
  };
  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();

//Error response builder
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Helper method for adding images
var doAddImage = function (req, res, dish) {
  if (!dish) {
    sendJsonResponse(res, 404, {
      "message" : "dishid not found"
    });
  } else {
  }
};

//Add an image - CREATE
module.exports.imagesCreate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.imagesListByDistance = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(40),
    num: 10
  };
  if (!lng || !lat) {
    sendJsonResponse(res, 404, {
      "message" : "lng and lat query parametters are required"
    });
    return;
  }
  Dish.geoNear(point, geoOptions, function(err, results, stats) {
    var images = [];
    if(err) {
      sendJsonResponse(res, 404, err);
    } else {
      results.forEach(function(doc) {
        images.push({
          distance: theEarth.getDistanceFromRads(doc.dis),
          name: doc.obj.name,
          address: doc.obj.address,
          zip: doc.obj.zip,
          likes: doc.obj.likes,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, images);
    }
  });
};

module.exports.imagesReadOne = function(req, res) {
  if (req.params && req.params.dishid && req.params.imageid) {
    Dish
      .findById(req.params.dishid)
      .exec(function(err, dish) {
        var response, image;
        if (!dish) {
          sendJsonResponse(res, 404, {
            "message" : "dishid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(dish.images && dish.images.length > 0) {
          image = dish.images.id(req.params.imageid);
          if (!image) {
            sendJsonResponse(res, 404, {
              "message" : "imageid not found"
            });
          } else {
            response = {
              dish : {
                name : dish.name,
                id : req.params.dishid
              },
              image : image
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {
            "message" : "No images found"
          });
        }
      });
    } else {
      sendJsonResponse(res, 404, {
        "message" : "Not found, dishid and imageid are both required"
      });
    }
  };
