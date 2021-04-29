const mongoose = require('mongoose');

const URL='mongodb+srv://abhinav123:abhinav123@cluster0.ozslk.mongodb.net/shopper?retryWrites=true&w=majority';

const connectDB = async ()=>{
 const conn=await mongoose.connect(URL,{
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:false,
     useUnifiedTopology: true
 });

 console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB;