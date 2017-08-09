var Germ = require('../models/germ');
var PreventionTip = require('../models/prevention_tip');
var HomeCareTip = require('../models/home_care_tip');
var Symptom = require('../models/symptom');
var async = require('async');


exports.germ_list = function(req, res) {
  Germ.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_germs) {
      if (err)
        {return next(err);}
      res.render('germ_list', {title: 'Germ List', germ_list: list_germs})
    }); 
};

exports.germ_detail = function(req, res) {
  async.parallel({
    germ: function(callback) {
      Germ.findById(req.params.id)
      .populate('symptoms')
      .populate('care')
      .populate('prevention')
      .exec(callback);
    }
  },
    function(err, results) {
      if (err) {return next(err);}
      res.render('germ_detail', {title: 'Germ Detail', germ: results.germ});
  });
};

exports.germ_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: germ create GET');
};


exports.germ_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: germ create POST');
};

exports.germ_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: germ delete GET');
};


exports.germ_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: germ delete POST');
};


exports.germ_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: germ update GET');
};


exports.germ_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: germ update POST');
};