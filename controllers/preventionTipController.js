var PreventionTip = require('../models/prevention_tip');
var async = require('async');


exports.prevention_tip_list = function(req, res) {
  PreventionTip.find()
  .sort([['recommendation', 'ascending']])
  .exec(function(err, list_tips) {
    if (err) {return next(err);}
    res.render('prevention_tip_list', {title: 'Tips for Prevention', prevention_tip_list: list_tips})
  });
};

exports.prevention_tip_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: prevention_tip detail GET');
};

exports.prevention_tip_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: prevention_tip create GET');
};


exports.prevention_tip_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: prevention_tip create POST');
};

exports.prevention_tip_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: prevention_tip delete GET');
};


exports.prevention_tip_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: prevention_tip delete POST');
};


exports.prevention_tip_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: prevention_tip update GET');
};


exports.prevention_tip_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: prevention_tip update POST');
};