const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var AuthUser = require('../models/authUsers');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


router.get('/register', function (req, res, next) {
    AuthUser.find()
        .then(users => {
            res.status(200).send(users);
        }).catch(next);
})

router.post('/register',
    [
        check('username')
            .exists().withMessage('username is required'),
            // .custom(value => {
            //     return findUserByEmail(value).then(user => {
            //         throw new Error('this email is already in use');
            //     })
            // }),

        // General error messages can be given as a 2nd argument in the check APIs
        check('password', 'passwords must be at least 5 chars long and contain one number')
            .isLength({ min: 8 })
            .matches(/\d/),
    ],
    function (req, res, next) {
        // check for validation error server-side and throw error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.mapped() });
        }

        var user = req.body;
        AuthUser.create(user)
            .then(user => {
                console.log(user);
                res.status(200).send(user);
            })
            .catch(next)
    })

module.exports = router;