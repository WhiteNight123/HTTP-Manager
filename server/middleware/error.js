// 服务器错误处理中间件
module.exports = (err, req, res, next) => {
  res.status(500).json({
    code: 500,
    msg: "服务器错误!",
  });

  // 在服务端打印错误信息
  console.error(err);
};
