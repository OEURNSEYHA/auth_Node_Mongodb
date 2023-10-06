const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
require("../config/config");
app.use(express.json());
app.use(cors());
const cookieParser = require("cookie-parser");
const userRoute = require("./router/userRouter");

app.use(userRoute);
app.use(cookieParser());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node Js API Project for mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/",
        
      },
    ],
   
  },
  apis: ["../src/router/userRouter.js"],
  module: ['./model/Users.js']
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("http://localhost:" + process.env.PORT);
  }
});
