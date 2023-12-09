const express = require("express");
const controller = require("./../controllers/userController.js");
const router = express.Router();

router.post( "/register", controller.register );
router.post( "/signin", controller.signIn );

module.exports = router;
