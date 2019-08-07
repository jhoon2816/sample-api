const express = require('express');
const path = require('path');
const static = require('serve-static');
const bodyParser = require('body-parser');

const logger = require('morgan');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const pageRouter = require('./routes/page');
const { sequelize } =  require('./models');

const app = express();
sequelize.sync();

app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  secret: process.env.COOKIE_SECRET,
  resave:true,
  saveUninitialized:true
}));

app.use(flash());
app.use('/',pageRouter);

// cors 다중접속
app.use((req, res, next) => { //1
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});


app.listen(app.get('port'), ()=>{
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});
















