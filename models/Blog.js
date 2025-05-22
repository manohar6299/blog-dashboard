const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Blog', BlogSchema);
