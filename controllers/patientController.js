var Patient = require('../models/patient');
var async = require('async');


exports.patient_list = function(req, res) {
  Patient.find()
  .sort([['name', 'ascending']])
  .exec(function(err, list_patients) {
    if (err) 
      {return next(err);}
    res.render('patient_list', {title: 'Patient List', patient_list: list_patients})
  });
};

exports.patient_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: patient detail GET');
};

exports.patient_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: patient create GET');
};


exports.patient_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: patient create POST');
};

exports.patient_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: patient delete GET');
};


exports.patient_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: patient delete POST');
};


exports.patient_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: patient update GET');
};


exports.patient_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: patient update POST');
};