const User = require("./user.js");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport){
    passport.use(
        new LocalStrategy((username, password, done) =>{
            User.findOne({username:username},(err,foundUser)=>{
                if(err) throw err;
                if(!foundUser) return done(null, false);
                bcrypt.compare(password, foundUser.password, (err, result)=>{
                    if(err) throw err;
                    if(result === true){
                        return done(null,foundUser);
                    }else{
                        return(null, false);
                    }
                })
            })
        })
    )
    passport.serializeUser((user,cb)=>{
        cb(null, user.id);
    })
    passport.deserializeUser((id,cb)=>{
        User.findOne({_id:id}, (err,user)=>{
            cb(err,user);
        })
    })
}