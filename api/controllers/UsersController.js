/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var multer = require('multer')
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')

module.exports = {

    signup_ws: function (req, res) {

        // Attempt to signup a user using the provided parameters
        Users.signup_ws({
            name: req.param('name'),
            email: req.param('email'),
            username: req.param('username'),
            password: req.param('password'),
            photo_url: req.param('photo_url')
        }, function (err, user) {
            if (err)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
        });
    },
    is_user_ws: function (req, res) {

        // Attempt to signup a user using the provided parameters
        Users.isuser({
            email: req.param('email'),
        }, function (err, user) {
            if (err || user == null)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
        });
    },
    signup: function (req, res) {
        Users.signup({
            name: req.param('name'),
            email: req.param('email'),
            username: req.param('username'),
            password: req.param('password')
        }, function (err, user) {
            if (err)
                return res.negotiate(err)
            req.session.me = user.id
            return res.redirect('/')
        })
    },

    signin: function (req, res) {
        Users.signin({
            email: req.param('email'),
            password: req.param('password')
        }, function (err, user) {
            if (err || user == null)
                return res.negotiate(err)
            req.session.me = user.id
            return res.redirect('/home')
        })
    },
    signin_ws: function (req, res) {
        Users.signin({
            email: req.param('email'),
            password: req.param('password')
        }, function (err, user) {
            if (err || user == null)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
        })
    },

    load_picture: function (req, res) {
        var config = {aws:{
            accessKey:"AKIAJ6EPZIP4ECYBJEPA",
            secretKey:"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"
        }}

        var s3 = new aws.S3({
            accessKeyId: config.aws.accessKey,
            secretAccessKey: config.aws.secretKey
        })
        var storage = multerS3({
            s3: s3,
            bucket: 'gn8images',
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname })
            },
            key: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
        var upload = multer({ storage: storage }).single('picture')

        upload(req, res, function (err,result){
            if(err){
                return res.send(500, 'Error uploading file')
            }
            res.send(result)
        })
    }


};

