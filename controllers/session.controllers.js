//Controladores de login, logout, y register
const { UserModel } = require("../models/user.model");
const { hashPassword, isValidPassword } = require("../utils/utils");

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if( !email || !password) {
      return req.status(400).json({ status: 'error', error: 'Missing fields'})
    }
    const user = await UserModel.findOne({ email });
    let adminInfoUser
    if (!user) {
      console.log('user not found');
      return res.redirect('/');
    }
    if (!isValidPassword(user, password)) {
      console.log('passwords dont match');
      return res.redirect('/');
    }
    if(user.email.includes('@coder.com')){
      adminInfoUser = {
        _id: user._id,
        first_name: user.first_name,
        age: user.age,
        email: user.email,
        admin: true}
    }else{
      adminInfoUser= {
        _id: user._id,
        first_name: user.first_name,
        age: user.age,
        email: user.email,
        admin: false}
    }    
    req.session.user = adminInfoUser;
    req.session.save(err => {
      if (err) console.log('session error => ', err);
      else res.redirect('/profile');
    });
    console.log("updateUser", adminInfoUser)
  };

const registerController = async (req, res, next) => {
try {
    const { first_name, last_name, age, email, password } = req.body;
    if(!first_name || !last_name || !age || !email || !password) {
      return req.status(400).json({ status: 'error', error: 'Missing fields'})
    }

    let user = await UserModel.findOne({ email });
    if (user) {
    return res.status(400).json({ status: 'error', error: 'The user already exists'});
    }
    const newUser = {
      ...req.body,
      password: hashPassword(password)
    }
    const respond = await UserModel.create(newUser);
    const sessionUser = {
      _id: respond.id,
      first_name: respond.first_name,
      last_name: respond.last_name,
      age: respond.age,
      email: respond.email
    }
    respond.email.includes('@coder.com') ? sessionUser.admin = true : sessionUser.admin = false ;
    req.session.user = sessionUser;
    req.session.save(err => {
    if (err) console.log('session error => ', err);
    else {
        res.redirect('/profile')
    };
    });
}
catch(error) {
    console.log(error);
}
};

const logoutController = (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      }
      else {
        res.clearCookie('start-solo');
        res.redirect('/');
      }
    })
  };
  
  module.exports = {loginController, registerController, logoutController}