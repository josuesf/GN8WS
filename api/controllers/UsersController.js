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
            if (err || user==null)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
        });
    },
<<<<<<< HEAD
    signup: function (req, res){
        Users.signup({
            name: req.param('name'),
            email: req.param('email'),
            username: req.param('username'),
            password: req.param('password')
        }, function (err, user) {
            if(err)
                return res.negotiate(err)
            req.session.me=user.id
            return res.redirect('/')
        })
    },

    signin: function (req, res){
        Users.signin({
            email: req.param('email'),
            password: req.param('password')
        }, function (err , user){
            if(err || user == null)
                return res.negotiate(err)
            req.session.me=user.id
            return res.redirect('/home')
=======
    signin_ws:function(req,res){
        Users.signin({
            email:req.param('email'),
            password:req.param('password')
        },function(err,user){
            if (err || user==null)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
>>>>>>> 9df7c8550521cf3a1bd38c3d61282d9a7fdbffeb
        })
    }


};

