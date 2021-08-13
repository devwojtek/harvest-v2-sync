
/**
 * Module dependencies.
 */

require('dotenv').config();
const express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , passport = require('passport')
  , methodOverride = require('method-override')
  , session = require('express-session')
  , harvestStrategy = require('./config/harvest-strategy')
  , { axios } = require('./services');

passport.use(harvestStrategy);

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializeUser: ' + user)
  if (!user) { done(new Error('User not found! ' + user))}
  done(null, user)
});

var app = express();

// app.set('trust proxy', 1) // Enable for production
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
  // cookie: { secure: true }
}))

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// Register axios
app.use(function (req, res, next) {
  req.fetch = axios;
  req.fetch.defaults.headers.common['User-Agent'] = `${process.env.HARVEST_APP} (${process.env.HARVEST_EMAIL})`
  next();
});

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

// app.use("/jobs", require("./jobs/routes"));
app.use(routes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
