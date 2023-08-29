const { Interface } = require("../model/interface");
const { Project } = require("../model/project");

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
      projectId: projectId,
      history: [
        {
          version: 1,
          updatedAt: Date.now(),
          updatedBy: userId,
          data: JSON.stringify(req.validValue, null, 2),
        },
      ],
    });
    // 3.2 进行数据存储
    await interface.save();
    // 存到项目中，项目接口数量加1
    await Project.findByIdAndUpdate(projectId, {
      interfaceCount: project.interfaceCount + 1,
      $push: { interfaces: interface._id },
    });
    // 项目接口数量加1

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

// 批量创建接口
exports.batchCreateInterface = async (req, res, next) => {
  try {
    let { type, datas, projectId } = req.body;
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
    // 判断类型，如果是覆盖，先删除所有接口
    if (type === "overwrite") {
      await Interface.deleteMany({ projectId: projectId });
      // 项目接口数量置为0
      project = await Project.findByIdAndUpdate(
        projectId,
        {
          interfaceCount: 0,
          $set: { interfaces: [] },
        },
        { new: true }
      );
    } else if (type !== "append") {
      return res.status(400).json({
        code: 400,
        msg: "type 参数错误!",
        data: { type },
      });
    }
    // 批量创建接口
    let interfaces = [];
    for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      data.requestHeaders = JSON.stringify(data.requestHeaders, null, 2);
      data.requestParams = JSON.stringify(data.requestParams, null, 2);
      data.requestBody = JSON.stringify(data.requestBody, null, 2);
      data.response = JSON.stringify(data.response, null, 2);
      data.projectId = projectId;
      let interface = await Interface.create({
        ...data,
        history: [
          {
            version: 1,
            updatedAt: Date.now(),
            updatedBy: userId,
            data: JSON.stringify(data, null, 2),
          },
        ],
      });
      interfaces.push(interface);
    }
    // 存到项目中，项目接口数量加interfaces.length
    await Project.findByIdAndUpdate(projectId, {
      interfaceCount: project.interfaceCount + interfaces.length,
      $push: { interfaces: { $each: interfaces } },
    });
    // 返回响应
    res.status(200).json({
      code: 200,
      msg: "批量创建接口成功!",
      data: interfaces,
    });
  } catch (err) {
    next(err);
  }
};

// 获取指定项目的所有接口
exports.getInterfaces = async (req, res, next) => {
  try {
    let { projectId } = req.params;
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
    // 提取接口的tag，去重后生成一个数组，添加到interfaces中
    let tags = [];
    interfaces.forEach((item) => {
      if (item.tag) {
        tags.push(item.tag);
      }
    });
    // 3.2 返回响应
    res.status(200).json({
      code: 200,
      msg: "获取接口成功!",
      data: {
        tag: [...new Set(tags)],
        interfaces: interfaces,
      },
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
    let interface = await Interface.findOne({ _id: interfaceId })
      .select(
        "+description +requestHeaders +requestParams +requestBody +response +history"
      )
      .populate("history.updatedBy projectId", "name");
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
    ).select("+history");
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    // 3. 将 req.body 转换为 JSON，然后将其转换为字符串并存储在 interface.history 中
    let data = JSON.stringify(req.validValue, null, 2);
    let historyVersion = {
      version: interface.history.length + 1,
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
    ).select(
      "+description +requestHeaders +requestParams +requestBody +response"
    );
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
    // 从项目中删除
    let project = await Project.findOne({ _id: interface.projectId });
    await Project.findByIdAndUpdate(interface.projectId, {
      interfaceCount: project.interfaceCount - 1,
      $pull: { interfaces: interfaceId },
    });
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
    let interface = await Interface.findOne({ _id: interfaceId })
      .select("history")
      .populate("history.updatedBy");
    // 2. 如果接口不存在，返回错误信息
    if (!interface) {
      return res.status(400).json({
        code: 400,
        msg: "接口不存在!",
        data: { interfaceId },
      });
    }
    // 将接口的历史版本按照更新时间倒序排列
    interface.history.sort((a, b) => {
      return b.updatedAt - a.updatedAt;
    });
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
    // 5.2 更新接口
    interface = await Interface.findByIdAndUpdate(
      interfaceId,
      { $push: { history: historyVersion }, ...data },
      { new: true }
    ).select(
      "+description +requestHeaders +requestParams +requestBody +response +history"
    );
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
