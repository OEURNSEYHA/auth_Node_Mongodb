const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('../config/config')
app.use(express.json());
app.use(cors());

const userRoute = require('./router/userRouter');

app.use(userRoute)

app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('http://localhost:'+ process.env.PORT)
    }
})