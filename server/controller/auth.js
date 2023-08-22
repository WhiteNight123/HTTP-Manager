// 引入用户模块
const { User } = require("../model/user");

// 引入bcrypt
const bcrypt = require("bcrypt");

// 登录
exports.login = async (req, res, next) => {
  try {
    // 获取到校验后的数据
    const validValue = req.validValue;
    // 1.检测用户是否存在
    let user = await User.findOne({ email: validValue.email }).select(
      "+password"
    );
    // 2.如果用户不存在，返回错误信息
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: "用户名或密码错误!",
      });
    }
    // 3.如果用户存在，检测密码是否正确
    const isValid = await bcrypt.compare(validValue.password, user.password);
    // 4.如果密码不正确，返回错误信息
    if (!isValid) {
      return res.status(400).json({
        code: 400,
        msg: "用户名或密码错误!",
      });
    }
    // 5.如果密码正确，返回登录成功
    res.status(200).json({
      code: 200,
      msg: "登录成功!",
      data: {
        id: user._id,
        name: user.name,
        token: user.generateToken(),
      },
    });
  } catch (err) {
    next(err);
  }
};
