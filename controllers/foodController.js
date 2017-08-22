var Food = require('../models/food');
var async = require('async');


exports.food_list = function(req, res) {
  Food.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_foods) {
      if (err) 
        { return next(err);}
      res.render('food_list', {title: 'Food List', food_list: list_foods})
    })
};

exports.food_detail = function(req, res, next) {
  async.parallel({
    food: function(callback) {
      Food.findById(req.params.id)
      .exec(callback);
    }
  },
  function(err, results) {
    if (err) {return next(err);}
    res.render('food_detail', {title: 'Food Detail', food: results.food});
  });
};

exports.food_create_get = function(req, res) {
    res.render('food_form', { title: 'Create Food' });
};


exports.food_create_post = function(req, res, next) {
  req.checkBody('name', 'Food name required').notEmpty(); 
  req.checkBody('category', 'Food category required').notEmpty();
  req.checkBody('preparation', 'Food preparation required').notEmpty();
  req.sanitize('name').escape();
  req.sanitize('name').trim();
  req.sanitize('category').escape();
  req.sanitize('category').trim();
  req.sanitize('preparation').escape();
  req.sanitize('preparation').trim();

  var errors = req.validationErrors();

  var food = new Food(
    { name: req.body.name,
      category: req.body.category,
      preparation: req.body.preparation
    });
  if (errors) {
      res.render('food_form', { title: 'Create Food', food: food, errors: errors});
  return;
  } 
  else {
      Food.findOne({ 'name': req.body.name })
          .exec( function(err, found_food) {
               console.log('found_food: ' + found_food);
               if (err) { 
                return next(err); 
               }
               if (found_food) { 
                  res.redirect(found_food.url);
               }
               else {
                   console.log('in the else block');
                   food.save(function (err) {
                     if (err) { 
                      console.log(err);
                      console.log(food);
                      return next(err);
                    }
                     res.redirect(food.url);
                   });                 
               }               
           });
  }
};

exports.food_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: food delete GET');
};


exports.food_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: food delete POST');
};


exports.food_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: food update GET');
};


exports.food_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: food update POST');
};