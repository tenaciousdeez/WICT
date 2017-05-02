//Get Home page
module.exports.homeDishList = function(req, res, next){
  res.render('dishes-list', {
    title: "See what's cooking around you and show others what you've cooked!",
    pageHeader: {
      title: 'Dishes Near You',
      strapline: 'See what home cooks around you are making!'
    },
    sidebar: "WICT lets you share images of what you cooked with those around you, as well as see what others are cooking.",
    dishes: [{
      name: 'Stir-fry Burrito Cake',
      address: '-City, State-',
      zip: '-zip code-',
      categories: ['-category-', '-category-', '-category-'],
      likes: '-like count-',
      distance: '-distance to zip-',
      coords: {lat: 38.924530, lng: -77.003058},
      images: [{
        source: '',
        title: '',
        caption: ''
      }],
      comments: [{
        author: 'Doug Dimmadome',
        timestamp: '30 February 1844',
        commentText: 'WOW! ALMOST AS GOOD AS MY DIMMSDALE DIMMADOME'
      },{
        author: 'Courage the Cowardly Dog',
        timestamp: '12pm after the apocalypse',
        commentText: 'AHHHHHHHHHHHHHHHH! OH GOD, OH GOD, OH GOD. AAGHGHGHGH!'
      }]
    },{
      name: 'Super Soggy Salad Sponge',
      address: '-City, State-',
      zip: '-zip code-',
      categories: ['-category-', '-category-', '-category-'],
      likes: '-like count-',
      distance: '-distance to zip-',
      coords: {lat: 38.924530, lng: -77.003058},
      images: [{
        source: '',
        title: '',
        caption: ''
      }],
      comments: [{
        author: 'Doug Dimmadome',
        timestamp: '30 February 1844',
        commentText: 'WOW! ALMOST AS GOOD AS MY DIMMSDALE DIMMADOME'
      },{
        author: 'Courage the Cowardly Dog',
        timestamp: '12pm after the apocalypse',
        commentText: 'AHHHHHHHHHHHHHHHH! OH GOD, OH GOD, OH GOD. AAGHGHGHGH!'
      }]
    },{
      name: 'Cajun Crab Cheese Dip',
      address: '-City, State-',
      zip: '-zip code-',
      categories: ['-category-', '-category-', '-category-'],
      likes: '-like count-',
      distance: '-distance to zip-',
      coords: {lat: 38.924530, lng: -77.003058},
      images: [{
        source: '',
        title: '',
        caption: ''
      }],
      comments: [{
        author: 'Doug Dimmadome',
        timestamp: '30 February 1844',
        commentText: 'WOW! ALMOST AS GOOD AS MY DIMMSDALE DIMMADOME'
      },{
        author: 'Courage the Cowardly Dog',
        timestamp: '12pm after the apocalypse',
        commentText: 'AHHHHHHHHHHHHHHHH! OH GOD, OH GOD, OH GOD. AAGHGHGHGH!'
      }]
    }]
  });
};

//Get Dish Info page
module.exports.dishInfo = function(req, res, next){
  res.render('dish-info', {
    title: 'Szechuan McNuggets with the Szechuan McNugget Sauce',
    pageHeader: {title: 'Szechuan McNuggets with the Szechuan McNugget Sauce'},
    sidebar: {
      context:'-user- cooked -dish title- on -date of submission-.',
      callToAction: 'Want to share your thoughts on -author name-s -dish name-? Leave a comment!'
    },
    dish: {
      name: 'Szechuan McNuggets with the Szechuan McNugget Sauce',
      cook: 'Donkey Kong',
      dateCreated: '6 June 2006',
      address: '-City, State-',
      zip: '-zip code-',
      categories: ['-category1-', '-category2-', '-category3-'],
      ingredients: ['-ingredient1-', '-ingredient2-', '-ingredient3-'],
      instructions: ['-instruction1-', '-instruction2-', '-instruction3-'],
      likes: '-like count-',
      distance: '-distance to zip-',
      coords: {lat: 38.924530, lng: -77.003058},
      images: [{
        source: '',
        title: '',
        caption: ''
      }],
      comments: [{
        author: 'Doug Dimmadome',
        timestamp: '30 February 1844',
        commentText: 'WOW! ALMOST AS GOOD AS MY DIMMSDALE DIMMADOME'
      },{
        author: 'Courage the Cowardly Dog',
        timestamp: '12pm after the apocalypse',
        commentText: 'AHHHHHHHHHHHHHHHH! OH GOD, OH GOD, OH GOD. AAGHGHGHGH!'
      }]
    }
  });
};

//Get Add Comment page
module.exports.addComment = function(req, res, next){
  res.render('dish-comment-form', {
    title: 'Add Comment',
    pageHeader: {title: 'Comment on -cook name-s -dish name-'},
    sidebar: {
      context:'-user- cooked -dish title- on -date of submission-.',
      callToAction: 'Want to share your thoughts on -author name-s -dish name-? Leave a comment!'
    },
    dish: {
      name: 'Szechuan McNuggets with the Szechuan McNugget Sauce',
      cook: 'Donkey Kong',
      dateCreated: '6 June 2006',
      address: '-City, State-',
      zip: '-zip code-',
      categories: ['-category1-', '-category2-', '-category3-'],
      ingredients: ['-ingredient1-', '-ingredient2-', '-ingredient3-'],
      instructions: ['-instruction1-', '-instruction2-', '-instruction3-'],
      likes: '-like count-',
      distance: '-distance to zip-',
      coords: {lat: 38.924530, lng: -77.003058},
      images: [{
        source: '',
        title: '',
        caption: ''
      }],
      comments: [{
        author: 'Doug Dimmadome',
        timestamp: '30 February 1844',
        commentText: 'WOW! ALMOST AS GOOD AS MY DIMMSDALE DIMMADOME'
      },{
        author: 'Courage the Cowardly Dog',
        timestamp: '12pm after the apocalypse',
        commentText: 'AHHHHHHHHHHHHHHHH! OH GOD, OH GOD, OH GOD. AAGHGHGHGH!'
      }]
    }
  });
};
