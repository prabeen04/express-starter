const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var AuthUser = require('../models/authUsers');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');

passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (username, password, done) {
                //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
                return AuthUser.findOne({email: username})
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'Incorrect email or password.'});
                    }
                    return done(null, user, {message: 'Logged In Successfully'});
               })
               .catch(err => done(err));
        // AuthUser.findOne({ email: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) {
        //         return done(null, false, { message: 'Incorrect username.' });
        //     }
        //     bcrypt.compare(password, user.password, function (err, response) {
        //         if (err) {
        //             console.log(err);
        //         }
        //         if (response == false) {
        //             return done(null, false, { message: 'Incorrect password.' });
        //         }
        //         if (response == true) {
        //             return done(null, user);
        //         }
        //     })

        // });
    }
));
// LOGIN SYSTEM IN EXPRESS
router.post('/login',
    [
        check('email')
            .exists().withMessage('email is required')
    ],
    // passport.authenticate('local', {
    //     session: false
    // }),
    function (req, res, next) {
        // check for validation error server-side and throw error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }

        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
           req.login(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
               // generate a signed son web token with the contents of user object and return it in the response
               const token = jwt.sign(user, 'your_jwt_secret');
               return res.json({user, token});
            });
        })(req, res);

        // console.log(res.user);
    //     passport.authenticate('local', {session: false}, (err, user, info) => {
    //         console.log(err);
    //         if (err || !user) {
    //             return res.status(400).json({
    //                 message: info ? info.message : 'Login failed',
    //                 user   : user
    //             });
    //         }
    
    //         req.login(user, {session: false}, (err) => {
    //             if (err) {
    //                 res.send(err);
    //             }
    
    //             const token = jwt.sign(user, 'chicharito14');
    
    //             return res.json({user, token});
    //         });
    // })
    });
// GET ALL THE USERS FROM THE AUTHENTICATED USERS
router.get('/register', function (req, res, next) {
    AuthUser.find()
        .then(users => {
            res.status(200).send(users);
        }).catch(next);
})

// REGISTRATION SYSTEM IN EXPRESS
router.post('/register',
    [
        check('username')
            .exists().withMessage('username is required'),
        check('email')
            .exists().withMessage('email is required'),
        // .custom(value => {
        //     return findUserByEmail(value).then(user => {
        //         console.log('this email is already in use');
        //         throw new Error('this email is already in use');
        //     })
        // }),
        // General error messages can be given as a 2nd argument in the check APIs
        check('password', 'passwords must be at least 8 chars long and contain one number')
            .isLength({ min: 8 })
            .matches(/\d/),
    ],
    function (req, res, next) {
        // check for validation error server-side and throw error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                var user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }
                console.log(user);
                AuthUser.create(user)
                    .then(user => {
                        console.log(user);
                        res.status(200).send(user);
                    })
                    .catch(next)
            });
        });

    })


module.exports = router;