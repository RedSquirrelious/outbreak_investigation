var Lab = require('../models/lab');
var async = require('async');


exports.lab_list = function(req, res) {
  Lab.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_labs) {
      if (err) 
      {
        return next(err);
      }
      res.render('lab_list', {title: 'Lab List', lab_list: list_labs})
    });
};

exports.lab_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: lab detail GET');
};

exports.lab_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: lab create GET');
};


exports.lab_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: lab create POST');
};

exports.lab_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: lab delete GET');
};


exports.lab_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: lab delete POST');
};


exports.lab_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: lab update GET');
};


exports.lab_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: lab update POST');
};