
require('dotenv').config();

const bodyParser=require("body-parser");
const express = require("express");
const ejs=require("ejs");
const  app = express();
const mongoose=require("mongoose");
const bcrypt = require('bcrypt');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://new-user:08cgt7hNen0eX2Rz@todo.388n0tg.mongodb.net/users?retryWrites=true&w=majority");

const usersSchema = new mongoose.Schema({
    email:String,
    password: String
  });
const User= new mongoose.model("User",usersSchema)

const saltRounds = 10;//bcrypt with salt

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
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        // Store hash in your password DB.
        const newUser=new User({
        email:req.body.username,
        password:hash
    });
    newUser.save();
      res.render("secrets");
    });
  
});

app.post("/login",function(req,res){

   const  username=req.body.username;
   const pass =req.body.password;
   


    User.findOne({email:username}).then(function(i){
         bcrypt.compare(pass, i.password).then(function(result) {
           if(result===true){
            res.render("secrets");
        }
        else{
            res.send("Invalid Credentials!!");
        } 
        });
        
       });
});
app.get("/logout",function(req,res){
    res.send("<h1>Logged Out</h1>");
})

















app.listen(3000, function () {
  console.log("Server is running on port 3000 ");
})