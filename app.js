var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
require("dotenv").config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// async function processOnM2(){
//   const originalCopy = [1,2];
//   const currentData = await redisClient.GET('jsonData'); // [1,2,3]
//   const processedData = [1];
//   let currentDataArray = JSON.parse(currentData);
//   // code logic
//   await redisClient.SET('Flag',0); // set flag unavailable to stop updates
//   currentDataArray = currentDataArray.filter((element)=> 
//     processedData.includes(element) || !originalCopy.includes(element)); // if element is not in m2 and original copy has it then its removed 
//   await redisClient.SET('jsonData',JSON.stringify(currentDataArray));
//   await redisClient.SET('Flag',1); // set flag available 

// }
//  function processOnM1(){
//   return new Promise(async (resolve,reject)=>{
//     const checkAvailability = setInterval(async ()=>{
//       const available = await redisClient.GET('Flag');
      
//       if(available){
//         clearInterval(checkAvailability); // stop checking if available.
//         const currentData = await redisClient.GET('jsonData');
//         await redisClient.SET('jsonData',JSON.stringify(JSON.parse(currentData ?? '').push(4)));
//         resolve();
//       }

//     },100);
//   })
// }
module.exports = app;
