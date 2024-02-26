const taskModel = require("./../models/taskModel.js");
const fileModel = require("./../models/fileModel.js");

exports.cascadeGroupDeletion = async function cascadeGroupDeletion(doc) {
  return Promise.all([
    taskModel.deleteMany({ group: doc._id }),
    fileModel.deleteMany({ group: doc._id }),
  ]);
};
