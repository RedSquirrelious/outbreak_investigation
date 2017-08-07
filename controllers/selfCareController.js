var SelfCare = require('../models/self_care');
var async = require('async');


exports.self_care_list = function(req, res) {
  SelfCare.find()
  .sort([['recommendation', 'ascending']])
  .exec(function(err, list_recs) {
    if (err) {return next(err);}
    res.render('recommendation_list', {title: 'Home Care Recommendations', recommendation_list: list_recs})
  });
};

exports.self_care_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: self_care detail GET');
};

exports.self_care_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: self_care create GET');
};


exports.self_care_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: self_care create POST');
};

exports.self_care_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: self_care delete GET');
};


exports.self_care_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: self_care delete POST');
};


exports.self_care_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: self_care update GET');
};


exports.self_care_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: self_care update POST');
};