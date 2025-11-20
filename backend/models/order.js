// models/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: 'books',
      required: true,
    },
    status: {
      type: String,
      default: 'Order Placed',
      enum: ['Order Placed', 'Out for Delivery', 'Delivered', 'Canceled'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('order', orderSchema);
