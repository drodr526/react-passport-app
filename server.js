const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./user.js")
const path = require("path")
const dotenv = require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/passportDB");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(session({
    secret:process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


//use /api/ prefix to make sure React Routing does not conflict with url. 
app.post("/api/login", (req,res, next)=>{
    passport.authenticate("local",(err, user, info)=>{
        if (err) throw err;
        if(!user) res.send("No user exists")
        else{
            req.logIn(user, err =>{
                if(err) throw err;
                res.send("Successfully authenticated");
                console.log(req.user);
            })
        }
    })(req,res,next);
})
app.post("/api/register", (req,res)=>{
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if(doc) res.send("User already exists");
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            const newUser = new User({
                username:req.body.username,
                password:hashedPassword
            })
            await newUser.save();
            res.send("User created");
        }
    })
})
app.get("/api/session", (req,res)=>{
    res.send(req.user);
})
app.get("/api/logout", (req,res)=>{
    req.logout();
    req.session.destroy();
    res.send("Logged out");
})

app.listen(4000, ()=>{
    console.log("Server started on port 4000");
})

//when ready to deploy to heroku, set NODE_ENV to "production" so it knows to send the build version
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

//always put the catch all at the end
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})
