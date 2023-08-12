const router = require("express").Router();

const {
  projectValidator,
  updateProjectValidator,
} = require("../model/project");
const { userProjectValidator } = require("../model/user-project");
const validator = require("../middleware/validate");

const auth = require("../middleware/auth");
const checkPermission = require("../middleware/checkpermission");
const project = require("../controller/project");

// 获取该用户的所有项目
router.get("/", auth, project.getProjects);

// 获取指定项目
router.get("/:id", project.getProject);

// 创建项目
router.post("/", [auth, validator(projectValidator)], project.createProject);

// 修改指定项目
router.patch(
  "/:id",
  [auth, validator(updateProjectValidator)],
  project.updateProject
);

// 删除指定项目
router.delete("/:id", auth, project.deleteProject);

// 项目添加成员
router.post(
  "/member",
  [auth, validator(userProjectValidator), checkPermission],
  project.addMember
);

// 项目修改成员权限
router.put(
  "/member",
  [auth, validator(userProjectValidator), checkPermission],
  project.updateMember
);

// 项目删除成员
router.delete("/member", [auth, checkPermission], project.deleteMember);

module.exports = router;
