var Case = require('../models/case');
var Food = require('../models/food');
var Germ = require('../models/germ');
var Lab = require('../models/lab');
var MedicalFacility = require('../models/medical_facility');
var Patient = require('../models/patient');
var Vendor = require('../models/vendor');

var async = require('async');

exports.index = function(req, res) {
  async.parallel({
    food_count: function(callback) {
      Food.count(callback);
    },
    germ_count: function(callback) {
      Germ.count(callback);
    },
    lab_count: function(callback) {
      Lab.count(callback);
    },
    medical_facility_count: function(callback) {
      MedicalFacility.count(callback);
    },
    patient_count: function(callback) {
      Patient.count(callback);
    },
    vendor_count: function(callback) {
      Vendor.count(callback);
    }, 
  },
    function(err, results) {
      res.render('index', {title: 'Foodborne Outbreak Investigations', error: err, data: results});
  });
};

exports.case_list = function(req, res) {
  res.send('NOT IMPLEMENTED: case list GET');
};

exports.case_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: case detail GET');
};

exports.case_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: case create GET');
};


exports.case_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: case create POST');
};

exports.case_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: case delete GET');
};


exports.case_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: case delete POST');
};


exports.case_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: case update GET');
};


exports.case_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: case update POST');
};