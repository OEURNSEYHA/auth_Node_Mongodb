const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import cookie-parser
require("dotenv").config();
const { JWT_SECRET } = process.env;

const requireCookieToken = (req, res, next) => {
  // Use cookie-parser middleware to parse cookies
  cookieParser()(req, res, () => {
    const token = req.cookies.accessToken; // Replace with the name of your authentication token cookie
console.log(token)
    if (!token) {
      return res.status(401).json({ error: "Authentication token not found in cookie" });
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      req.user = decodedToken; // You can access the decoded token in subsequent middleware or routes
      next(); // Continue to the next middleware or route
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  });
};

module.exports = requireCookieToken;
