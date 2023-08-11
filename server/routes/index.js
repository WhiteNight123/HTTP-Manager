const router = require("express").Router();

// 用户接口
router.use("/user", require("./user"));

module.exports = router;
