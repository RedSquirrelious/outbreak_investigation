var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var SelfCareSchema = Schema({
  recommendation: {type: String, required: true},
});

SelfCareSchema
.virtual('url')
.get(function() {
  return '/casebook/recommendation/' + this._id;
});


module.exports = mongoose.model('SelfCare', SelfCareSchema);