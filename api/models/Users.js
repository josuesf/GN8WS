/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true,
    },
    email:{
      type:'email',
      required:true,
      unique:true,
    },
    username:{
      type:'string',
      required:true,
      unique:true,
      primaryKey: true,
    },
    password:{
      type:'string',
      required:true,
    },
    photo_url:{
      type:'string'
    }

  },
  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • user     {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup_ws: function (inputs, cb) {
    // Create a user
    Users.create({
      name: inputs.name,
      email: inputs.email,
      username:inputs.username,
      // TODO: But encrypt the password first
      password: inputs.password,
      photo_url:inputs.photo_url,
    })
    .exec(cb);
  },
  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • user     {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    Users.create({
      name: inputs.name,
      email: inputs.email,
      username:inputs.username,
      // TODO: But encrypt the password first
      password: inputs.password,
      photo_url:'sin_imagen',
    })
    .exec(cb);
  },
  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • user     {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  isuser: function (inputs, cb) {
    // Create a user
    Users.findOne({
      email: inputs.email,
    })
    .exec(cb);
  },
<<<<<<< HEAD

  signin: function (inputs, cb){
    Users.findOne({
      email: inputs.email,
      password: inputs.password
    })
    .exec(cb)
=======
  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • user     {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signin: function (inputs, cb) {
    // Create a user
    Users.findOne({
      email: inputs.email,
      password:inputs.password
    })
    .exec(cb);
>>>>>>> 9df7c8550521cf3a1bd38c3d61282d9a7fdbffeb
  },
  
  connection:'mongodb'
};

