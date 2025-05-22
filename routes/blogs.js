const express = require('express');
const Blog = require('../models/Blog');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const image = req.file?.filename;
    const blog = new Blog({ title, image, description, userId });
    await blog.save();
    res.status(201).send('Blog created');
  } catch (err) {
    res.status(500).send('Error creating blog');
  }
});

router.get('/list/:userId', async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.params.userId });
    res.json(blogs);
  } catch (err) {
    res.status(500).send('Error fetching blogs');
  }
});

router.put('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;
    await Blog.findByIdAndUpdate(req.params.id, { title, description, ...(image && { image }) });
    res.send('Blog updated');
  } catch (err) {
    res.status(500).send('Error updating blog');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send('Blog deleted parmanently ');
  } catch (err) {
    res.status(500).send('Error deleting blog please check ....');
  }
});

router.get('/view/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).send('Error fetching blog check try ');
  }
});
module.exports = router;
