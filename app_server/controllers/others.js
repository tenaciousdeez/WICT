//Get About page
module.exports.about = function(req,res,next) {
  res.render('generic-text', {
    title: 'About WICT',
    content:"WICT lets you share pictures and recipes of the things you cook at home with others around the world. It also lets you see what other people in other places (or around you) are cooking.\n\nTEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT TEEEEXT"
  });
};
