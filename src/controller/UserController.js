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

  // Define your route for registration with multiple image uploads
  register : async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const thumbnail = req.files['thumbnail'][0].filename;
      const images = req.files['images'].map((image) => image.filename);
  
      if (!name || !email || !password) {
        throw new Error('Please provide all required information');
      }
  
      if (!isEmail(email)) {
        throw new Error('Invalid email format');
      }
  
      if (!isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
      }
  
      if (!thumbnail) {
        throw new Error('Please upload a thumbnail');
      }
  
      if (!images || images.length === 0) {
        throw new Error('Please upload at least one image');
      }
  
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
  
      // Use the `create` method to create and save the user
    const newUser = await Users.create({
      name,
      email,
      password: hashPassword,
      thumbnail,
      images,
    });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
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
      return res.json({ user, token: token, message: "Login Success" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email } = req.body;
      const dataUpdate = { name, email };
      console.log(email);

      if (!id) {
        throw new Error("Invalid user ID");
      }

      if (!email) {
        throw new Error("Email is required");
      }

      const userUpdate = await Users.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });

      if (!userUpdate) {
        throw new Error("User not found");
      }

      res.json({ message: id, userUpdate });
    } catch (err) {
      res.status(400).json({ error: err.message });
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
  },
};

module.exports = UserController;
