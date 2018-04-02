const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const GridFs = require('gridfs-stream');
var Posts = require('../models/posts');

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
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
//GET request to /
router.get('/', function (req, res) {
    res.send(`<h1>Congratulations......</h1>`)
});

//GET request to /posts
router.get('/posts', function (req, res) {
    Posts.find()
        .then(posts => {
            res.status(200).send(posts)
            next()
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

//POST request to /posts
router.post('/posts', function (req, res, next) {
    var posts = (req.body);
    Posts.create(posts)
        .then(post => {
            res.status(200).send(post)
        })
        .catch(next)

});

//PUT request to /posts/:id
router.put('/posts/:id', function (req, res, next) {
    Posts.findByIdAndUpdate({ "_id": req.params.id }, req.body)
        .then(() => {
            Posts.findOne({ "_id": req.params.id })
                .then(post => {
                    res.status(200).send(post);
                })
                .catch(next)
        })
        .catch(next)
});

//DELETE request to /posts/:id
router.delete('/posts/:id', function (req, res, next) {
    Posts.findByIdAndRemove({ "_id": req.params.id })
        .then((post) => {
            res.status(200).send(post);
        })
        .catch(next)
});

module.exports = router;