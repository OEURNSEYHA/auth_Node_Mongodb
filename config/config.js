const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOURL, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
    console.log('connect successfully');
}).catch((err) => {
    console.log(err);
});