const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    username:{type:String},
    phoneNumber:{type:Number},
    gender:{type:String},
    dataOfBirth:{type:Date},
    bio:{type:String},
    location:{type:String}
});
const userModal=mongoose.model("user",userSchema);
module.exports=userModal;