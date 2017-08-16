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
  async.parallel({
    facility: function(callback) {
      MedicalFacility.findById(req.params.id)
      .exec(callback);
    }
  },
  function(err, results) {
    if (err) {return next(err);}
    res.render('medical_facility_detail', {title: 'Facility Detail', facility: results.facility});
  })
};

exports.medical_facility_create_get = function(req, res) {
    res.render('medical_facility_form', {title: 'Add Medical Facility'});
};


exports.medical_facility_create_post = function(req, res) {
  req.checkBody('name', 'Facility name is required').notEmpty();
  req.checkBody('street', 'Facility street address is required').notEmpty();
  req.checkBody('city', 'Facility city is required').notEmpty();
  req.checkBody('state', 'Facility state is required').notEmpty();
  req.checkBody('zip', 'Facility zip is required').notEmpty();
  req.checkBody('work_phone', 'Facility work phone number is required').notEmpty();

  req.sanitize('name').escape();
  req.sanitize('name').trim();

  req.sanitize('street_address').escape();
  req.sanitize('street_address').trim();

  req.sanitize('city').escape();
  req.sanitize('city').trim();

  req.sanitize('state').escape();
  req.sanitize('state').trim();

  req.sanitize('zip').escape();
  req.sanitize('zip').trim();

  req.sanitize('work_phone').escape();
  req.sanitize('work_phone').trim();

  var errors = req.validateErrors();

  var lab = new Lab({
    name: req.body.name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    work_phone: req.body.work_phone
  });

  if (errors) {
    res.render('lab_form', {title: 'Add Lab', lab: lab, errors: errors});
    return;
  }
  else {
    Lab.findOne({'name': req.body.name})
    .exec(function(err, found_lab) {
      console.log('found_lab: ' + found_lab);
      if (err) {return next(err);}
      if (found_lab) {
        res.redirect(found_lab.url);
      }
      else {
        lab.save(function(err) {
          if (err) {return next(err);}
          res.redirect(lab.url);
        });
      }
    });
  }
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