const fileModel = require("./../models/fileModel");

exports.checkType = (val, typeString, typeClass) =>
  typeof val == typeString || val instanceof typeClass;

exports.formatTask = (task) => {
  return {
    id: task._id,
    author: task.author,
    content: task.content,
  };
};

exports.formatGroup = async (group) => {
  return {
    id: group._id,
    title: group.title,
    description: group.description,
    tasks: group.tasks.map((t) => formatTask(t)),
    files: await Promise.all(
      group.files.map(async (f) =>
        this.formatFile(await fileModel.findOne({ url: f }))
      )
    ),
  };
};

exports.formatFile = (file) => {
  return {
    id: file._id,
    url: file.url,
    name: file.name,
    type: file.type,
    mimeType: file.mimeType,
    group: file.group,
    weightBytes: file.weightBytes,
  };
};
