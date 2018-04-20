const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const routes = require('./routes/users');
const postsroutes = require('./routes/posts');
const eventsRoutes = require('./routes/events');
const todoRoutes = require('./routes/todo_routes');
const authUserRoute = require('./routes/authUserRoute');
var cors = require('cors')
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mongodbURL = require('./config/database.config') 

const app = express();
var mongoURI = mongodbURL.mongodbURL;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);
// mongoose.connect('mongodb://localhost/users');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// 
// Init gfs
let gfs;

db.once('open', () => {
    console.log('mongoose.mongo')
  // Init stream
   gfs = Grid(db, mongoose.mongo);
   gfs.collection('uploads');
});
// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });
  
/////middlewares////
// cors middleware
app.use(cors())

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
})); 
app.use(methodOverride( '_method'));
app.use(passport.initialize());
// route handler middleware
app.use('/api', [routes, postsroutes, todoRoutes, eventsRoutes, authUserRoute ]);
// error handling middleware
app.use(function (err, req, res, next) {
    console.log('inside error handler middle ware')
    if (err) {
        console.log(err)
        console.log('inside error handler middle ware')
        res.send(err.message);
    }
    next();
})
app.get('/', function (req, res) {
    res.send('Go to /api to connect to the restAPI');
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/uploads', upload.single('file'), (req, res) => {
    console.log(req.file)
     res.json({ file: req.file });
    //res.redirect('/');
  });

app.listen(process.env.PORT || 8080, function () {
    console.log('server started...');
});
