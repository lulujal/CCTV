require('dotenv').config();
process.env.NODE_ENV = 'development';
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routers/index');

// Konfigurasi CORS
const corsOptions = {
    origin: '*', // Atau ['http://localhost:2443']
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization']
  };
// Tambahkan middleware CORS
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use('/dist', express.static('dist'));


app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views/pages');

app.use(router);

module.exports = app;