import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email')
      .populate('orderItems.product');

    res.json({
      totalOrders,
      totalRevenue,
      totalUsers,
      totalProducts,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
