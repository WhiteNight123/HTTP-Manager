const router = require("express").Router();

// 用户接口
router.use("/user", require("./user"));

// 登录接口
router.use("/auth", require("./auth"));

module.exports = router;
