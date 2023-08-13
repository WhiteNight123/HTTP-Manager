const SwaggerParser = require("swagger-parser");
const util = require("util");

exports.upload = (req, res, next) => {
  try {
    SwaggerParser.parse(req.file.path)
      .then((api) => {
        // 将路径参数格式转换为路由参数格式
        const paths = api.paths;
        for (const path in paths) {
          const expressPath = path.replace(/\{(\w+)\}/g, ":$1");
          api.paths[expressPath] = paths[path];
          delete api.paths[path];

          const methods = api.paths[expressPath];
          // 遍历所有请求方法
          for (const method in methods) {
            const operation = methods[method];

            // 提取接口信息
            const name = operation.summary;
            const description = operation.description;
            const requestMethod = method.toUpperCase();
            const requestPath = path.replace(/\{(\w+)\}/g, ":$1");
            const requestHeaders = operation.parameters.filter(
              (param) => param.in === "header"
            );
            const requestParams = operation.parameters.reduce(
              (result, param) => {
                if (param.in === "query") {
                  result.query.push(param);
                } else if (param.in === "path") {
                  result.path.push(param);
                }
                return result;
              },
              { path: [], query: [] }
            );
            // 处理请求体
            if (operation.requestBody) {
  const contentType = Object.keys(operation.requestBody.content)[0];
  const schema = operation.requestBody.content[contentType].schema;

  const content = [];
  if (contentType === "application/json") {
    const parseSchema = (schema) => {
      const result = {
        type: schema.type,
        description: schema.description || "",
        required: schema.required || [],
        example: schema.example || "",
        properties: {},
      };

      if (schema.type === "object") {
        for (const prop in schema.properties) {
          const property = schema.properties[prop];
          const required = schema.required.includes(prop);
          const example = property.example || "";
          const name = prop;
          const description = property.description || "";
          const type = property.type;
          const items = property.items;

          if (type === "array") {
            result.properties[prop] = {
              type,
              items: parseSchema(items),
              description,
              required,
              example,
            };
          } else if (type === "object") {
            result.properties[prop] = {
              type,
              properties: {},
              description,
              required,
              example,
            };
          } else {
            result.properties[prop] = {
              type,
              description,
              required,
              example,
            };
          }
        }
      } else if (schema.type === "array") {
        result.items = [];
      }

      return result;
    };

    content.push(parseSchema(schema));
  } else if (contentType === "multipart/form-data") {
    content.push({
      name: "",
      description: "",
      required: false,
      example: "",
      properties: {},
    });
    for (const prop in schema.properties) {
      const property = schema.properties[prop];
      const required = schema.required.includes(prop);
      const example = property.example || "";
      const name = prop;
      const description = property.description || "";
      const type = property.type;
      const items = property.items;

      if (type === "array") {
        content[0].properties[prop] = {
          type,
          items,
          description,
          required,
        };
      } else {
        content[0].properties[prop] = {
          type,
          properties: {},
          description,
          required,
          example,
        };
      }
    }
  } else if (
    contentType === "application/xml" ||
    contentType === "text/plain"
  ) {
    content.push({
      name: "",
      description: "",
      required: false,
      example: "",
      schema: {
        type: schema.type,
      },
    });
  }

  requestBody = {
    contentType,
    content,
  };
}
            // 处理响应体
            let responseSchema =
              operation.responses["200"].content["application/json"].schema;
            const content = [];
            for (const prop in responseSchema.properties) {
              const property = responseSchema.properties[prop];
              const example = property.example || "";
              const name = prop;
              const description = property.description || "";
              const type = property.type;
              const items = property.items;

              if (type === "array") {
                content.push({
                  name,
                  description,
                  required: responseSchema.required.includes(prop),
                  example,
                  schema: {
                    type,
                    items,
                  },
                });
              } else if (type === "object") {
                const childrens = [];
                for (const childProp in property.properties) {
                  const childProperty = property.properties[childProp];
                  const childExample = childProperty.example || "";
                  const childName = childProp;
                  const childDescription = childProperty.description || "";
                  const childType = childProperty.type;
                  const childItems = childProperty.items;

                  if (childType === "array") {
                    childrens.push({
                      name: childName,
                      description: childDescription,
                      required: property.required.includes(childProp),
                      example: childExample,
                      schema: {
                        type: childType,
                        items: childItems,
                      },
                    });
                  } else {
                    childrens.push({
                      name: childName,
                      description: childDescription,
                      required: property.required.includes(childProp),
                      example: childExample,
                      schema: {
                        type: childType,
                      },
                    });
                  }
                }

                content.push({
                  name,
                  description,
                  required: responseSchema.required.includes(prop),
                  example,
                  schema: {
                    type,
                    childrens,
                  },
                });
              } else {
                content.push({
                  name,
                  description,
                  required: responseSchema.required.includes(prop),
                  example,
                  schema: {
                    type,
                  },
                });
              }
            }

            const response = {
              contentType: "application/json",
              content,
            };

            // 将接口信息添加到数组中
            console.log(
              util.inspect(
                {
                  name,
                  description,
                  requestMethod,
                  requestPath,
                  requestHeaders,
                  requestParams,
                  requestBody,
                  response,
                },
                false,
                null,
                true /* enable colors */
              )
            );
          }
        }
      })
      .catch((err) => {
        // 处理错误
        res.status(400).json({
          code: 400,
          msg: "解析文件失败!",
        });
      });
    res.status(200).json({
      code: 200,
      msg: "解析文件成功!",
      data: "http://localhost:3000/upload/" + req.file.filename,
    });
  } catch (err) {
    next(err);
  }
};
