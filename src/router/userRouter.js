const UserController = require('../controller/UserController')
const router = require('express').Router()
const multer = require("multer");
const upload = multer();
router.get('/' , UserController.get);
router.post("/user/register", upload.none(), UserController.register)



module.exports  = router