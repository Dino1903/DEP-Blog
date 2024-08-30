const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String }, // Add image field if needed
  createdAt: { type: Date, default: Date.now } // Default to the current date
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
