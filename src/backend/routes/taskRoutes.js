const express = require("express");
const controller = require("./../controllers/taskController.js");
const authMiddlewares = require("./../middlewares/authMiddlewares.js");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const MAX_FILE_UPLOAD_AMOUNT = process.env.MAX_FILE_UPLOAD_AMOUNT ?? 12;

router.post(
  "/group/create",
  authMiddlewares.checkToken,
  upload.array("files", MAX_FILE_UPLOAD_AMOUNT),
  controller.createTaskGroup
);
router.get("/group/read", authMiddlewares.checkToken, controller.getTaskGroups);
router.delete(
  "/group/delete/:id",
  authMiddlewares.checkToken,
  controller.deleteTaskGroup
);

router.post("/create", authMiddlewares.checkToken, controller.createTask);
router.get("/read", authMiddlewares.checkToken, controller.getTasks);
router.post("/update", authMiddlewares.checkToken, controller.updateTask);
router.delete("/delete", authMiddlewares.checkToken, controller.deleteTask);

module.exports = router;
