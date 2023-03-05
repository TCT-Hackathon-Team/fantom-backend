var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Identity = mongoose.model('Identity');
var auth = require('../auth');


module.exports = router;