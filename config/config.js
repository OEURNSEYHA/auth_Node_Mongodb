const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOURL)
.then((result) => {
    console.log("connect successfully")
}).catch((req, res,err) => {
    res.json({message: err});

});