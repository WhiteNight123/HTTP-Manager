const router = require("express").Router();

const { userValidator } = require("../model/user");
const validator = require("../middleware/validate");

const auth = require("../middleware/auth");
const user = require("../controller/user");

// 注册用户
router.post("/", validator(userValidator), user.register);

// 获取指定用户
router.get("/:id", user.getUser);

// 修改指定用户
router.put("/:id", [auth, validator(userValidator)], user.updateUser);

// 删除指定用户
router.delete("/:id", [auth, validator(userValidator)], user.deleteUser);

module.exports = router;
