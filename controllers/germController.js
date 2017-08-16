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
    req.checkBody('full_name', 'Full name required').notEmpty();

    req.sanitize('full_name').escape();
    req.sanitize('full_name').trim();

    req.sanitize('short_name').escape();
    req.sanitize('short_name').trim();

    req.sanitize('sources').escape();
    req.sanitize('sources').trim();

    req.sanitize('incubation_period').escape();
    req.sanitize('incubation_period').trim();

    req.sanitize('symptoms').escape();
    req.sanitize('symptoms').trim();

    req.sanitize('duration').escape();
    req.sanitize('duration').trim();

    req.sanitize('care').escape();
    req.sanitize('care').trim();

    req.sanitize('prevention').escape();
    req.sanitize('prevention').trim();

    var errors = req.validationErrors();

    var germ = new Germ(
    {
      full_name: req.body.full_name,
      short_name: req.body.short_name,
      sources: req.body.sources,
      incubation_period: req.body.incubation_period,
      symptoms: req.body.symptoms,
      duration: req.body.duration,
      care: req.body.care,
      prevention: req.body.prevention
    });

    if(errors)
    {
      res.render('germ_form', {title: 'Add Germ', germ: germ, errors: errors});
      return;
    }
    else {
      Germ.findOne({'full_name': req.body.full_name})
        .exec(function(err, found_germ) {
          console.log('found_germ: ' + found_germ);
          if (err) {return next(err);}
          if (found_germ) {
            res.redirect(found_germ.url);
          }
          else {
            germ.save(function(err) {
              if (err) {return next(err);}
              res.redirect(germ.url);
            });
          }
        });
    }
};


exports.germ_create_post = function(req, res) {
    
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