const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db')
const errorHandler =require('./middleware/error')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')


//Loading enviroment Variables
dotenv.config({ path: './config/config.env' });


// Route files
const products= require('./routes/products');
const auth= require('./routes/auth');
const orders= require('./routes/orders')


//Connect To dataBase
connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());


//For prevention of query Injections
// app.use(mongoSanitize);
// app.use(xss);



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use('/api/products', products);
app.use('/api/auth',auth);
app.use('/api/orders',orders);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server Listening on : ${PORT}`));

