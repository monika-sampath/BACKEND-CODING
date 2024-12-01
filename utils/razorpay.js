// utils/razorpay.js
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = (amount) => {
  return new Promise((resolve, reject) => {
    razorpay.orders.create(
      {
        amount: amount * 100, // Amount in paise
        currency: "INR",
        receipt: `order_${Date.now()}`,
      },
      (err, order) => {
        if (err) reject(err);
        resolve(order);
      }
    );
  });
};

module.exports = { createOrder };
