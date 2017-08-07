var Symptom = require('../models/symptom');
var async = require('async');


exports.symptom_list = function(req, res) {
  Symptom.find()
  .sort([['symptom', 'ascending']])
  .exec(function(err, list_symptoms) {
    if (err) {return next(err);}
    res.render('symptom_list', {title: 'Possible Symptoms', symptom_list: list_symptoms})
  });
};

exports.symptom_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: symptom detail GET');
};

exports.symptom_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: symptom create GET');
};


exports.symptom_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: symptom create POST');
};

exports.symptom_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: symptom delete GET');
};


exports.symptom_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: symptom delete POST');
};


exports.symptom_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: symptom update GET');
};


exports.symptom_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: symptom update POST');
};