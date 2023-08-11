const router = require("express").Router();

const { userValidator } = require("../model/user");
const validator = require("../middleware/validate");
// 注册用户
router.post("/", validator(userValidator), (req, res, next) => {
  console.log(req.validValue, "校验后的数据");
  res.send("注册用户");
});

// 获取指定用户
router.get("/:id", (req, res, next) => {
  res.send("获取指定用户");
});

// 修改指定用户
router.put("/:id", (req, res, next) => {
  res.send("修改指定用户");
});

// 删除指定用户
router.delete("/:id", (req, res, next) => {
  res.send("删除指定用户");
});

module.exports = router;
