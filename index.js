const express = require("express");
const cors = require('cors');
const mongoose  = require('mongoose')
const users = require('./routes/users')
// MaddleWare
const app = express();
app.use(express.json());
app.use(cors())

// connection to DB
mongoose.connect('mongodb://localhost:27017/quantumgoods').then(() => {
    // Port Running if connected
    app.listen(7000, () => console.log("listening... at 7000"));
}).catch((e) => console.log(e))


// User routes
app.use('/user', users.router)


