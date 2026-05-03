require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB холбогдлоо ✅'))
  .catch((err) => console.error('Алдаа гарлаа ❌:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Task Tracker API ажиллаж байна.');
});

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Сервер ${PORT} порт дээр ажиллаж байна.`);
    });
}

module.exports = app;



const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet()); // Header аюулгүй байдал

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // Нэг IP-аас дээд тал нь 100 хүсэлт
});
app.use('/api/', limiter);



