const UserController = require('../controller/UserController')
const router = require('express').Router()
const multer = require("multer");
// const AuthRequire = require('../middleware/AuthRequire');

const upload = multer();
router.get('/users' , UserController.gets);
router.post("/user/register", upload.none(), UserController.register)
router.post("/user/login", upload.none(), UserController.login)


module.exports  = router