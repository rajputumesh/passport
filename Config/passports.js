const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session({
    secret:'node passport',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false, maxAge:60000}
}));

const User = require('../db/User');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ email: username }, function (err, user) {
            if (err) {
                return done(err); 
            }
            if (!user) {
                return done(null, false); 
            } else {
                bcrypt.compare(password, user.password)
                .then(function(result) {
                    if(result){
                        console.log('LocalStrategy',user);
                        return done(null, user);
                    }else{
                        return done('password not match'); 
                    }
                });
            }
            
        });
    }
));
 
passport.serializeUser((user,done)=>{
    if(user){
        console.log("serializeUser ",user)
        return done(null,user.id);
    }
    return done(null, false);
});

passport.deserializeUser((id, done) => {
    User.findById(id,(err, user)=>{
        if (err) { return done(err); }
        return done(null,user);
    });
})

module.exports = {
    passport
}