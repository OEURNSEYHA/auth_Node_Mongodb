const UserController = require('../controller/UserController')
const router = require('express').Router()
const multer = require("multer");

const requireCookieToken = require('../middleware/AuthRequire');



const upload = multer();

router.get('/users' ,requireCookieToken, UserController.gets);
router.post("/user/register", UserController.register)
router.post("/user/login", upload.none(), UserController.login)
router.put("/user/update/:id", UserController.update);
router.post("/logout", UserController.logout)

module.exports  = router