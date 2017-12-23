/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    signup_ws: function (req, res) {

        // Attempt to signup a user using the provided parameters
        Users.signup({
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
    signin_ws:function(req,res){
        Users.signin({
            email:req.param('email'),
            password:req.param('password')
        },function(err,user){
            if (err || user==null)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
        })
    }


};

