const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const User = require('../models/userSchema');

// AUTH
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// ME
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User bulunamadı' });
    }

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CHANGE PASSWORD
router.put('/change-password', authMiddleware, async (req, res) => {
  const bcrypt = require('bcryptjs');

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Tüm alanlar zorunlu" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User bulunamadı" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Eski şifre yanlış" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Şifre başarıyla değiştirildi" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;