const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/mongodbConnect');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/test', (req, res) => {
  res.json({ ok: true });
});

app.get('/debug', (req, res) => {
  res.json({ message: "backend alive" });
});

app.use('/api', authRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});