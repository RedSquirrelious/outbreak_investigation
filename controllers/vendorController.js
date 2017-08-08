var Vendor = require('../models/vendor');
var async = require('async');


exports.vendor_list = function(req, res) {
  Vendor.find()
  .sort([['name', 'ascending']])
  .exec(function(err, list_vendors) {
    if (err) {return next(err);}
    res.render('vendor_list', {title: 'Vendor List', vendor_list: list_vendors})
  });
};

exports.vendor_detail = function(req, res) {
  async.parallel({
    vendor: function(callback) {
      Vendor.findById(req.params.id)
      .exec(callback);
    }
  },
  function(err, results) {
    if (err) {return next(err);}
    res.render('vendor_detail', {title: 'Vendor Detail', vendor: results.vendor});
  });
};

exports.vendor_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: vendor create GET');
};


exports.vendor_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: vendor create POST');
};

exports.vendor_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: vendor delete GET');
};


exports.vendor_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: vendor delete POST');
};


exports.vendor_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: vendor update GET');
};


exports.vendor_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: vendor update POST');
};