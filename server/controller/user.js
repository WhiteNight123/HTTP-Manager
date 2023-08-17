// 引入bcrypt
const bcrypt = require("bcrypt");

const { User } = require("../model/user");

// 注册用户
exports.register = async (req, res, next) => {
  try {
    let { email, password, name } = req.validValue;
    // 1. 判断邮箱是否已经注册
    let user = await User.findOne({ email });
    // 2. 如果邮箱已经注册，返回错误信息
    if (user) {
      return res.status(400).json({
        code: 400,
        msg: "邮箱已经注册!",
        data: { email },
      });
    }
    // 3. 如果邮箱没有注册，注册新用户
    // 3.1 加密
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    // 3.2 创建用户
    user = await User.create({
      email,
      password,
      name,
    });
    // 3.3 进行数据存储
    await user.save();
    // 3.4 返回响应
    res.status(200).json({
      code: 200,
      msg: "注册成功!",
      data: { email, name, _id: user._id },
    });
  } catch (err) {
    next(err);
  }
};

// 获取指定用户
exports.getUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: "用户不存在!",
      });
    }
    res.status(200).json({
      code: 200,
      msg: "获取用户成功!",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// 修改指定用户
exports.updateUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let body = req.body;
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    // 1. 查找用户
    const data = await User.findByIdAndUpdate(userId, body);
    // 2. 如果用户不存在，返回错误信息
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "用户不存在!",
      });
    }
    // 3. 更新成功
    res.status(200).json({
      code: 200,
      msg: "更新用户成功!",
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
};

// 删除指定用户
exports.deleteUser = async (req, res, next) => {
  try {
    let userId = req.params.id;
    // 如果id格式不正确，返回错误信息
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        code: 400,
        msg: "用户id格式不正确!",
        value: {
          _id: userId,
        },
      });
    }
    // 1. 查找用户并删除
    const user = await User.findByIdAndDelete(userId);
    // 2. 如果用户不存在，返回错误信息
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: "用户不存在!",
        value: {
          _id: userId,
        },
      });
    }
    // 3. 删除成功
    res.status(200).json({
      code: 200,
      msg: "删除用户成功!",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
