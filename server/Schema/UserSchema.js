const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    ProfilePicture:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:Number},
    gender:{type:String},
    dataOfBirth:{type:Date},
    bio:{type:String},
    location:{type:String}
});

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;