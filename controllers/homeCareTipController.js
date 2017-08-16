var HomeCareTip = require('../models/home_care_tip');
var async = require('async');


exports.home_care_tip_list = function(req, res) {
  HomeCareTip.find()
  .sort([['recommendation', 'ascending']])
  .exec(function(err, list_recs) {
    if (err) {return next(err);}
    res.render('home_care_tip_list', {title: 'Home Care Tips', home_care_tip_list: list_recs})
  });
};

exports.home_care_tip_detail = function(req, res) {
  async.parallel({
    recommendation: function(callback) {
      HomeCareTip.findById(req.params.id)
      .exec(callback);
    }
  },
  function(err, results) {
    if (err) {return next(err);}
    res.render('home_care_tip_detail', {title: 'Home Care Tips', recommendation: results.recommendation});
  });
};

exports.home_care_tip_create_get = function(req, res) {
    res.render('home_care_tip_form', {title: 'Add Home Care Tips'});
};


exports.home_care_tip_create_post = function(req, res) {
  req.checkBody('recommendation', 'Tip description required').notEmpty();

  req.sanitize('recommendation').escape();
  req.sanitize('recommendation').trim();

  var errors = req.validationErrors();

  var tip = new HomeCareTip(
  {
    recommendation: req.body.recommendation
  });

  if (errors) {
    res.render('home_care_tip_form', {title: 'Add Home Care Tip', tip: tip, errors: errors});
    return;
  }
  else {
    HomeCareTip.findOne({'recommendation': req.body.recommendation})
      .exec(function(err, found_tip) {
        console.log('found tip: ' + found_tip);
        if (err) {return next(err);}
        if (found_tip) {
          res.redirect(found_tip.url);
        }
        else {
          tip.save(function(err) {
            if (err) {return next(err);}
            res.redirect(tip.url);
          });
        }
      });
  }
};

exports.home_care_tip_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: home_care_tip delete GET');
};


exports.home_care_tip_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: home_care_tip delete POST');
};


exports.home_care_tip_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: home_care_tip update GET');
};


exports.home_care_tip_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: home_care_tip update POST');
};