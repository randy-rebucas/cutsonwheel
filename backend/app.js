var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');

var app = express();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE, // Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  autoIndex: false, // Don't build indexes
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: null // Use IPv4, skip trying IPv6
};

mongoose.connect(
      'mongodb+srv://randyr:' +
      process.env.MONGO_ATLAS_PW +
      '@main-1htay.mongodb.net/cutsonwheel?retryWrites=true&w=majority',
      options
  )
  .then((connecting) => {
      console.log('connecting...');
  })
  .then((connected) => {
      console.log('connected!');
  })
  .catch((error) => {
      console.log(error);
  });

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

var store = new MongoDBStore({
  uri: 'mongodb+srv://randyr:' +
  process.env.MONGO_ATLAS_PW +
  '@main-1htay.mongodb.net/cutsonwheel?retryWrites=true&w=majority',
  collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'This is secret',
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    expires: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store, // connect-mongo session store
  resave: true,
  saveUninitialized: true
}));
// remove default powered by on header
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

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

module.exports = app;
