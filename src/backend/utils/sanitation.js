exports.checkType = (val, typeString, typeClass) =>
  typeof val == typeString || val instanceof typeClass;

exports.formatTask = (task) => {
  return {
    id: task._id,
    author: task.author,
    content: task.content,
  };
};

exports.formatGroup = (group) => {
  return {
    id: group._id,
    title: group.title,
    tasks: group.tasks.map((t) => formatTask(t)),
    files: group.files,
  };
};
