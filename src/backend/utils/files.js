const { v1, v4 } = require("uuid");
const fs = require("fs");
const { posix: path } = require("path");
const fileModel = require("./../models/fileModel");

const UPLOADS_PATH = process.env.UPLOADS_PATH ?? "uploads";

/**
 * Removes a file from the local file system.
 * @param path The path.
 */
exports.removeLocalFile = function (path) {
  try {
    if (fs.existsSync(path)) fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
};

exports.generateUploadDirectory = function () {
  try {
    if (!fs.existsSync(UPLOADS_PATH)) {
      fs.mkdirSync(UPLOADS_PATH);
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * Stores a file buffer on the file system and stores its associated data on the database.
 * @param file The File object.
 * @param fileType The file type. See the type property on the file model. An enum: ["image", "video", "archive", "text", "other"]
 * @returns An object { file, path } with file the file model object, path its upload path.
 */
exports.uploadFileAsync = async function (file, fileType) {
  const createdFileName = v1();
  const createdFilePath = path.join(UPLOADS_PATH, createdFileName);

  try {
    const newFile = await fileModel.create({
      url: createdFilePath,
      name: file.originalname,
      type: fileType,
    });

    removeLocalFile(createdFilePath);
    let fd = fs.openSync(createdFilePath, "w");
    fs.writeSync(fd, file.buffer, 0, file.size, 0);
    fs.closeSync(fd);

    return { file: newFile, path: createdFilePath };
  } catch (err) {
    console.error(err);
  }
};
