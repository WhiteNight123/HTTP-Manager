const mongoose = require("mongoose");
// 引入Joi
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// 定义接口结构
const interfaceSchema = new mongoose.Schema({
  // 接口名字
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  // 接口描述
  description: {
    type: String,
    maxlength: 3000,
    select: false,
  },
  // 接口标签
  tag: {
    type: String,
    maxlength: 40,
  },
  // 请求方法
  requestMethod: {
    type: String,
    required: true,
    enums: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    default: "GET",
  },
  // 请求路径
  requestPath: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  // 请求头
  requestHeaders: {
    type: String,
    maxlength: 5000,
    select: false,
  },
  // 请求参数
  requestParams: {
    type: String,
    maxlength: 5000,
    select: false,
  },
  // 请求体
  requestBody: {
    type: String,
    maxlength: 5000,
    select: false,
  },
  // 响应体
  response: {
    type: String,
    maxlength: 5000,
    select: false,
  },
  // 项目id
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  // 历史版本
  history: {
    type: [
      {
        // 版本号
        version: {
          type: Number,
          required: true,
        },
        // 更新时间
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        // 更新人
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        // 更新内容
        data: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
    select: false,
  },
  // 隐藏版本信息
  __v: {
    type: Number,
    select: false,
  },
});

// 创建Model
const Interface = mongoose.model("Interface", interfaceSchema);

// 创建接口规则
function interfaceValidator(data) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(20).required().messages({
      "any.required": "接口名字不能为空",
      "string.base": "接口名字必须是字符串",
      "string.min": "接口名字长度不能小于1位",
      "string.max": "接口名字长度不能大于20位",
    }),
    description: Joi.string().allow("").max(3000).messages({
      "string.base": "接口描述必须是字符串",
      "string.max": "接口描述长度不能大于3000位",
    }),
    tag: Joi.string().allow("").max(40).messages({
      "string.base": "接口标签必须是字符串",
      "string.max": "接口标签长度不能大于40位",
    }),
    requestMethod: Joi.string()
      .valid("GET", "POST", "PUT", "DELETE", "PATCH")
      .required()
      .messages({
        "any.required": "请求方法不能为空",
        "string.base": "请求方法必须是字符串",
        "any.only":
          "请求方法必须是GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS中的一个",
      }),
    requestPath: Joi.string().min(1).max(100).required().messages({
      "any.required": "请求路径不能为空",
      "string.base": "请求路径必须是字符串",
      "string.min": "请求路径长度不能小于1位",
      "string.max": "请求路径长度不能大于100位",
    }),
    requestHeaders: Joi.string().max(5000).messages({
      "string.base": "请求头必须是字符串",
      "string.max": "请求头长度不能大于5000位",
    }),
    requestParams: Joi.string().max(1000).messages({
      "string.base": "请求参数必须是字符串",
      "string.max": "请求参数长度不能大于1000位",
    }),
    requestBody: Joi.string().max(5000).messages({
      "string.base": "请求体必须是字符串",
      "string.max": "请求体长度不能大于5000位",
    }),
    response: Joi.string().max(5000).messages({
      "string.base": "响应体必须是字符串",
      "string.max": "响应体长度不能大于5000位",
    }),
    projectId: Joi.objectId().required().messages({
      "any.required": "项目id不能为空",
      "string.pattern.base": "项目id格式不正确",
    }),
  });
  return schema.validate(data);
}

// 批量创建接口规则
function interfaceBatchValidator(data) {
  const schema = Joi.object({
    type: Joi.string().valid("append", "overwrite").required().messages({
      "any.required": "接口类型不能为空",
      "string.base": "接口类型必须是字符串",
      "any.only": "接口类型必须是append或overwrite",
    }),
    projectId: Joi.objectId().required().messages({
      "any.required": "项目id不能为空",
      "string.pattern.base": "项目id格式不正确",
    }),
    datas: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().min(1).max(20).required().messages({
            "any.required": "接口名字不能为空",
            "string.base": "接口名字必须是字符串",
            "string.min": "接口名字长度不能小于1位",
            "string.max": "接口名字长度不能大于20位",
          }),
          description: Joi.string().allow("").max(3000).messages({
            "string.base": "接口描述必须是字符串",
            "string.max": "接口描述长度不能大于3000位",
          }),
          tag: Joi.string().allow("").max(40).messages({
            "string.base": "接口标签必须是字符串",
            "string.max": "接口标签长度不能大于40位",
          }),
          requestMethod: Joi.string()
            .valid("GET", "POST", "PUT", "DELETE", "PATCH")
            .required()
            .messages({
              "any.required": "请求方法不能为空",
              "string.base": "请求方法必须是字符串",
              "any.only":
                "请求方法必须是GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS中的一个",
            }),
          requestPath: Joi.string().min(1).max(100).required().messages({
            "any.required": "请求路径不能为空",
            "string.base": "请求路径必须是字符串",
            "string.min": "请求路径长度不能小于1位",
            "string.max": "请求路径长度不能大于100位",
          }),
          requestHeaders: Joi.array(),
          requestParams: Joi.object(),
          requestBody: Joi.object(),
          response: Joi.object(),
        })
      )
      .required()
      .messages({
        "any.required": "接口数据不能为空",
        "array.base": "接口数据必须是数组",
      }),
  });
  return schema.validate(data);
}

// 导出
module.exports = {
  Interface,
  interfaceValidator,
  interfaceBatchValidator,
};
