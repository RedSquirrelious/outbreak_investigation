var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var HomeCareTipSchema = Schema({
  recommendation: {type: String, required: true},
});

HomeCareTipSchema
.virtual('url')
.get(function() {
  return '/casebook/home_care_tip/' + this._id;
});


module.exports = mongoose.model('HomeCareTip', HomeCareTipSchema);