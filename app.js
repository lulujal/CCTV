require('dotenv').config();
process.env.NODE_ENV = 'development';
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routers/index');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use('/dist', express.static('dist'));
app.use(cors());

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views/pages');

app.use(router);

module.exports = app;