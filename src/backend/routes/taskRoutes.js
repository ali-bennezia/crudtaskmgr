const express = require("express");
const controller = require("./../controllers/taskController.js");
const authMiddlewares = require("./../middlewares/authMiddlewares.js");
const router = express.Router();

router.post( "/create", authMiddlewares.checkToken, controller.createTask );
router.get( "/read", authMiddlewares.checkToken, controller.getTasks );
router.post( "/update", authMiddlewares.checkToken, controller.updateTask );
router.delete( "/delete", authMiddlewares.checkToken, controller.deleteTask );

module.exports = router;
