const mongoose= require("mongoose");
const validator= require("validator");
const bcrypt=require("bcryptjs");

const peopleSchema= new mongoose.Schema({//const object inside constructor new mongoose.Schema
  firstName:{
      type:String,
      required:true
    },
  lastName:{
      type:String,
      required:true
    },  
    gender:{
        type:String,
        required:true
      },
      dob:{
        type:String,
        required:true  
      },
      email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
        if(!validator.isEmail(value)){
           throw new Error("Invalid")
        }
      } 
    },
      password:{
        type:String,
        required:true
      }, 
      confirmpassword:{
        type:String,
        required:true
      }      
})
//peopleSchema.methods
peopleSchema.pre("save", async function(next) {

  if(this.isModified("password")){
     console.log(`the current password: ${this.password}`);
     this.password= await bcrypt.hash(this.password, 10)
     console.log(`the current hashed password: ${this.password}`);
     this.confirmpassword= undefined;
  }
  next();
})

//now we need to create a collectons i.e. model definition is required ,now basically we have to register this people schema i.e. the stucture of my data
const Register = new mongoose.model("Register", peopleSchema);// registers collection take pass kora ho66e . Class er nam 'Register'
module.exports= Register;


