const { Interface } = require("../model/interface");
const { UserProject } = require("../model/user-project");
const { Project } = require("../model/project");
const jsondiffpatch = require("jsondiffpatch").create();



// 创建接口
exports.createInterface = async (req, res, next) => {
  try {
    let { projectId } = req.validValue;
    let userId = req.userData._id;
    // 1. 判断项目是否存在
    let project = await Project.findOne({ _id: projectId });
    // 2. 如果项目不存在，返回错误信息
    if (!project) {
      return res.status(400).json({
        code: 400,
        msg: "项目不存在!",
        data: { projectId },
      });
    }
    // 3. 如果项目存在，创建新接口
    // 3.1 创建接口
    const interface = await Interface.create({
      ...req.validValue,
      project: projectId,
    });
    // 3.2 进行数据存储
    await interface.save();
    // 3.3 返回响应
    res.status(200).json({
      code: 200,
      msg: "创建接口成功!",
      data: interface,
    });
  } catch (err) {
    next(err);
  }
};

// 获取指定项目的所有接口
exports.getInterfaces = async (req, res, next) => {
  try {
    let { projectId } = req.params;
    let userId = req.userData._id;
    // 1. 判断项目是否存在
    let project = await Project.findOne({ _id: projectId });
    // 2. 如果项目不存在，返回错误信息
    if (!project) {
      return res.status(400).json({
        code: 400,
        msg: "项目不存在!",
        data: { projectId },
      });
    }
    // 3. 如果项目存在，获取所有接口
    // 3.1 获取所有接口
    const interfaces = await Interface.find({ projectId: projectId });
    // 3.2 返回响应
    res.status(200).json({
      code: 200,
      msg: "获取接口成功!",
      data: interfaces,
    });
  } catch (err) {
    next(err);
  }
};

// 获取指定接口
exports.getInterface = async (req, res, next) => {
  try {
    let { interfaceId } = req.params;
    let userId = req.userData._id;
    // 1. 判断接口是否存在
    let interface = await Interface.findOne({ _id: interfaceId }).select(
      "+description +headers +params +body +response +history"
    );
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    // 3 返回响应
    res.status(200).json({
      code: 200,
      msg: "获取接口成功!",
      data: interface,
    });
  } catch (err) {
    next(err);
  }
};

// 更新指定接口
exports.updateInterface = async (req, res, next) => {
  try {
    let { interfaceId } = req.params;
    let userId = req.userData._id;
    // 1. 判断接口是否存在
    let interface = await Interface.findByIdAndUpdate(
      { _id: interfaceId },
      req.validValue,
      { new: true }
    ).select("+description +headers +params +body +response +history");
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    // 3. 将 req.body 转换为 JSON，然后将其转换为字符串并存储在 interface.history 中
    let data = JSON.stringify(req.validValue);
    let historyVersion = {
      version: interface.history ? interface.history.length + 1 : 0,
      updatedAt: Date.now(),
      updatedBy: userId,
      data: data,
    };
    interface = await Interface.findByIdAndUpdate(
      interfaceId,
      {
        $push: { history: historyVersion },
      },
      { new: true }
    ).select("+description +headers +params +body +response");
    // 3 返回响应
    res.status(200).json({
      code: 200,
      msg: "更新接口成功!",
      data: interface,
    });
  } catch (err) {
    next(err);
  }
};

// 删除指定接口
exports.deleteInterface = async (req, res, next) => {
  try {
    let { interfaceId } = req.params;
    let userId = req.userData._id;
    // 1. 判断接口是否存在
    let interface = await Interface.findByIdAndDelete({ _id: interfaceId });
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    // 3. 返回响应
    res.status(200).json({
      code: 200,
      msg: "删除接口成功!",
      data: interface,
    });
  } catch (err) {
    next(err);
  }
};

// 获取接口的历史版本
exports.getInterfaceHistory = async (req, res, next) => {
  try {
    let { interfaceId } = req.params;
    let userId = req.userData._id;
    // 1. 判断接口是否存在
    let interface = await Interface.findOne({ _id: interfaceId }).select(
      "history"
    );
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    const diffResult = jsondiffpatch.diff(JSON.parse(interface.history[0].data), JSON.parse(interface.history[1].data));
    console.log(diffResult)
    // 3 返回响应
    res.status(200).json({
      code: 200,
      msg: "获取接口的历史版本成功!",
      data: interface.history,
    });
  } catch (err) {
    next(err);
  }
};

// 回滚接口到指定版本
exports.rollbackInterface = async (req, res, next) => {
  try {
    let { interfaceId, historyId } = req.params;
    let userId = req.userData._id;
    // 1. 判断接口是否存在
    let interface = await Interface.findOne({ _id: interfaceId }).select(
      "history"
    );
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    // 3. 判断历史版本是否存在
    let history = interface.history.find((h) => h._id.toString() === historyId);
    // 4. 如果历史版本不存在，返回错误信息
    if (!history) {
      return res.status(400).json({
        code: 400,
        msg: "历史版本不存在!",
        data: { historyId },
      });
    }
    // 5. 如果历史版本存在，回滚接口
    // 5.1 回滚接口
    const data = JSON.parse(history.data);
    let historyVersion = {
      version: interface.history ? interface.history.length + 1 : 0,
      updatedAt: Date.now(),
      updatedBy: userId,
      data: history.data,
    };
    interface = await Interface.findByIdAndUpdate(
      interfaceId,
      { $push: { history: historyVersion }, ...data },
      { new: true }
    ).select("+description +headers +params +body +response");
    // 5.2 返回响应
    res.status(200).json({
      code: 200,
      msg: "回滚接口成功!",
      data: interface,
    });
  } catch (err) {
    next(err);
  }
};
