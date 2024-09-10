require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const path = require('path');

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}))
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch(err => console.log(err));


app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});






