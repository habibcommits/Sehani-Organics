import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
      const adminUser = await User.findOne({ email: 'admin@sehaniorganics.com' });
      
      if (!adminUser) {
        const newAdmin = await User.create({
          name: 'Admin',
          email: 'admin@sehaniorganics.com',
          password: 'admin',
          isAdmin: true
        });
        return res.json({
          _id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          isAdmin: newAdmin.isAdmin,
          token: generateToken(newAdmin._id)
        });
      }

      res.json({
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        isAdmin: adminUser.isAdmin,
        token: generateToken(adminUser._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
