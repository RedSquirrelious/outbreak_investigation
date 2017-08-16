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
  async.parallel({
    symptom: function(callback) {
      Symptom.findById(req.params.id)
      .exec(callback);
    }
  },
  function(err, results) {
    if (err) {return next(err);}
    res.render('symptom_detail', {title: 'Symptom Detail', symptom: results.symptom});
  });
};

exports.symptom_create_get = function(req, res) {
    res.render('symptom_form', {title: 'Add Symptom'});
};


exports.symptom_create_post = function(req, res) {
  req.checkBody('symptom', 'Symptom required').notEmpty();
  req.sanitize('symptom').escape();
  req.sanitize('symptom').trim();

  var errors = req.validationErrors();

  var symptom = new Symptom(
  {
    symptom: req.body.symptom
  });

  if (errors) {
    res.render('symptom_form', {title: 'Add Symptom', symptom: symptom, errors: errors});
    return;
  }
  else {
    Symptom.findOne({'symptom': req.body.symptom})
    .exec(function (err, found_symptom) {
      console.log('found_symptom: ' + found_symptom);
      if (err) {return next(err);}
      if (found_symptom) {
        res.redirect(found_symptom.url);
      }
      else {
        symptom.save(function(err) {
          if (err) {return next(err);}
          res.redirect(symptom.url);
        });
      }
    });
  }
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