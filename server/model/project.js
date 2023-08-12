// 引入配置文件
const config = require("../config");

const mongoose = require("mongoose"); // 连接mongodb

// 引入Joi
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// 定义project结构
const projectSchema = new mongoose.Schema({
  // 项目名称
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
  },
  // 项目描述
  description: {
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  // 项目创建者
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // 项目成员
  members: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    select: false,
  },
  // 项目创建时间
  createTime: {
    type: Date,
    default: Date.now,
  },
  // 隐藏版本信息
  __v: {
    type: Number,
    select: false,
  },
});

// 创建Model
const Project = mongoose.model("Project", projectSchema);

// 创建项目规则校验规则
function projectValidator(data) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(15).required().messages({
      "any.required": "项目名称不能为空",
      "string.min": "项目名称长度不能小于2位",
      "string.max": "项目名称长度不能大于15位",
    }),
    description: Joi.string().trim().min(2).max(100).messages({
      "string.min": "项目描述长度不能小于2位",
      "string.max": "项目描述长度不能大于100位",
    }),
    creator: Joi.objectId().messages({
      "any.required": "项目创建者不能为空",
    }),
    members: Joi.array().items(Joi.objectId().required()).messages({
      "any.required": "项目成员不能为空",
    }),
    createTime: Joi.date().default(Date.now),
  });
  return schema.validate(data);
}
// 修改项目规则校验规则
function updateProjectValidator(data) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(15).required().messages({
      "any.required": "项目名称不能为空",
      "string.min": "项目名称长度不能小于2位",
      "string.max": "项目名称长度不能大于15位",
    }),
    description: Joi.string().trim().min(2).max(100).messages({
      "string.min": "项目描述长度不能小于2位",
      "string.max": "项目描述长度不能大于100位",
    }),
  });
  return schema.validate(data);
}

// 导出
module.exports = {
  Project,
  projectValidator,
  updateProjectValidator
};
