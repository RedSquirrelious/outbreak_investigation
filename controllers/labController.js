var Lab = require('../models/lab');
var async = require('async');


exports.lab_list = function(req, res) {
  Lab.find()
    .sort([['name', 'ascending']])
    .exec(function(err, list_labs) {
      if (err) 
      {
        return next(err);
      }
      res.render('lab_list', {title: 'Lab List', lab_list: list_labs})
    });
};

exports.lab_detail = function(req, res) {
  async.parallel({
    lab: function(callback) {
      Lab.findById(req.params.id)
      .exec(callback);
    }
  },

  function(err, results) {
    if (err) {return next(err);}
    res.render('lab_detail', {title: 'Lab Detail', lab: results.lab});
  });
};

exports.lab_create_get = function(req, res) {
    res.render('lab_form', {title: 'Add Lab'});
};


exports.lab_create_post = function(req, res) {
  req.checkBody('name', 'Lab name is required').notEmpty();
  req.checkBody('street', 'Lab street address is required').notEmpty();
  req.checkBody('city', 'Lab city is required').notEmpty();
  req.checkBody('state', 'Lab state is required').notEmpty();
  req.checkBody('zip', 'Lab zip is required').notEmpty();
  req.checkBody('work_phone', 'Lab work phone number is required').notEmpty();

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

exports.lab_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: lab delete GET');
};


exports.lab_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: lab delete POST');
};


exports.lab_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: lab update GET');
};


exports.lab_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: lab update POST');
};