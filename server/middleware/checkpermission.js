const { UserProject } = require("../model/user-project");

module.exports = (type) => {
  return (req, res, next) => {
    const { projectId } = req.body;
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
