// 引入配置文件
const config = require("../config");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// 定义user结构
const userSchema = new mongoose.Schema({
  // 邮箱
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // 用户名
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  // 密码
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    select: false,
  },
  // 个人简介
  bio: {
    type: String,
    maxlength: 100,
    default: "这是一段很神秘的个人简介~",
  },
  // _v隐藏
  __v: {
    type: Number,
    select: false,
  },
});

// 生成token
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, config.secret, { expiresIn: "10d" });
};

// 创建Model
const User = mongoose.model("User", userSchema);

// 创建内容校验规则
function userValidator(data) {
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
    name: Joi.string().min(2).max(20).required().messages({
      "any.required": "用户名不能为空",
      "string.base": "用户名必须是字符串",
      "string.min": "用户名长度不能小于2位",
      "string.max": "用户名长度不能大于20位",
    }),
    password: Joi.string()
      .min(6)
      .max(18)
      .pattern(/^[a-zA-Z0-9]{6,18}$/)
      .required()
      .messages({
        "any.required": "密码不能为空",
        "string.pattern.base": "密码必须是6-18位的数字或字母",
        "string.min": "密码长度不能小于6位",
        "string.max": "密码长度不能大于18位",
      }),
    _id: Joi.objectId(),
    bio: Joi.string().max(100).allow("").messages({
      "string.max": "个人简介长度不能大于100位",
    }),
  });
  return schema.validate(data);
}

// 导出
module.exports = {
  User,
  userValidator,
};
