const fileModel = require("./../models/fileModel");
const UPLOADS_PATH = process.env.UPLOADS_PATH ?? "uploads";

exports.setDownloadHeaders = async function (req, res, next) {
  try {
    let urlData = req.url.split("/");
    let fileUrl = urlData[1];
    let fileData = await fileModel.findOne({
      url: UPLOADS_PATH + "/" + fileUrl,
    });
    if (!fileData) {
      return res.status(404).json("Not Found");
    }
    res.set(
      "Content-Disposition",
      'attachment; filename="' + fileData.name + '"'
    );
    next();
  } catch (err) {
    return res.status();
  }
};
