const SwaggerParser = require("swagger-parser");
const util = require("util");

// 递归提取属性
function extractProperties(schema) {
  const result = {};
  if (schema.properties) {
    for (const propName in schema.properties) {
      const prop = schema.properties[propName];
      if (prop.type === "object") {
        result[propName] = extractProperties(prop);
      } else if (prop.type === "array") {
        result[propName] = [extractProperties(prop.items)];
      } else {
        result[propName] = "";
      }
    }
  }
  return result;
}

// 提取响应体
function extractResponse(response) {
  const result = {
    contentType: "",
    content: [],
  };
  for (const statusCode in response) {
    const content = response[statusCode].content;
    const contentType = Object.keys(content)[0];
    const schema = content[contentType].schema;
    const extractedData = extractProperties(schema);
    result.contentType = contentType;
    result.content.push({
      ...extractedData,
      code: statusCode,
    });
  }
  return result;
}

exports.upload = (req, res, next) => {
  try {
    SwaggerParser.parse(req.file.path)
      .then((api) => {
        const swagger = [];
        // 将路径参数格式转换为路由参数格式
        const paths = api.paths;
        for (const path in paths) {
          // 将路径参数格式转换为路由参数格式
          const expressPath = path.replace(/\{(\w+)\}/g, ":$1");
          api.paths[expressPath] = paths[path];
          if (expressPath !== path) delete api.paths[path];
          const methods = api.paths[expressPath];
          // 遍历所有请求方法
          for (const method in methods) {
            const operation = methods[method];
            // 提取接口信息
            const name = operation.summary;
            const description = operation.description;
            const requestMethod = method.toUpperCase();
            // 将路径参数格式转换为路由参数格式
            const requestPath = path.replace(/\{(\w+)\}/g, ":$1");
            // 处理请求头
            const requestHeaders = operation.parameters
              .filter((param) => param.in === "header")
              .map(({ name, description, required, example, schema }) => ({
                name,
                description,
                required,
                example,
                type: schema.type,
              }));
            // 处理请求参数
            const requestParams = operation.parameters
              .map(
                ({
                  name,
                  in: paramIn,
                  description,
                  required,
                  example,
                  schema,
                }) => ({
                  name,
                  in: paramIn,
                  description,
                  required,
                  example,
                  type: schema.type,
                })
              )
              .reduce(
                (result, param) => {
                  if (param.in === "query") {
                    // 去除param中的in属性
                    delete param.in;
                    result.query.push(param);
                  } else if (param.in === "path") {
                    delete param.in;
                    result.path.push(param);
                  }
                  return result;
                },
                { path: [], query: [] }
              );

            // 处理请求体
            let requestBody = { contentType: "", content: [] };
            if (operation.requestBody && operation.requestBody.content) {
              const contentType = Object.keys(operation.requestBody.content)[0];
              const schema = operation.requestBody.content[contentType].schema;
              // 处理application/json
              if (contentType === "application/json") {
                requestBody.contentType = contentType;
                requestBody.content.push(extractProperties(schema));
              }
              // 处理multipart/form-data和application/x-www-form-urlencoded
              else if (
                contentType === "multipart/form-data" ||
                contentType === "application/x-www-form-urlencoded"
              ) {
                requestBody = {
                  contentType: contentType.split("/")[1],
                  content: Object.entries(
                    operation.requestBody.content[contentType].schema.properties
                  ).map(([name, prop]) => ({
                    name,
                    description: prop.description || "",
                    required:
                      operation.requestBody.content[
                        contentType
                      ].schema.required.includes(name),
                    example: prop.example || "",
                    type: prop.type,
                  })),
                };
              }
              // 处理text/plain
              else if (contentType === "text/plain") {
                requestBody.contentType = contentType;
                requestBody.content.push({
                  name: "",
                  description: "",
                  required: false,
                  example:
                    operation.requestBody.content["text/plain"].example || "",
                  type: "string",
                });
              }
            }
            // 处理响应体
            const response = extractResponse(operation.responses);
            // 将接口信息添加到数组中
            swagger.push({
              name,
              description,
              requestMethod,
              requestPath,
              requestHeaders,
              requestParams,
              requestBody,
              response,
            });
          }
        }
        console.log(util.inspect(swagger, false, null, true));
        res.status(200).json({
          code: 200,
          msg: "解析文件成功!",
          data: swagger,
        });
      })
      .catch((err) => {
        // 处理错误
        console.error(err);
        res.status(400).json({
          code: 400,
          msg: "解析文件失败!",
        });
      });
  } catch (err) {
    next(err);
  }
};
