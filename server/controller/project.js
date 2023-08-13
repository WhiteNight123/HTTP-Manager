const { Project } = require("../model/project");
const { UserProject } = require("../model/user-project");

// 创建项目
exports.createProject = async (req, res, next) => {
  try {
    let { name } = req.validValue;
    let userId = req.userData._id;
    // 1. 判断项目是否已经存在
    let project = await Project.findOne({ name, creator: userId });
    // 2. 如果项目已经存在，返回错误信息
    if (project) {
      return res.status(400).json({
        code: 400,
        msg: "项目已经存在!",
        data: { name },
      });
    }
    // 3. 如果项目不存在，创建新项目
    // 3.1 创建项目
    project = await Project.create({
      ...req.validValue,
      creator: userId,
      members: [userId],
    });
    const userProject = await UserProject.create({
      userId,
      projectId: project._id,
      auth: "admin",
    });
    // 3.2 进行数据存储
    await project.save();
    await userProject.save();
    // 3.3 返回响应
    res.status(200).json({
      code: 200,
      msg: "创建项目成功!",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// 获取该用户的所有项目
exports.getProjects = async (req, res, next) => {
  try {
    let userId = req.userData._id;
    let projects = await Project.find({ members: userId });
    if (!projects) {
      return res.status(400).json({
        code: 400,
        msg: "查找失败",
      });
    }
    res.status(200).json({
      code: 200,
      msg: "获取项目成功!",
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

// 获取指定项目
exports.getProject = async (req, res, next) => {
  try {
    let projectId = req.params.id;
    let project = await Project.findById(projectId).populate("creator members");
    if (!project) {
      return res.status(400).json({
        code: 400,
        msg: "项目不存在!",
      });
    }
    // 查找用户权限
    let members = project.members;
    // 临时存储用户权限
    let tmp = [];
    for (let i = 0; i < members.length; i++) {
      let member = { ...members[i]._doc };
      console.log(member);
      let userProject = await UserProject.findOne({
        userId: member._id,
        projectId: projectId,
      });
      if (!userProject) {
        member.auth = "read";
      } else {
        member.auth = userProject.auth;
      }
      tmp.push(member);
    }
    let data = { ...project._doc };
    data.members = tmp;
    res.status(200).json({
      code: 200,
      msg: "获取项目成功!",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

// 修改指定项目
exports.updateProject = async (req, res, next) => {
  try {
    let projectId = req.params.id;
    let body = req.body;
    const data = await Project.findByIdAndUpdate(projectId, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "修改失败",
      });
    }
    res.status(200).json({
      code: 200,
      msg: "修改成功!",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

// 删除指定项目
exports.deleteProject = async (req, res, next) => {
  try {
    let projectId = req.params.id;
    const data = await Project.findByIdAndDelete(projectId);
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "删除失败",
      });
    }
    await UserProject.deleteMany({ projectId });
    res.status(200).json({
      code: 200,
      msg: "删除项目成功!",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

// 项目添加成员
exports.addMember = async (req, res, next) => {
  try {
    let { userId, projectId, auth } = req.body;
    console.log(userId, projectId, auth);
    // 判断用户是否存在
    let data = await Project.findOne({ _id: projectId, members: userId });
    if (data) {
      return res.status(400).json({
        code: 400,
        msg: "用户已存在!",
      });
    }
    await Project.findByIdAndUpdate(projectId, { $push: { members: userId } });
    const newData = await UserProject.create({ userId, projectId, auth });
    res.status(200).json({
      code: 200,
      msg: "添加成员成功!",
      data: newData,
    });
  } catch (err) {
    next(err);
  }
};

// 项目修改成员权限
exports.updateMember = async (req, res, next) => {
  try {
    let { userId, projectId, auth } = req.body;
    // 判断用户是否存在
    let data = await Project.findOne({ _id: projectId, members: userId });
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "用户不存在!",
      });
    }
    const newData = await UserProject.findOneAndUpdate(
      { userId, projectId },
      { auth },
      { new: true }
    );
    res.status(200).json({
      code: 200,
      msg: "修改成员权限成功!",
      data: newData,
    });
  } catch (err) {
    next(err);
  }
};

// 项目删除成员
exports.deleteMember = async (req, res, next) => {
  try {
    let { userId, projectId } = req.body;
    // 判断用户是否存在
    let data = await Project.findOne({ _id: projectId, members: userId });
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "用户不存在!",
      });
    }
    await Project.findByIdAndUpdate(projectId, { $pull: { members: userId } });
    const deleteData = await UserProject.findOneAndDelete({
      userId,
      projectId,
    });
    res.status(200).json({
      code: 200,
      msg: "删除成员成功!",
      data: deleteData,
    });
  } catch (err) {
    next(err);
  }
};
