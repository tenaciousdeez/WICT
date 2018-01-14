var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  author: {type: String, required: true},
  createdOn: {type: Date, default: Date.now, required: true},
  commentText: {type: String, required: true}
});

/* Not sure if needed
var imageCommentSchema = new mongoose.Schema({
  author: {type: String, required: true},
  createdOn: {type: Date, default: Date.now, required: true},
  commentText: {type: String, required: true}
});
*/

var imageSchema = new mongoose.Schema({
  img: {type: String, contentType: String, require: true},
  title: {type: String, required: true},
  cook: {type: String, required: true},
  caption: {type: String, required: true},
  //comments: [commentSchema]
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
  comments: [commentSchema],
  createdOn: {type: Date, "default": Date.now}
});

mongoose.model('Dish', dishSchema);
