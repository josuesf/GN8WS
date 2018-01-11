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
            photo_facebook: req.param('photo_facebook'),
            es_empresa: req.param('es_empresa'),
        }, function (err, user) {
            if (err)
                return res.json({ res: 'error', detail: err });
            return res.json({ res: 'ok', user: user });
        });
    },
    signupEmpresa_ws: function (req, res) {
        req.file('photo_url').upload({
            adapter: require('skipper-better-s3')
            , key: process.env.S3_KEY
            , secret: process.env.S3_SECRET
            , bucket: 'gn8images' // Optional - default is 'us-standard' 
            // Let's use the custom s3params to upload this file as publicly 
            // readable by anyone 
            , s3params:
                { ACL: 'public-read' }
        }, function (err, filesUploaded) {
            if (err) return res.json({ res: 'error', detail: err });

            Users.signup_ws({
                name: req.param('name'),
                email: req.param('email'),
                username: req.param('username'),
                password: req.param('password'),
                photo_url: filesUploaded[0].extra.Location,
                es_empresa: 'SI',
                direccion:req.param('direccion'),
                telefono:req.param('telefono'),
    
            }, function (err, user) {
                if (err)
                    return res.json({ res: 'error', detail: err });
                return res.json({ res: 'ok', user: user });
            });

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
            return res.view('home', { user: user })
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
            , key: process.env.S3_KEY
            , secret: process.env.S3_SECRET
            , bucket: 'gn8images' // Optional - default is 'us-standard' 
            // Let's use the custom s3params to upload this file as publicly 
            // readable by anyone 
            , s3params:
                { ACL: 'public-read' }
        }, function (err, filesUploaded) {
            if (err) return res.negotiate(err);

            Users.setPhoto({
                id: req.session.me,
                photo_url: filesUploaded[0].extra.Location
            }, function (err, user) {
                if (err) return res.negotiate(err);

                return res.ok({
                    files: filesUploaded,
                    textParams: user
                });
            })

        });
    },
    uploadPhotoUser: function (req, res) {
        req.file('picture').upload({
            adapter: require('skipper-better-s3')
            , key: process.env.S3_KEY
            , secret: process.env.S3_SECRET
            , bucket: 'gn8images' // Optional - default is 'us-standard' 
            // Let's use the custom s3params to upload this file as publicly 
            // readable by anyone 
            , s3params:
                { ACL: 'public-read' }
        }, function (err, filesUploaded) {
            if (err) return res.negotiate(err);

            Users.setPhoto({
                id: req.param('id'),
                photo_url: filesUploaded[0].extra.Location
            }, function (err, user) {
                if (err || user == null)
                    return res.json({ res: 'error', detail: err });
                return res.json({ res: 'ok', user: user });
            })

        });
    },
    updateUser_ws: function (req, res) {
        Users.update(req.param('id'),
            {
                name: req.param('name'),
            })
            .exec(function (err, user) {
                if (err || user == null)
                    return res.json({ res: 'error', detail: err });
                return res.json({ res: 'ok', user: user[0] });
            })
    },
    listaEmpresas_ws:function(req,res){
        Users.find({
            es_empresa: "SI",
          })
            .exec(function (err, empresas) {
                if (err || empresas == null)
                    return res.json({ res: 'error', detail: err });
                return res.json({ res: 'ok', empresas:empresas  });
            })
    }


};

