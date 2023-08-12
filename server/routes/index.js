const router = require("express").Router();

// 用户接口
router.use("/user", require("./user"));

// 登录接口
router.use("/auth", require("./auth"));

// 上传文件接口
router.use("/upload", require("./upload"));

// 项目接口
router.use("/project", require("./project"));

module.exports = router;
