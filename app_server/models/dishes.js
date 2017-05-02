var mongoose = require('mongoose');

var dishCommentSchema = new mongoose.Schema({
  author: {type: String, required: true},
  timestamp: {type: Date, default: Date.now, required: true},
  commentText: {type: String, required: true}
});

var imageCommentSchema = new mongoose.Schema({
  author: {type: String, required: true},
  timestamp: {type: Date, default: Date.now, required: true},
  commentText: {type: String, required: true}
});

var imageSchema = new mongoose.Schema({
  source: {type: String, required: true},
  title: {type: String, required: true},
  cook: {type: String, required: true},
  address: {type: String, required: true},
  zip: {type: String, required: true},
  coords: {type: [Number], index: '2dsphere'},
  caption: {type: String, required: true},
  imageComments: [imageCommentSchema]
});

var dishSchema = new mongoose.Schema({
  name: {type: String, required: true},
  cook: {type: String, required: true},
  address: {type: String, required: true},
  zip: {type: String, required: true},
  coords: {type: [Number], index: '2dsphere'},
  categories: [String],
  instructions: String,
  likes: {type: Number, "default": 0, min: 0},
  distance: Number,
  images: [imageSchema],
  dishComments: [dishCommentSchema]
});

mongoose.model('Dish', dishSchema);
