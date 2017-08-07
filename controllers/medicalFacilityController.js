var MedicalFacility = require('../models/medical_facility');
var async = require('async');


exports.medical_facility_list = function(req, res) {
  MedicalFacility.find()
  .sort([['name', 'ascending']])
  .exec(function(err, list_facilities) {
    if (err)
    {
      return next(err);
    }
    res.render('medical_facility_list', {title: 'Facility List', medical_facility_list: list_facilities})
  });
};

exports.medical_facility_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: medical_facility detail GET');
};

exports.medical_facility_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: medical_facility create GET');
};


exports.medical_facility_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: medical_facility create POST');
};

exports.medical_facility_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: medical_facility delete GET');
};


exports.medical_facility_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: medical_facility delete POST');
};


exports.medical_facility_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: medical_facility update GET');
};


exports.medical_facility_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: medical_facility update POST');
};