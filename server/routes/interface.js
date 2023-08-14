const router = require("express").Router();

const { interfaceValidator } = require("../model/interface");

const validator = require("../middleware/validate");

const auth = require("../middleware/auth");
const { checkPermission } = require("../middleware/checkpermission");
const interface = require("../controller/interface");

// 新建接口
router.post(
  "/",
  [auth, validator(interfaceValidator)],
  interface.createInterface
);

// 获取指定项目的所有接口
router.get("/project/:projectId", auth, interface.getInterfaces);

// 获取指定接口
router.get("/:interfaceId", auth, interface.getInterface);

// 修改指定接口
router.patch(
  "/:interfaceId",
  [auth, validator(interfaceValidator), checkPermission("interface")],
  interface.updateInterface
);

// 删除指定接口
router.delete(
  "/:interfaceId",
  [auth, checkPermission("interface")],
  interface.deleteInterface
);

// 获取接口的历史版本
router.get("/:interfaceId/history", auth, interface.getInterfaceHistory);

// 回滚接口到指定版本
router.put(
  "/:interfaceId/history/:historyId",
  [auth, checkPermission("interface")],
  interface.rollbackInterface
);

module.exports = router;
