
require('dotenv').config();
const bodyParser=require("body-parser");
const express = require("express");
const ejs=require("ejs");
 const  app = express();
 const mongoose=require("mongoose");
 const encrypt=require("mongoose-encryption");
 const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://new-user:08cgt7hNen0eX2Rz@todo.388n0tg.mongodb.net/users?retryWrites=true&w=majority");

const usersSchema = new mongoose.Schema({
    email:String,
    password: String
  });

  usersSchema.plugin(mongooseFieldEncryption, {fields: ["password"],secret: process.env.SECRET});
const User = mongoose.model('User', usersSchema);

app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    const newUser=new User({
        email:req.body.username,
        password:req.body.password
    });
    newUser.save();
      res.render("secrets");
});

app.post("/login",function(req,res){
   const  username=req.body.username;
   const pass =req.body.password;

    User.findOne({email:username}).then(function(i){
        
        if(i.password===pass){
            res.render("secrets");
        }
        else{
            res.send("Invalid Credentials!!");
        }
       });
});
app.get("/logout",function(req,res){
    res.send("<h1>Logged Out</h1>");
})

















app.listen(3000, function () {
  console.log("Server is running on port 3000 ");
})