const userModel = require("./../models/userModel.js");
const taskModel = require("./../models/taskModel.js");
const groupModel = require("./../models/groupModel.js");

const sanitationUtils = require("./../utils/sanitation.js");
const checkType = sanitationUtils.checkType;

exports.createTaskGroup = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    } else if (
      !"title" in req.body ||
      !checkType(req.body.title, "string", String)
    ) {
      return res.status(400).json("Bad Request");
    }

    const group = await groupModel.create({
      title: req.body.title,
    });
    return res.status(201).json(group);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.getTaskGroups = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    }

    const groups = await groupModel.find();
    return res.status(200).json(groups);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.updateTaskGroup = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    } else if (
      !"id" in req.body ||
      !"title" in req.body ||
      !checkType(req.body.id, "string", String) ||
      !checkType(req.body.title, "string", String)
    ) {
      return res.status(400).json("Bad Request");
    } else if (await groupModel.exists({ _id: req.body.id })) {
      return res.status(404).json("Not Found");
    }

    const group = await groupModel.findOne({ _id: req.body.id });
    group.title = req.body.title;
    await group.save();
    return res.status(200).json(group);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.deleteTaskGroup = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    } else if (!"id" in req.body || !checkType(req.body.id, "string", String)) {
      return res.status(400).json("Bad Request");
    } else if (await groupModel.exists({ _id: req.body.id })) {
      return res.status(404).json("Not Found");
    }
    const group = await groupModel.deleteOne({ _id: req.body.id });
    return res.status(204).json(group);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.createTask = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    } else if (
      !(
        "groupId" in req.body &&
        "title" in req.body &&
        "content" in req.body
      ) ||
      !checkType(req.body.groupId, "string", String) ||
      !checkType(req.body.title, "string", String) ||
      !checkType(req.body.content, "string", String)
    ) {
      return res.status(400).json("Bad Request");
    } else if (!(await groupModel.exists({ _id: req.body.groupId }))) {
      return res.status(404).json("Not Found");
    }

    const user = await userModel.findOne({ username: req.payload.username });
    const task = await taskModel.create({
      author: user.id,
      group: req.body.groupId,
      title: req.body.title,
      content: req.body.content,
      groupIndex: 0,
    });
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.getTasks = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    }

    const tasks = await taskModel.find();
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.updateTask = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    } else if (
      !("id" in req.body && "title" in req.body && "content" in req.body)
    ) {
      return res.status(400).json("Bad Request");
    } else if (!(await taskModel.exists({ _id: req.body.id }))) {
      return res.status(404).json("Not Found");
    }

    const user = await userModel.findOne({ username: req.payload.username });
    const task = await taskModel.findOne({ _id: req.body.id });

    if (task.author != user._id) {
      return res.status(403).json("Forbidden");
    }

    task.title = req.body.title;
    task.content = req.body.content;
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.deleteTask = async function (req, res) {
  try {
    if (!(await userModel.exists({ username: req.payload.username }))) {
      return res.status(403).json("Forbidden");
    } else if (!("id" in req.body)) {
      return res.status(400).json("Bad Request");
    } else if (!(await taskModel.exists({ _id: req.body.id }))) {
      return res.status(404).json("Not Found");
    }

    const user = await userModel.findOne({ username: req.payload.username });
    const task = await taskModel.findOne({ _id: req.body.id });

    if (task.author != user._id) {
      return res.status(403).json("Forbidden");
    }

    await taskModel.deleteOne({ _id: req.body.id });
    return res.status(204).json("No Content");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};
