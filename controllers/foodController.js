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

exports.food_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: food detail GET');
};

exports.food_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: food create GET');
};


exports.food_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: food create POST');
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