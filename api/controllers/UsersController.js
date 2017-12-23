/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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

    uploadFile: function (req, res) {
        req.file('picture').upload({
            adapter: require('skipper-better-s3')
            , key: 'AKIAIHQ5O7BDIQ733FLA'
            , secret: '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'
            , bucket: 'gn8images' // Optional - default is 'us-standard' 
            // Let's use the custom s3params to upload this file as publicly 
            // readable by anyone 
            , s3params:
                { ACL: 'public-read' }
        }, function (err, filesUploaded) {
            if (err) return res.negotiate(err);

            Users.setPhoto({
                id:req.session.me,
                photo_url: filesUploaded[0].extra.Location
            }, function (err, user) {
                if (err) return res.negotiate(err);

                return res.ok({
                    files: filesUploaded,
                    textParams: user
                });
            })

        });
    }


};

