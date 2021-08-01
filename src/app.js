const express= require("express");
const app= express()
const path = require("path");
const expHBS= require('express-handlebars');
const helpers= require('handlebars-helpers')();
const {json} = require("express");
require("./db/conn");
const Register= require("./models/register");
const bcrypt=require("bcryptjs");
const { pipeline } = require("stream");
const port=process.env.PORT || 3000;
const static_path= path.join(__dirname,"../public");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));
app.engine("hbs",expHBS({extname: 'hbs',defaultLayout: false,helpers:helpers, partialsDir:path.join(__dirname,"../views/partials")}));
app.set("view engine","hbs")
app.set("views",path.join(__dirname,"../views"));
app.get("/index",(req,res)=>{
    res.render("index",{
        style: "main.css",
        
    }); 
});
app.get("/index2",(req,res)=>{
    res.render("index",{
        style: "main.css",
        
    }); 
});
app.get("/register",(req,res)=>{
    res.render("register",{
        style: "slide2.css"
    }); 

});
app.post("/register",async(req,res)=>{
    try{
        const password =req.body.password;
        const cpassword =req.body.confirmpassword;
        if(password === cpassword)
        {
           const registerEmployee= new Register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            gender:req.body.gender,
            password :password,
            confirmpassword: cpassword,
            dob:req.body.dob
           });
          
                
        const registered= await registerEmployee.save()
        dataac=registered
        
        res.status(201).render("login",{
            style: "extra.css"
        });   
        }else{
            res.send("passwords donot match");
        }
    
    }catch(error){
        res.status(400).send(error);
    }
})
app.get("/login",(req,res)=>{
    res.render("login",{
        style: "extra.css"
    }); 
});
//Login check
app.post("/login",async(req,res)=>{
    try{
        const email =req.body.email;
        const password =req.body.password;
    const Details =await Register.findOne({email:email}); 
   
    const ismatch= await bcrypt.compare(password, Details.password);
   
    if(ismatch){
        res.status(201).render("index2",{
            style: "main.css"
        }); 
    }else{
        res.send("invalid login details");
    }
  
    }catch(error){
        res.status(400).send("invalid login details");
    }
})*
app.get("/finalpage",(req,res)=>{
    res.render("finalpage",{
        style: "main.css"
    }); 
});
app.get("/mytho_quiz",(req,res)=>{
    res.render("mytho_quiz",{
        style: "main.css"
    }); 
});
app.get("/about",(req,res)=>{
    res.render("about",{
        style: "about.css"
    }); 
});
app.get("/profile",(req,res)=>{
    
    res.render("profile",{data:dataac});
})

app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);
})