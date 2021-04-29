const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      require:[true,'Please Provide Role [Salesman/Publisher]'],
      enum: ['salesman', 'publisher'],

    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    contact:{
      minlength:10,
      type:Number,
    },
    loaction:{
      type :String,
    },
    sales:{
      type:Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  //Sign JWT and token return
  UserSchema.methods.getSignedJwtToken= function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
           expiresIn:process.env.JWT_EXPIRE
    });
  }

  //Check password
  UserSchema.methods.matchPassword= async function (enteredPassword){
   return  await bcrypt.compare(enteredPassword,this.password);
      
  }
  
  module.exports = mongoose.model('User',UserSchema);