const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path=require('path');
const fs=require('fs');
const ejsLint=require('ejs-lint');
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
const voterroute=require("./routes/voter");
// const flash = require('connect-flash');
// const multer = require('multer');
// const helmet= require('helmet');
// const compression= require('compression');
// const morgan=require('morgan');
const app = express();
const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-1azzz.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;//change by '' replce  `` dep
  console.log(process.env.NODE_ENV);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
   // res.locals.csrfToken = req.csrfToken();
    next();
  });
 
app.use(bodyParser.urlencoded({ extended: false })); 

// app.get("/",(req,res,next)=>
// {
// res.render('home');
// });
app.use(voterroute);
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('connected!');
    app.listen(process.env.PORT || 3000);   
  })
  .catch(err => {
    console.log(err);
  });
