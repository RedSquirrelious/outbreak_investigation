var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PreventionTipSchema = Schema(
{
  recommendation: {type: String, required: true}
});

PreventionTipSchema
.virtual('url')
.get(function() {
  return '/casebook/prevention_tip/' + this._id;
});

module.exports = mongoose.model('PreventionTip', PreventionTipSchema);