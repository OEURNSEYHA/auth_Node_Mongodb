const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect("mongodb+srv://seyhaoeurn920:seyha123@cluster0.dajr3sb.mongodb.net/test?retryWrites=true&w=majority")
  .then((result) => {
    console.log("connect successfully");
  })
  .catch((req, res, err) => {
    res.json({error: err})
  });

  // mongodb+srv://root:seyha123@cluster0.wimhp9u.mongodb.net/?retryWrites=true&w=majority
  // mongodb+srv://seyhaoeurn920:<password>@cluster0.dajr3sb.mongodb.net/?retryWrites=true&w=majority