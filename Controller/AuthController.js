require('../db/config');
const User = require('../db/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const register = async (req, res, done) =>{
    var { name, phone, username, password } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    if(!await User.findOne({email:username})){
        const email = username;
        var password = await bcrypt.hash(password,10);
        let user = new User({ name, phone, email, password });
        await user.save((err,user)=>{
            if(err) return done(err)
            req.user = user;
            if(user) return done(null,user);
        });
        
    }else{
        res.status(200).json({
            message:"Email is already exist."
        }); 
    }
}

const login = async (req, res) =>{
    res.status(200).json({
        message:"login success",
        user:req.user
    });
}

module.exports = {
    register,
    login
}

//