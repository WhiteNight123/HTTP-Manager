const mongoose = require("mongoose");

// 引入Joi
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// 定义user结构
const userProjectSchema = new mongoose.Schema({
  // 用户id
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // 项目id
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  // 权限
  auth: {
    type: String,
    required: true,
    enums: ["read", "write", "admin"],
    default: "read",
  },
  // 隐藏版本信息
  __v: {
    type: Number,
    select: false,
  },
});

// 创建Model
const UserProject = mongoose.model("UserProject", userProjectSchema);

function userProjectValidator(data) {
  const schema = Joi.object({
    userId: Joi.objectId().required().messages({
      "any.required": "用户id不能为空",
      "string.pattern.base": "用户id格式不正确",
    }),
    projectId: Joi.objectId().required().messages({
      "any.required": "项目id不能为空",
      "string.pattern.base": "项目id格式不正确",
    }),
    auth: Joi.string().valid("read", "write", "admin").required().messages({
      "any.required": "权限不能为空",
      "string.base": "权限必须是字符串",
      "any.only": "权限必须是read、write、admin中的一个",
    }),
  });
  return schema.validate(data);
}

// 导出
module.exports = {
  UserProject,
  userProjectValidator,
};
