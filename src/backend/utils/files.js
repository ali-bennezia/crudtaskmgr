const { v1, v4 } = require("uuid");
const fs = require("fs");
const { posix: path } = require("path");
const fileModel = require("./../models/fileModel.js");
const fileTypeChecker = require("file-type-checker");

const DisplayFileType = {
  IMAGE: "image",
  VIDEO: "video",
  ARCHIVE: "archive",
  TEXT: "text",
  OTHER: "other",
};

module.exports.DisplayFileType = DisplayFileType;

const UPLOADS_PATH = process.env.UPLOADS_PATH ?? "uploads";

/**
 * Removes a file from the local file system.
 * @param path The path.
 */
function removeLocalFile(path) {
  try {
    if (fs.existsSync(path)) fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
}
exports.removeLocalFile = removeLocalFile;

exports.generateUploadDirectory = function generateUploadDirectory() {
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
exports.uploadFileAsync = async function uploadFileAsync(file, fileType) {
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

/**
 * Returns the file's display type.
 * @param {File} file The file.
 * @returns {{displayType: DisplayFileType, mimeType: string} | null} The file's display type data. Returns null if error.
 */
exports.getFileDisplayType = function getFileDisplayType(file) {
  buffer = file.arrayBuffer;

  let displayType = DisplayFileType.OTHER;
  let type = null;

  try {
    type = fileTypeChecker.detectFile(buffer);
    if (type == undefined) {
      if (file.originalname.endsWith(".txt"))
        displayType = DisplayFileType.TEXT;
    } else {
      if (type.mimeType.startsWith("image"))
        displayType = DisplayFileType.IMAGE;
      else if (type.mimeType.startsWith("video"))
        displayType = DisplayFileType.VIDEO;
      else if (
        type.mimeType.match(/^application\/x-(rar-)?compressed$/i).length > 0
      )
        displayType = DisplayFileType.ARCHIVE;
    }
  } catch {
    if (file.originalname.endsWith(".txt")) {
      displayType = DisplayFileType.TEXT;
    }
  }
  return {
    displayType: displayType,
    mimeType:
      type?.mimeType ??
      (displayType == DisplayFileType.TEXT
        ? "text/plain"
        : "application/octet-stream"),
  };
};
