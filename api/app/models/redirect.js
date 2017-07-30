const mongoose = require('mongoose');

const RedirectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    dropDups: true
  },
  url: {
    type: String,
    required: true
  },
});
// ,{
//   timestamps: true
// });

module.exports = mongoose.model('Redirect', RedirectSchema);
