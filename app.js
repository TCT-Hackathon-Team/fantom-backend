const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

app.use(require('./routes'));


const app = express();
const PORT = 3000; 
const MONGO_URI = '127.0.0.1:27017'
const DATABASE = 'social_recovery'

var isProduction = process.env.NODE_ENV || 'prod';
if(isProduction){
    mongoose.connect(`mongodb://${MONGO_URI}/${DATABASE}`);
} else {
    mongoose.connect(`mongodb://${MONGO_URI}/${DATABASE}`);
    mongoose.set('debug', true);
}

app.get('/', (req, res)=>{
     res.status(200);
     res.send("Welcome to root URL of Server");
 });

app.listen(process.env.PORT || PORT, (error) =>{
     if(!error)
         console.log("Server is Successfully Running, and App is listening on port "+ PORT)
     else 
         console.log("Error occurred, server can't start", error);
     }
 );