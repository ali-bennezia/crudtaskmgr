/*const groupModel = require("./../models/groupModel");

exports.cascadeTaskDeletion = async function cascadeTaskDeletion(
  taskModel,
  groupId
) {
  const taskIds = (await taskModel.find({ group: groupId })).map((t) => t._id);
  let parent = await groupModel.findOne({ _id: groupId });
  if (parent) {
    parent.tasks = parent.tasks.filter((t) => !taskIds.include(t.id));
    await parent.save();
  }
};
*/
