const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// ================= MAIL =================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  logger: true,
  debug: true
});

// ================= TOKEN =================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tüm alanlar zorunlu" });
  }

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({ message: "Email zaten kayıtlı" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    const token = generateToken(user);

    return res.status(201).json({
      message: "Kayıt başarılı",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email ve şifre gerekli" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Hatalı giriş" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Hatalı giriş" });
    }

    const token = generateToken(user);

    return res.json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email gerekli" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı yok" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 1000 * 60 * 15;

    await user.save();

    const url = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const info = await transporter.sendMail({
      from: `"Burak App 🔐" <${process.env.EMAIL_USER}>`,
      to: user.email,
      replyTo: process.env.EMAIL_USER,
      subject: "Şifre Sıfırlama",
      html: `
        <h2>Şifre Sıfırlama</h2>
        <p>Linke tıklayarak şifreni sıfırlayabilirsin:</p>
        <a href="${url}">${url}</a>`
    });

    console.log("📩 MAIL SENT INFO:", info.messageId);

    console.log("📩 Mail gönderildi:", info.messageId);

    return res.json({ message: "Mail gönderildi" });

  } catch (err) {
    console.error("❌ FORGOT PASSWORD ERROR:", err);

    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: "Tüm alanlar gerekli" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Şifreler uyuşmuyor" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token geçersiz" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return res.json({ message: "Şifre güncellendi" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};