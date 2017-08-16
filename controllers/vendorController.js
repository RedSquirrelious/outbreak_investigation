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
    res.render('vendor_form', {title: 'Add Vendor'});
};


exports.vendor_create_post = function(req, res, next) {
    req.checkBody('name', 'Vendor name is required').notEmpty();
    req.checkBody('vendor_type', 'Vendor type is required').notEmpty();
    req.checkBody('street_address', 'Vendor street address is required').notEmpty();
    req.checkBody('city', 'Vendor city is required').notEmpty();
    req.checkBody('state', 'Vendor state is required').notEmpty();
    req.checkBody('zip', 'Vendor zip is required').notEmpty();
    req.checkBody('poc_first_name', "Vendor point of contact's first name is required").notEmpty();
    req.checkBody('poc_family_name', "Vendor point of contact's family_name is required").notEmpty();
    req.checkBody('work_phone', 'Vendor work phone is required').notEmpty();

    req.sanitize('name').escape();
    req.sanitize('name').trim();

    req.sanitize('vendor_type').escape();
    req.sanitize('vendor_type').trim();
    
    req.sanitize('street_address').escape();
    req.sanitize('street_address').trim();
    
    req.sanitize('city').escape();
    req.sanitize('city').trim();

    req.sanitize('state').escape();
    req.sanitize('state').trim();
    
    req.sanitize('zip').escape();
    req.sanitize('zip').trim();

    req.sanitize('poc_first_name').escape();
    req.sanitize('poc_first_name').trim();

    req.sanitize('poc_family_name').escape();
    req.sanitize('poc_family_name').trim();

    req.sanitize('work_phone').escape();
    req.sanitize('work_phone').trim();

    req.sanitize('cell_phone').escape();
    req.sanitize('cell_phone').trim();

    req.sanitize('email').escape();
    req.sanitize('email').trim();

    var errors = req.validationErrors();

    var vendor = new Vendor({
      name: req.body.name,
      vendor_type: req.body.vendor_type,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      poc_first_name: req.body.poc_first_name,
      poc_family_name: req.body.poc_family_name,
      work_phone: req.body.work_phone,
      cell_phone: req.body.cell_phone,
      email: req.body.email
    });

  if (errors) {
    res.render('vendor_form', {title: 'Add Vendor', vendor: vendor, errors: errors});
    return;
  }
  else {
    Vendor.findOne({'name': req.body.name})
    .exec(function(err, found_vendor) {
      console.log('found_vendor: ' + found_vendor);
      if (err) {return next(err);}
      if (found_vendor) {
        res.redirect(found_vendor.url);
      }
      else {
        vendor.save(function(err) {
          if (err) {return next(err);}
          res.redirect(vendor.url);
        }); 
      }
    });
  }
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