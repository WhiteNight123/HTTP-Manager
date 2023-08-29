const { UserProject } = require("../model/user-project");
const { Interface } = require("../model/interface");

// 验证权限
module.exports = (type) => {
  return async (req, res, next) => {
    // 从req.body或者req.params中获取projectId
    let projectId = req.body.projectId || req.params.projectId;
    let interfaceId = req.params.interfaceId;
    // 如果有interfaceId，根据interfaceId的projectId进行判断
    try {
      if (interfaceId) {
        const interface = await Interface.findById(interfaceId).select(
          "projectId"
        );
        if (!interface) {
          return res.status(400).json({
            code: 400,
            msg: "接口不存在",
          });
        }
        projectId = interface.projectId._id;
      }
    } catch (err) {
      next(err);
    }
    console.log(projectId);
    const userId = req.userData._id;
    UserProject.findOne({ projectId, userId })
      .then((userProject) => {
        if (userProject && userProject.auth === "admin" && type === "project") {
          next();
        } else if (
          userProject &&
          (userProject.auth === "admin" || userProject.auth === "write") &&
          type === "interface"
        ) {
          next();
        } else {
          res.status(403).json({
            code: 403,
            msg: "您没有权限",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
};
