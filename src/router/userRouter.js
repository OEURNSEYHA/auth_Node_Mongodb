const UserController = require("../controller/UserController");
const router = require("express").Router();
const multer = require("multer");

const requireCookieToken = require("../middleware/AuthRequire");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/users", UserController.gets);
router.post("/user/register", upload.array('image', 5), UserController.register);
router.post("/user/login", upload.none(), UserController.login);
router.put("/user/update/:id", upload.none(), UserController.update);
router.post("/logout", UserController.logout);

module.exports = router;
