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

function userProjectUpdateValidator(data) {
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

function userProjectAddValidator(data) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .lowercase()
      .min(6)
      .max(30)
      .required()
      .messages({
        "any.required": "邮箱不能为空",
        "string.email": "邮箱格式不正确",
        "string.min": "邮箱长度不能小于6位",
        "string.max": "邮箱长度不能大于30位",
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
  userProjectUpdateValidator,
  userProjectAddValidator,
};
