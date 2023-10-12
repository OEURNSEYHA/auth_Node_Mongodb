const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require('./utils/swagger');
const allowedOrigins = ['http://localhost:3000'];

require("dotenv").config();
require("../config/config");
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies)
}));
const cookieParser = require("cookie-parser");
const userRoute = require("./router/userRouter");

app.use(userRoute);
app.use(cookieParser());


const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("http://localhost:" + process.env.PORT);
  }
});
