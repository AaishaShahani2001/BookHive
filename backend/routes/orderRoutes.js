// routes/orderRoutes.js
import express from 'express';
import Order from '../models/order.js';
import user from '../models/user.js';
import Book from '../models/book.js';
import authenticateToken from '../auth/userAuth.js';

const orderRouter = express.Router();

// ➤ PLACE ORDER (user)
orderRouter.post('/place-order', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId || req.headers.id; // fallback for old code
    const { order } = req.body; // array of books

    if (!userId) {
      return res.status(400).json({ message: 'User ID missing' });
    }

    if (!order || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({ message: 'Order data is invalid' });
    }

    for (const orderData of order) {
      const newOrder = new Order({ user: userId, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      // save order reference in user model
      await user.findByIdAndUpdate(userId, {
        $push: { orders: orderDataFromDb._id },
      });

      // clear this book from cart
      await user.findByIdAndUpdate(userId, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: 'Success',
      message: 'Order Placed Successfully',
    });
  } catch (error) {
    console.error('PLACE ORDER ERROR:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// ➤ GET ORDER HISTORY OF PARTICULAR USER
orderRouter.get('/get-order-history', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId || req.headers.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID missing' });
    }

    const userData = await user
      .findById(userId)
      .populate({
        path: 'orders',
        populate: { path: 'book' },
      })
      .lean();

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const ordersData = [...userData.orders].reverse();

    return res.json({
      status: 'Success',
      data: ordersData,
    });
  } catch (error) {
    console.error('GET ORDER HISTORY ERROR:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// ➤ GET ALL ORDERS (Admin page uses this)
orderRouter.get('/get-all-orders', authenticateToken, async (req, res) => {
  try {
    // If later you add roles: if (req.user.role !== 'admin') { return res.status(403)... }

    const orders = await Order.find()
      .populate({ path: 'book' })
      .populate({ path: 'user' })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      status: 'Success',
      data: orders,
    });
  } catch (error) {
    console.error('GET ALL ORDERS ERROR:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// ➤ UPDATE ORDER STATUS (Admin)
orderRouter.put('/update-status/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({
      status: 'Success',
      message: 'Status Updated Successfully',
      data: updated,
    });
  } catch (error) {
    console.error('UPDATE STATUS ERROR:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

export default orderRouter;
