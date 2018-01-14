var mongoose = require('mongoose');
var Dish = mongoose.model('Dish');

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

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//Add a dish - CREATE
module.exports.dishesCreate = function(req, res) {
  Dish.create({
    name: req.body.name,
    address: req.body.address,
    zip: req.body.zip,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    categories: req.body.categories.split(","),
    instructions: req.body.instructions,
    images: [{
      img: req.body.img,
      title: req.body.title,
      caption: req.body.caption
    }]
  }, function(err, dish) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, dish);
    }
  });
};

//Get dishes by distance - GET
module.exports.dishesListByDistance = function (req, res) {
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
  if ((!lng && lng!==0) || (!lat && lat!==0)) {
    sendJsonResponse(res, 404, {
      "message" : "lng and lat query parametters are required"
    });
    return;
  }
  Dish.geoNear(point, geoOptions, function(err, results, stats) {
    var dishes = [];
    if(err) {
      sendJsonResponse(res, 404, err);
    } else {
      results.forEach(function(doc) {
        dishes.push({
          distance: theEarth.getDistanceFromRads(doc.dis),
          name: doc.obj.name,
          address: doc.obj.address,
          zip: doc.obj.zip,
          likes: doc.obj.likes,
          categories: doc.obj.categories,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, dishes);
    }
  });
};

//Get a dish - GET
module.exports.dishesReadOne = function(req, res) {
  if (req.params && req.params.dishid) {
    Dish
      .findById(req.params.dishid)
      .exec(function(err, dish) {
        if (!dish) {
          sendJsonResponse(res, 404, {
            "message" : "dishid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, dish);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message" : "No dishid in request"
    });
  }
};

//Update a dish - PUT
module.exports.dishesUpdateOne = function(req, res) {
  if (!req.params.dishid) {
    sendJsonResponse(res, 400, {
      "message" : "Not found, dishid is required"
    });
    return;
  }
  Dish
    .findById(req.params.dishid)
    .select('-reviews -likes')
    .exec(
      function(err, dish) {
        if (!dish) {
          sendJsonResponse(res, 404, {
            "message" : "dishid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        dish.name = req.body.name;
        dish.address = req.body.address;
        dish.zip = req.body.zip;
        dish.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        dish.categories = req.body.categories.split(",");
        dish.instructions = req.body.instructions;
        dish.save(function(err, dish) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, dish);
          }
        });
      }
    );
};

//Delete a dish - DELETE
module.exports.dishesDeleteOne = function(req, res) {
  var dishid = req.params.dishid;
  if (dishid) {
    Dish
      .findByIdAndRemove(dishid)
      .exec(
        function (err, dish) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message" : "No dishid"
    });
  }
};
