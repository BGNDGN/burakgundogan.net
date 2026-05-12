const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/mongodbConnect');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DB =================
connectDB();

// ================= TEST =================
app.get('/test', (req, res) => {
  res.json({ ok: true });
});

// ================= API =================
app.use('/api', authRoutes);

// ================= SERVER START =================
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});