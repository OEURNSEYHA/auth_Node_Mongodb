const { isEmail, isStrongPassword } = require("validator");
const Users = require("../model/Users");
const bcrypt = require("bcrypt");

const UserController = {
  get: async (req, res) => {
    res.json({ message: "Hello" });
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) throw Error("Please Input Failed");
      if (!isEmail(email)) throw Error("Email Invalid");
      if (!isStrongPassword(password)) throw Error("Password Not Strong");
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt)
      const user = await Users.create({ name, email, password: hashPassword });

      res.json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};

module.exports = UserController;
