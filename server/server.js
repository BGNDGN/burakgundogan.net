const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./config/mongodbConnect');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

connectDB();

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`server.js çalıştı! Server ${PORT} portunda çalışıyor` );
});