const express = require("express");
const cors = require('cors');
const mongoose  = require('mongoose')
const dotenv = require('dotenv'); 
const users = require('./routes/user')
const product = require('./routes/product')
const category = require('./routes/category')
const app = express();

// MaddleWare
app.use(express.json());
app.use(cors())
dotenv.config(); 

// connection to DB
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    // Port Running if connected
    app.listen(process.env.PORT, () => console.log("listening... at 7000"));
}).catch((e) => console.log(e))


// User routes
app.use('/user', users.router)

// Product routes
app.use('/product', product.router)

// Category routes
app.use('/category', category.routes)


