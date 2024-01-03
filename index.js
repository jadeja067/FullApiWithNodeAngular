const express = require("express");
const cors = require('cors');
const mongoose  = require('mongoose')
const users = require('./routes/users')
const dotenv = require('dotenv'); 
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


