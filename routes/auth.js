const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../middleware/upload');
const User = require('../models/User');
const router = express.Router();

const SECRET = process.env.JWT_SECRET;

router.post('/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const { email, password } = req.body;
    const profileImage = req.file?.filename;
    if (!email || !password) return res.status(400).send('All fields required please try ');
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send('Email already registered In user ');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, profileImage });
    await user.save();
    res.status(201).send('User registered.....');
  } catch (err) {
    res.status(500).send('Server error##');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not .....');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid credentials....');
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).send('Server error?.....');
  }
});

router.get('/dashboard/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found?');
    res.json({ email: user.email, profileImage: user.profileImage });
  } catch (err) {
    res.status(500).send('Error fetching dashboard...........');
  }
});
module.exports = router;
