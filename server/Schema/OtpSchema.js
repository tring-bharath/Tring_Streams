const mongoose = require('mongoose');
const otpSchema=new mongoose.Schema({
    email:{type:String},
    otp:{type:Number}
});
const otpModel=mongoose.model("otp",otpSchema);
module.exports = otpModel; 