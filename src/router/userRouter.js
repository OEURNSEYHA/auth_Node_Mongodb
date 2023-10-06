const UserController = require('../controller/UserController')
const router = require('express').Router()
const multer = require("multer");

const requireCookieToken = require('../middleware/AuthRequire');



const upload = multer();

router.get('/users' , UserController.gets);
router.post("/user/register", upload.none(), UserController.register)
router.post("/user/login", upload.none(), UserController.login)
router.get("/logout", UserController.logout)

module.exports  = router