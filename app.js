require('dotenv').config();
process.env.NODE_ENV = 'production';
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const router = require('./routers/index');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', 'views/pages');

app.use(router);

app.listen(2443, () => {
    console.log(`App is running at 2443 / in ${app.get('env')} mode`);
  });