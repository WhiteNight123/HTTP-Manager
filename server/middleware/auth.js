// 引入jwt
const jwt = require("jsonwebtoken");
const config = require("../config");

// 验证token
module.exports = function (req, res, next) {
  // 获取请求头中的token
  const token = req.headers["authorization"];
  // 如果token不存在
  if (!token) {
    return res.status(400).json({
      code: 400,
      msg: "无Token!",
    });
  }
  // 如果token存在,验证token
  try {
    const userData = jwt.verify(token, config.secret);
    // 如果验证成功,将用户信息挂载到req上
    req.userData = userData;
    next();
  } catch (err) {
    return res.status(401).json({
      code: 401,
      msg: "Token无效!",
    });
  }
};
