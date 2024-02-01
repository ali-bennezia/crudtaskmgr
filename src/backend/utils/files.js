const { v1, v4 } = require("uuid");
const fs = require("fs");
const { posix: path } = require("path");
const fileModel = require("./../models/fileModel");

const UPLOADS_PATH = process.env.UPLOADS_PATH ?? "uploads";

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

exports.uploadFileAsync = async function (file, fileType) {
  const createdFileName = v1();
  const createdFilePath = path.join(UPLOADS_PATH, createdFileName);

  try {
    const newFile = await fileModel.create({
      url: createdFilePath,
      name: file.originalname,
      type: fileType,
    });

    removeFile(createdFilePath);
    let fd = fs.openSync(createdFilePath, "w");
    fs.writeSync(fd, file.buffer, 0, file.size, 0);
    fs.closeSync(fd);

    return newFile;
  } catch (err) {
    console.error(err);
  }
};
