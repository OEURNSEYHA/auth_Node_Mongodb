const { isEmail, isStrongPassword } = require("validator");
const Users = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET, ACCESS_TOKEN_EXPIRATION, COOKIE_EXPIRATION } = process.env;
const createToken = (_id, email, password) => {
  return jwt.sign({ _id, email, password }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

const UserController = {
  gets: async (req, res) => {
    try {
      const users = await Users.find({});
      res.json(users);
    } catch (err) {
      res.json({ error: err });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) throw Error("Please Input Failed");
      if (!isEmail(email)) throw Error("Email Invalid");
      if (!isStrongPassword(password)) throw Error("Password Not Strong");
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const user = await Users.create({ name, email, password: hashPassword });
      res.json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await Users.findOne({ email });
      if (!user) throw Error(" Email invalid ");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw Error("Password Invalid");
      const token = createToken(user._id, user.email, user.password);
      // Calculate the expiration time (e.g., 1 hour from now)
      const expirationTime = new Date(
        Date.now() + COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
      );
      //   expirationTime.setHours(expirationTime.getHours() + 7 ); // Adjust the expiration as needed

      //   // Set an HttpOnly access token cookie with the correct expiration time
      res.cookie("accessToken", token, {
        expires: expirationTime,
        httpOnly: true,
        secure: true, // Make sure to set this for HTTPS
        sameSite: "Strict", // Recommended for added security
      });
      return res.json({ token: token, message: "Login Success" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  logout: async (req, res) => {
    res.cookie("accessToken", "", {
      expires: new Date(0), // Expire immediately
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ message: "Token expired" });
  }
};

module.exports = UserController;
