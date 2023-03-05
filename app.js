const express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport')
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var methods = require('methods');

const app = express();
const PORT = 3000; 
const MONGO_URI = '127.0.0.1:27017'
const DATABASE = 'social_recovery'


require('./models/User');
require('./models/Guard');
require('./models/Identity');
require('./models/Transaction')
require('./config/passport');




var isProduction = process.env.NODE_ENV || 'prod';
if(isProduction){
    mongoose.connect(`mongodb://${MONGO_URI}/${DATABASE}`);
} else {
    mongoose.connect(`mongodb://${MONGO_URI}/${DATABASE}`);
    console.log("Connection success")
    mongoose.set('debug', true);
}


app.use(express.static(__dirname + '/public'));


app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(methodOverride());
app.use(require('./routes'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

app.get('/', (req, res)=>{
     res.status(200);
     res.send("Welcome to root URL of Server");
 });

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  

app.listen(process.env.PORT || PORT, (error) =>{
     if(!error)
         console.log("Server is Successfully Running, and App is listening on port "+ PORT)
     else 
         console.log("Error occurred, server can't start", error);
     }
 );