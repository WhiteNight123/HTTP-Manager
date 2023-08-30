# HTTP-Manager 接口文档

> v1.0.0

Base URLs: http://localhost:3000

# Default

## POST 上传文件

POST /api/upload

上传swagger文件，返回解析的数据

> Body 请求参数

```yaml
file: file://C:\Users\WhiteNight\OneDrive\桌面\HTTP-Manager.openapi.json

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» file|body|string(binary)| 是 |none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "解析文件成功!",
  "data": [
    {
      "name": "注册用户",
      "description": "",
      "tag": "用户",
      "requestMethod": "POST",
      "requestPath": "/api/user",
      "requestHeaders": [],
      "requestParams": {
        "path": [],
        "query": []
      },
      "requestBody": {
        "contentType": "application/json",
        "content": [
          {
            "id": "",
            "email": "",
            "name": "",
            "password": "",
            "bio": ""
          }
        ]
      },
      "response": {
        "contentType": "application/json",
        "content": [
          {
            "code": "200"
          }
        ]
      }
    },
    {
      "name": "获取指定用户",
      "description": "",
      "tag": "用户",
      "requestMethod": "GET",
      "requestPath": "/api/user/{id}",
      "requestHeaders": [
        {
          "name": "Authorization",
          "description": "",
          "required": true,
          "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE3NDAwNzMsImV4cCI6MTY5MjYwNDA3M30.Pm7FJk52zNHReLZ-EGyS6VhMGAVfk9xYplpUhimR5e8",
          "type": "string"
        }
      ],
      "requestParams": {
        "path": [
          {
            "name": "id",
            "description": "",
            "required": true,
            "example": "64dd7b0b12844cc36edc60bc",
            "type": "string"
          }
        ],
        "query": []
      },
      "requestBody": {
        "contentType": "",
        "content": []
      },
      "response": {
        "contentType": "application/json",
        "content": [
          {
            "code": "200"
          }
        ]
      }
    },
    {
      "name": "批量添加接口",
      "description": "从上传的文件中批量导入接口",
      "tag": "接口",
      "requestMethod": "POST",
      "requestPath": "/api/interface/batch",
      "requestHeaders": [
        {
          "name": "Authorization",
          "description": "",
          "required": true,
          "example": "",
          "type": "string"
        }
      ],
      "requestParams": {
        "path": [],
        "query": []
      },
      "requestBody": {
        "contentType": "application/json",
        "content": [
          {
            "type": "",
            "projectId": "",
            "datas": [
              {
                "name": "",
                "description": "",
                "tag": "",
                "requestMethod": "",
                "requestPath": "",
                "requestHeaders": "",
                "requestParams": "",
                "requestBody": "",
                "response": ""
              }
            ]
          }
        ]
      },
      "response": {
        "contentType": "application/json",
        "content": [
          {
            "code": "200"
          }
        ]
      }
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST Mock

POST /mock/add

将接口上传，后端生成一个Mock接口

> Body 请求参数

```json
{
  "name": "string",
  "description": "string",
  "requestMethod": "string",
  "requestPath": "string",
  "requestHeaders": [
    {
      "name": "string",
      "description": "string",
      "required": "string",
      "example": "string",
      "type": "string"
    }
  ],
  "requestParams": {
    "path": [
      {
        "name": "string",
        "description": "string",
        "required": "string",
        "example": "string",
        "type": "string"
      }
    ],
    "query": [
      {
        "name": "string",
        "description": "string",
        "required": "string",
        "example": "string",
        "type": "string"
      }
    ]
  },
  "requestBody": {
    "contentType": "string",
    "content": [
      {}
    ]
  },
  "response": {
    "contentType": "string",
    "content": [
      "string"
    ]
  }
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» name|body|string| 是 | 接口名称|none|
|» description|body|string| 否 ||none|
|» requestMethod|body|string| 是 | 请求方法|none|
|» requestPath|body|string| 是 | 接口地址|none|
|» requestHeaders|body|[object]| 否 | header参数|JSON.stringify(parameter)|
|»» name|body|string| 是 | 参数名|none|
|»» description|body|string| 否 | 参数描述|none|
|»» required|body|string| 是 | 是否必须|none|
|»» example|body|string| 否 | 示例值|none|
|»» type|body|string| 是 | 类型|none|
|» requestParams|body|object| 否 | query参数|JSON.stringify(parameter)|
|»» path|body|[object]| 否 ||none|
|»»» name|body|string| 是 | 参数名|none|
|»»» description|body|string| 否 | 参数描述|none|
|»»» required|body|string| 是 | 是否必须|none|
|»»» example|body|string| 否 | 示例值|none|
|»»» type|body|string| 是 | 类型|none|
|»» query|body|[object]| 否 ||none|
|»»» name|body|string| 是 | 参数名|none|
|»»» description|body|string| 否 | 参数描述|none|
|»»» required|body|string| 是 | 是否必须|none|
|»»» example|body|string| 否 | 示例值|none|
|»»» type|body|string| 是 | 类型|none|
|» requestBody|body|object| 否 | body参数|JSON.stringify(requestBody)|
|»» contentType|body|string| 是 ||none|
|»» content|body|[object]| 是 ||none|
|» response|body|object| 否 | 返回数据|JSON.stringify(response)|
|»» contentType|body|string| 是 ||none|
|»» content|body|[string]| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "message": "success"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 用户

## POST 注册用户

POST /api/user

> Body 请求参数

```json
{
  "email": "111@qq.com",
  "name": "用户1",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» id|body|string| 否 | 用户ID|none|
|» email|body|string| 是 | 邮箱|none|
|» name|body|string| 是 | 用户名|none|
|» password|body|string| 是 | 密码|none|
|» bio|body|string| 否 | 个人简介|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "注册成功!",
  "data": {
    "email": "111@qq.com",
    "name": "用户1",
    "_id": "64dd7ae412844cc36edc60b4"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取指定用户

GET /api/user/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取用户成功!",
  "data": {
    "_id": "64dd7b0b12844cc36edc60bc",
    "email": "333@qq.com",
    "name": "用户3"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PUT 修改用户

PUT /api/user/{id}

> Body 请求参数

```json
{
  "email": "string",
  "name": "string",
  "password": "string",
  "bio": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» email|body|string| 否 | 邮箱|none|
|» name|body|string| 否 | 用户名|none|
|» password|body|string| 是 | 密码|none|
|» bio|body|string| 否 | 个人简介|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "更新用户成功!",
  "data": {
    "email": "222@qq.com",
    "name": "用户2",
    "password": "$2b$10$3tJBrncUriUBx.yRYMfhVuNWX7yxTY7JLDdv0zcLFio7ctRdZppq."
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## DELETE 删除用户

DELETE /api/user/{id}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|id|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除用户成功!",
  "data": {
    "_id": "64dd7b0b12844cc36edc60bc",
    "email": "555@qq.com",
    "name": "修改3"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 登录

POST /api/auth

> Body 请求参数

```json
{
  "email": "string",
  "password": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 否 ||none|
|» email|body|string| 是 | 邮箱|none|
|» password|body|string| 是 | 密码|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "登录成功!",
  "authoruzation": {
    "id": "64dd7ae412844cc36edc60b4",
    "name": "用户1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkN2FlNDEyODQ0Y2MzNmVkYzYwYjQiLCJpYXQiOjE2OTIyMzY2OTMsImV4cCI6MTY5MzEwMDY5M30.kd8nQuzzvnwGvtxk7tYS-JGtiyLHAjDgYXP9Tc5B6n4"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 项目

## POST 创建项目

POST /api/project

> Body 请求参数

```json
{
  "name": "string",
  "description": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» name|body|string| 是 | 项目名称|none|
|» description|body|string| 否 | 项目描述|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "创建项目成功!",
  "data": {
    "name": "项目4",
    "description": "「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。若不是「禁忌」的威胁日渐临近，她又何尝不想暂时休憩，亲眼去看看须弥的无数生灵？在心灵的净土中，她与阳光和微风作伴，与人类和动物交友，一起讲故事，做游戏，唱刚刚学会的歌…她将最美好的向往尽数倾注于梦境，但无论夜晚如何喧闹，每当白日来临，她的身畔又会重归寂静。——彻底唤醒她的，是来自「虚空」并不明显的异响。「原来是，梦中梦啊…」",
    "creator": "64dd7ae412844cc36edc60b4",
    "members": [
      "64dd7ae412844cc36edc60b4"
    ],
    "createTime": "2023-08-30T03:20:19.710Z",
    "interfaceCount": 0,
    "interfaces": [],
    "_id": "64eeb573274d449810b5d410",
    "__v": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取用户所有项目

GET /api/project

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取项目成功!",
  "data": [
    {
      "_id": "64dd7bd112844cc36edc60c4",
      "name": "项目1",
      "description": "《原神》是由米哈游自研的一款开放世界冒险RPG。你将在游戏中探索一个被称作「提瓦特」的幻想世界。在这广阔的世界中，被神选中的人将被授予「神之眼」，引导元素之力。",
      "creator": "64dd7ae412844cc36edc60b4",
      "createTime": "2023-08-17T01:45:53.606Z",
      "interfaceCount": 0
    },
    {
      "_id": "64dd7be412844cc36edc60cb",
      "name": "项目2",
      "description": "《原神》是由米哈游自研的一款开放世界冒险RPG。你将在游戏中探索一个被称作「提瓦特」的幻想世界。在这广阔的世界中，被神选中的人将被授予「神之眼」，引导元素之力。",
      "creator": "64dd7ae412844cc36edc60b4",
      "createTime": "2023-08-17T01:46:12.261Z",
      "interfaceCount": 0
    },
    {
      "_id": "64dd7be712844cc36edc60d2",
      "name": "项目3",
      "description": "《原神》是由米哈游自研的一款开放世界冒险RPG。你将在游戏中探索一个被称作「提瓦特」的幻想世界。在这广阔的世界中，被神选中的人将被授予「神之眼」，引导元素之力。",
      "creator": "64dd7ae412844cc36edc60b4",
      "createTime": "2023-08-17T01:46:15.220Z",
      "interfaceCount": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PATCH 修改项目

PATCH /api/project/{projectId}

> Body 请求参数

```json
{
  "name": "string",
  "description": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||none|
|Authorization|header|string| 否 ||none|
|body|body|object| 否 ||none|
|» name|body|string| 是 | 项目名称|none|
|» description|body|string| 否 | 项目描述|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功!",
  "data": {
    "_id": "64eeb573274d449810b5d410",
    "name": "项目44",
    "description": "「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。若不是「禁忌」的威胁日渐临近，她又何尝不想暂时休憩，亲眼去看看须弥的无数生灵？在心灵的净土中，她与阳光和微风作伴，与人类和动物交友，一起讲故事，做游戏，唱刚刚学会的歌…她将最美好的向往尽数倾注于梦境，但无论夜晚如何喧闹，每当白日来临，她的身畔又会重归寂静。——彻底唤醒她的，是来自「虚空」并不明显的异响。「原来是，梦中梦啊…」",
    "creator": "64dd7ae412844cc36edc60b4",
    "createTime": "2023-08-30T03:20:19.710Z",
    "interfaceCount": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## DELETE 删除项目

DELETE /api/project/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除项目成功!",
  "data": {
    "_id": "64dd7ff86ad9ee2abf68da50",
    "name": "项目4",
    "description": "《原神》是由米哈游自研的一款开放世界冒险RPG。你将在游戏中探索一个被称作「提瓦特」的幻想世界。在这广阔的世界中，被神选中的人将被授予「神之眼」，引导元素之力。",
    "creator": "64dd7ae412844cc36edc60b4",
    "createTime": "2023-08-17T02:03:36.918Z",
    "interfaceCount": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取指定的项目

GET /api/project/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取项目成功!",
  "data": {
    "_id": "64dd7bd112844cc36edc60c4",
    "name": "项目1",
    "description": "《原神》是由米哈游自研的一款开放世界冒险RPG。你将在游戏中探索一个被称作「提瓦特」的幻想世界。在这广阔的世界中，被神选中的人将被授予「神之眼」，引导元素之力。",
    "creator": {
      "_id": "64dd7ae412844cc36edc60b4",
      "email": "111@qq.com",
      "name": "用户1"
    },
    "members": [
      {
        "_id": "64dd7ae412844cc36edc60b4",
        "email": "111@qq.com",
        "name": "用户1",
        "auth": "admin"
      },
      {
        "_id": "64dd7b0812844cc36edc60b8",
        "email": "222@qq.com",
        "name": "用户2",
        "auth": "write"
      }
    ],
    "createTime": "2023-08-17T01:45:53.606Z",
    "interfaceCount": 3,
    "interfaces": [
      {
        "_id": "64dd7c8912844cc36edc60de",
        "name": "米哈游1",
        "requestMethod": "POST",
        "requestPath": "/afjsvglp.se/eksey",
        "projectId": "64dd7bd112844cc36edc60c4"
      },
      {
        "_id": "64dd7ca312844cc36edc60e5",
        "name": "米哈游2",
        "requestMethod": "POST",
        "requestPath": "/afjsvglp.se/eksey",
        "projectId": "64dd7bd112844cc36edc60c4"
      },
      {
        "_id": "64dd7ca612844cc36edc60ec",
        "name": "米哈游3",
        "requestMethod": "POST",
        "requestPath": "/afjsvglp.se/eksey",
        "projectId": "64dd7bd112844cc36edc60c4"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PUT 项目更改用户权限

PUT /api/project/member

> Body 请求参数

```json
{
  "userId": "string",
  "projectId": "string",
  "auth": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» userId|body|string| 是 | 用户ID|none|
|» projectId|body|string| 是 | 项目ID|none|
|» auth|body|string| 是 | 权限|管理，读写，只读|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成员权限成功!",
  "data": {
    "_id": "64dd7e6512844cc36edc612c",
    "userId": "64dd7b0812844cc36edc60b8",
    "projectId": "64dd7bd112844cc36edc60c4",
    "auth": "write"
  }
}
```

```json
{
  "code": 403,
  "msg": "您没有权限"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 项目添加成员

POST /api/project/member

> Body 请求参数

```json
{
  "userId": "string",
  "projectId": "string",
  "auth": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» userId|body|string| 是 | 用户邮箱|none|
|» projectId|body|string| 是 | 项目ID|none|
|» auth|body|string| 是 | 权限|管理，读写，只读|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成员成功!",
  "data": {
    "userId": "64dd7b0812844cc36edc60b8",
    "projectId": "64dd7bd112844cc36edc60c4",
    "auth": "write",
    "_id": "64dd7e6512844cc36edc612c",
    "__v": 0
  }
}
```

```json
{
  "code": 403,
  "msg": "您没有权限"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## DELETE 项目删除成员

DELETE /api/project/member/del

> Body 请求参数

```json
{
  "userId": "string",
  "projectId": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» userId|body|string| 是 ||none|
|» projectId|body|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成员成功!",
  "data": {
    "_id": "64dd7e6512844cc36edc612c",
    "userId": "64dd7b0812844cc36edc60b8",
    "projectId": "64dd7bd112844cc36edc60c4",
    "auth": "write"
  }
}
```

```json
{
  "code": 403,
  "msg": "您没有权限"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 接口

## POST 新建接口

POST /api/interface

> Body 请求参数

```json
{
  "name": "string",
  "description": "string",
  "tag": "string",
  "requestMethod": "string",
  "requestPath": "string",
  "requestHeaders": "string",
  "requestParams": "string",
  "requestBody": "string",
  "response": "string",
  "projectId": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» name|body|string| 是 | 接口名称|none|
|» description|body|string| 否 ||none|
|» tag|body|string| 否 | 所属目录|none|
|» requestMethod|body|string| 是 | 请求方法|none|
|» requestPath|body|string| 是 | 接口地址|none|
|» requestHeaders|body|string| 否 | header参数|JSON.stringify(parameter)|
|» requestParams|body|string| 否 | query参数|JSON.stringify(parameter)|
|» requestBody|body|string| 否 | body参数|JSON.stringify(requestBody)|
|» response|body|string| 否 | 返回数据|JSON.stringify(response)|
|» projectId|body|string| 否 | 所属项目ID|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "创建接口成功!",
  "data": {
    "name": "修改用户",
    "description": "「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。",
    "tag": "用户",
    "requestMethod": "PUT",
    "requestPath": "/api/user/{id}",
    "requestHeaders": "[\n  {\n    \"name\": \"Authorization\",\n    \"description\": \"\",\n    \"required\": true,\n    \"example\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\",\n    \"type\": \"string\"\n  }\n]",
    "requestParams": "{\n  \"path\": [\n    {\n      \"name\": \"id\",\n      \"description\": \"\",\n      \"required\": true,\n      \"example\": \"1\",\n      \"type\": \"string\"\n    }\n  ],\n  \"query\": []\n}",
    "requestBody": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {}\n  ]\n}",
    "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"code\": \"200\"\n    }\n  ]\n}",
    "projectId": "64ede114cfac09b25167d549",
    "history": [
      {
        "version": 1,
        "updatedAt": "2023-08-30T03:16:37.744Z",
        "updatedBy": "64dd7ae412844cc36edc60b4",
        "data": "{\n  \"name\": \"修改用户\",\n  \"description\": \"「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"PUT\",\n  \"requestPath\": \"/api/user/{id}\",\n  \"requestHeaders\": \"[\\n  {\\n    \\\"name\\\": \\\"Authorization\\\",\\n    \\\"description\\\": \\\"\\\",\\n    \\\"required\\\": true,\\n    \\\"example\\\": \\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\\\",\\n    \\\"type\\\": \\\"string\\\"\\n  }\\n]\",\n  \"requestParams\": \"{\\n  \\\"path\\\": [\\n    {\\n      \\\"name\\\": \\\"id\\\",\\n      \\\"description\\\": \\\"\\\",\\n      \\\"required\\\": true,\\n      \\\"example\\\": \\\"1\\\",\\n      \\\"type\\\": \\\"string\\\"\\n    }\\n  ],\\n  \\\"query\\\": []\\n}\",\n  \"requestBody\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {}\\n  ]\\n}\",\n  \"response\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {\\n      \\\"code\\\": \\\"200\\\"\\n    }\\n  ]\\n}\",\n  \"projectId\": \"64ede114cfac09b25167d549\"\n}",
        "_id": "64eeb495274d449810b5d3f6"
      }
    ],
    "_id": "64eeb495274d449810b5d3f5",
    "__v": 0
  }
}
```

```json
{
  "code": 403,
  "msg": "您没有权限"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PATCH 更改接口

PATCH /api/interface/{interfaceId}

修改接口说明

> Body 请求参数

```json
{
  "name": "string",
  "description": "string",
  "tag": "string",
  "requestMethod": "string",
  "requestPath": "string",
  "requestHeaders": "string",
  "requestParams": "string",
  "requestBody": "string",
  "response": "string",
  "projectId": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|interfaceId|path|string| 是 ||接口Id|
|Authorization|header|string| 是 ||必选token|
|body|body|object| 否 ||none|
|» name|body|string| 是 | 接口名称|none|
|» description|body|string| 否 ||none|
|» tag|body|string| 否 | 所属目录|none|
|» requestMethod|body|string| 是 | 请求方法|none|
|» requestPath|body|string| 是 | 接口地址|none|
|» requestHeaders|body|string| 否 | header参数|JSON.stringify(parameter)|
|» requestParams|body|string| 否 | query参数|JSON.stringify(parameter)|
|» requestBody|body|string| 否 | body参数|JSON.stringify(requestBody)|
|» response|body|string| 否 | 返回数据|JSON.stringify(response)|
|» projectId|body|string| 否 | 所属项目ID|none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "更新接口成功!",
  "data": {
    "_id": "64eeb495274d449810b5d3f5",
    "name": "修改用户",
    "description": "222「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。",
    "tag": "用户",
    "requestMethod": "PUT",
    "requestPath": "/api/user/{id}",
    "requestHeaders": "[\n  {\n    \"name\": \"Authorization\",\n    \"description\": \"\",\n    \"required\": true,\n    \"example\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\",\n    \"type\": \"string\"\n  }\n]",
    "requestParams": "{\n  \"path\": [\n    {\n      \"name\": \"id\",\n      \"description\": \"\",\n      \"required\": true,\n      \"example\": \"1\",\n      \"type\": \"string\"\n    }\n  ],\n  \"query\": []\n}",
    "requestBody": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {}\n  ]\n}",
    "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"code\": \"200\"\n    }\n  ]\n}",
    "projectId": "64ede114cfac09b25167d549"
  }
}
```

```json
{
  "code": 200,
  "msg": "更新接口成功!",
  "data": {
    "_id": "64dd7ca612844cc36edc60ec",
    "name": "米哈游33",
    "description": "米哈游成立于2011年，致力于为用户提供美好的、超出预期的产品与内容。",
    "requestMethod": "POST",
    "requestPath": "/afjsvglp.se/eksey",
    "requestHeaders": "esse sunt officia occaecat",
    "requestParams": "exercitation sint proident commodo",
    "requestBody": "ea dolor",
    "response": "Ut",
    "projectId": "64dd7bd112844cc36edc60c4"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## DELETE 删除接口

DELETE /api/interface/{interfaceId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|interfaceId|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除接口成功!",
  "data": {
    "_id": "64dd7ca312844cc36edc60e5",
    "name": "米哈游2",
    "requestMethod": "POST",
    "requestPath": "/afjsvglp.se/eksey",
    "projectId": "64dd7bd112844cc36edc60c4"
  }
}
```

```json
{
  "code": 403,
  "msg": "您没有权限"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取指定接口

GET /api/interface/{interfaceId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|interfaceId|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取接口成功!",
  "data": {
    "name": "更改接口",
    "description": "修改接口说明",
    "tag": "接口",
    "requestMethod": "PATCH",
    "requestPath": "/api/interface/:interfaceId",
    "requestHeaders": "[\n  {\n    \"name\": \"Authorization\",\n    \"description\": \"必选token\",\n    \"required\": true,\n    \"example\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\",\n    \"type\": \"string\"\n  }\n]",
    "requestParams": "{\n  \"path\": [\n    {\n      \"name\": \"interfaceId\",\n      \"description\": \"接口Id\",\n      \"required\": true,\n      \"example\": \"64d782b65239aaa91333922f\",\n      \"type\": \"string\"\n    }\n  ],\n  \"query\": []\n}",
    "requestBody": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {}\n  ]\n}",
    "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"id\": \"\",\n      \"name\": \"\",\n      \"description\": \"\",\n      \"requestMethod\": \"\",\n      \"requestPath\": \"\",\n      \"requestHeaders\": \"\",\n      \"requestParams\": \"\",\n      \"requestBody\": \"\",\n      \"response\": \"\",\n      \"projectId\": \"\",\n      \"code\": \"200\"\n    }\n  ]\n}",
    "projectId": "64e1da182d845c0e02cc6811",
    "history": [
      {
        "version": 1,
        "updatedAt": "2023-08-25T13:11:26.701Z",
        "updatedBy": "64dd7ae412844cc36edc60b4",
        "data": "{\n  \"name\": \"更改接口\",\n  \"description\": \"修改接口说明\",\n  \"tag\": \"接口\",\n  \"requestMethod\": \"PATCH\",\n  \"requestPath\": \"/api/interface/:interfaceId\",\n  \"requestHeaders\": [\n    {\n      \"name\": \"Authorization\",\n      \"description\": \"必选token\",\n      \"required\": true,\n      \"example\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\",\n      \"type\": \"string\"\n    }\n  ],\n  \"requestParams\": {\n    \"path\": [\n      {\n        \"name\": \"interfaceId\",\n        \"description\": \"接口Id\",\n        \"required\": true,\n        \"example\": \"64d782b65239aaa91333922f\",\n        \"type\": \"string\"\n      }\n    ],\n    \"query\": []\n  },\n  \"requestBody\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {}\n    ]\n  },\n  \"response\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {\n        \"id\": \"\",\n        \"name\": \"\",\n        \"description\": \"\",\n        \"requestMethod\": \"\",\n        \"requestPath\": \"\",\n        \"requestHeaders\": \"\",\n        \"requestParams\": \"\",\n        \"requestBody\": \"\",\n        \"response\": \"\",\n        \"projectId\": \"\",\n        \"code\": \"200\"\n      }\n    ]\n  }\n}",
        "_id": "64e8a87e89412f63b9437e62"
      }
    ],
    "_id": "64e8a87e89412f63b9437e61",
    "__v": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 获取项目的所有接口

GET /api/interface/project/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取接口成功!",
  "data": [
    {
      "_id": "64dd7c8912844cc36edc60de",
      "name": "米哈游1",
      "requestMethod": "POST",
      "requestPath": "/afjsvglp.se/eksey",
      "projectId": "64dd7bd112844cc36edc60c4"
    },
    {
      "_id": "64dd7ca312844cc36edc60e5",
      "name": "米哈游2",
      "requestMethod": "POST",
      "requestPath": "/afjsvglp.se/eksey",
      "projectId": "64dd7bd112844cc36edc60c4"
    },
    {
      "_id": "64dd7ca612844cc36edc60ec",
      "name": "米哈游3333",
      "requestMethod": "POST",
      "requestPath": "/afjsvglp.se/eksey",
      "projectId": "64dd7bd112844cc36edc60c4"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询历史版本

GET /api/interface/{interfaceId}/history

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|interfaceId|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取接口的历史版本成功!",
  "data": [
    {
      "version": 2,
      "updatedAt": "2023-08-30T03:17:32.587Z",
      "updatedBy": {
        "bio": "这是一段很神秘的个人简介~",
        "_id": "64dd7ae412844cc36edc60b4",
        "email": "111@qq.com",
        "name": "用户1"
      },
      "data": "{\n  \"name\": \"修改用户\",\n  \"description\": \"222「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"PUT\",\n  \"requestPath\": \"/api/user/{id}\",\n  \"requestHeaders\": \"[\\n  {\\n    \\\"name\\\": \\\"Authorization\\\",\\n    \\\"description\\\": \\\"\\\",\\n    \\\"required\\\": true,\\n    \\\"example\\\": \\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\\\",\\n    \\\"type\\\": \\\"string\\\"\\n  }\\n]\",\n  \"requestParams\": \"{\\n  \\\"path\\\": [\\n    {\\n      \\\"name\\\": \\\"id\\\",\\n      \\\"description\\\": \\\"\\\",\\n      \\\"required\\\": true,\\n      \\\"example\\\": \\\"1\\\",\\n      \\\"type\\\": \\\"string\\\"\\n    }\\n  ],\\n  \\\"query\\\": []\\n}\",\n  \"requestBody\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {}\\n  ]\\n}\",\n  \"response\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {\\n      \\\"code\\\": \\\"200\\\"\\n    }\\n  ]\\n}\",\n  \"projectId\": \"64ede114cfac09b25167d549\"\n}",
      "_id": "64eeb4cc274d449810b5d3ff"
    },
    {
      "version": 1,
      "updatedAt": "2023-08-30T03:16:37.744Z",
      "updatedBy": {
        "bio": "这是一段很神秘的个人简介~",
        "_id": "64dd7ae412844cc36edc60b4",
        "email": "111@qq.com",
        "name": "用户1"
      },
      "data": "{\n  \"name\": \"修改用户\",\n  \"description\": \"「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"PUT\",\n  \"requestPath\": \"/api/user/{id}\",\n  \"requestHeaders\": \"[\\n  {\\n    \\\"name\\\": \\\"Authorization\\\",\\n    \\\"description\\\": \\\"\\\",\\n    \\\"required\\\": true,\\n    \\\"example\\\": \\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\\\",\\n    \\\"type\\\": \\\"string\\\"\\n  }\\n]\",\n  \"requestParams\": \"{\\n  \\\"path\\\": [\\n    {\\n      \\\"name\\\": \\\"id\\\",\\n      \\\"description\\\": \\\"\\\",\\n      \\\"required\\\": true,\\n      \\\"example\\\": \\\"1\\\",\\n      \\\"type\\\": \\\"string\\\"\\n    }\\n  ],\\n  \\\"query\\\": []\\n}\",\n  \"requestBody\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {}\\n  ]\\n}\",\n  \"response\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {\\n      \\\"code\\\": \\\"200\\\"\\n    }\\n  ]\\n}\",\n  \"projectId\": \"64ede114cfac09b25167d549\"\n}",
      "_id": "64eeb495274d449810b5d3f6"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## PUT 回滚到历史版本

PUT /api/interface/{interfaceId}/history/{historyId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|interfaceId|path|string| 是 ||none|
|historyId|path|string| 是 ||none|
|Authorization|header|string| 是 ||none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "回滚接口成功!",
  "data": {
    "_id": "64eeb495274d449810b5d3f5",
    "name": "修改用户",
    "description": "「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。",
    "tag": "用户",
    "requestMethod": "PUT",
    "requestPath": "/api/user/{id}",
    "requestHeaders": "[\n  {\n    \"name\": \"Authorization\",\n    \"description\": \"\",\n    \"required\": true,\n    \"example\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\",\n    \"type\": \"string\"\n  }\n]",
    "requestParams": "{\n  \"path\": [\n    {\n      \"name\": \"id\",\n      \"description\": \"\",\n      \"required\": true,\n      \"example\": \"1\",\n      \"type\": \"string\"\n    }\n  ],\n  \"query\": []\n}",
    "requestBody": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {}\n  ]\n}",
    "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"code\": \"200\"\n    }\n  ]\n}",
    "projectId": "64ede114cfac09b25167d549",
    "history": [
      {
        "version": 1,
        "updatedAt": "2023-08-30T03:16:37.744Z",
        "updatedBy": "64dd7ae412844cc36edc60b4",
        "data": "{\n  \"name\": \"修改用户\",\n  \"description\": \"「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"PUT\",\n  \"requestPath\": \"/api/user/{id}\",\n  \"requestHeaders\": \"[\\n  {\\n    \\\"name\\\": \\\"Authorization\\\",\\n    \\\"description\\\": \\\"\\\",\\n    \\\"required\\\": true,\\n    \\\"example\\\": \\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\\\",\\n    \\\"type\\\": \\\"string\\\"\\n  }\\n]\",\n  \"requestParams\": \"{\\n  \\\"path\\\": [\\n    {\\n      \\\"name\\\": \\\"id\\\",\\n      \\\"description\\\": \\\"\\\",\\n      \\\"required\\\": true,\\n      \\\"example\\\": \\\"1\\\",\\n      \\\"type\\\": \\\"string\\\"\\n    }\\n  ],\\n  \\\"query\\\": []\\n}\",\n  \"requestBody\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {}\\n  ]\\n}\",\n  \"response\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {\\n      \\\"code\\\": \\\"200\\\"\\n    }\\n  ]\\n}\",\n  \"projectId\": \"64ede114cfac09b25167d549\"\n}",
        "_id": "64eeb495274d449810b5d3f6"
      },
      {
        "version": 2,
        "updatedAt": "2023-08-30T03:17:32.587Z",
        "updatedBy": "64dd7ae412844cc36edc60b4",
        "data": "{\n  \"name\": \"修改用户\",\n  \"description\": \"222「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"PUT\",\n  \"requestPath\": \"/api/user/{id}\",\n  \"requestHeaders\": \"[\\n  {\\n    \\\"name\\\": \\\"Authorization\\\",\\n    \\\"description\\\": \\\"\\\",\\n    \\\"required\\\": true,\\n    \\\"example\\\": \\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\\\",\\n    \\\"type\\\": \\\"string\\\"\\n  }\\n]\",\n  \"requestParams\": \"{\\n  \\\"path\\\": [\\n    {\\n      \\\"name\\\": \\\"id\\\",\\n      \\\"description\\\": \\\"\\\",\\n      \\\"required\\\": true,\\n      \\\"example\\\": \\\"1\\\",\\n      \\\"type\\\": \\\"string\\\"\\n    }\\n  ],\\n  \\\"query\\\": []\\n}\",\n  \"requestBody\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {}\\n  ]\\n}\",\n  \"response\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {\\n      \\\"code\\\": \\\"200\\\"\\n    }\\n  ]\\n}\",\n  \"projectId\": \"64ede114cfac09b25167d549\"\n}",
        "_id": "64eeb4cc274d449810b5d3ff"
      },
      {
        "version": 3,
        "updatedAt": "2023-08-30T03:19:07.334Z",
        "updatedBy": "64dd7ae412844cc36edc60b4",
        "data": "{\n  \"name\": \"修改用户\",\n  \"description\": \"「小吉祥草王」深居净善宫内，向来不受重视，也很少被人提及。\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"PUT\",\n  \"requestPath\": \"/api/user/{id}\",\n  \"requestHeaders\": \"[\\n  {\\n    \\\"name\\\": \\\"Authorization\\\",\\n    \\\"description\\\": \\\"\\\",\\n    \\\"required\\\": true,\\n    \\\"example\\\": \\\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4\\\",\\n    \\\"type\\\": \\\"string\\\"\\n  }\\n]\",\n  \"requestParams\": \"{\\n  \\\"path\\\": [\\n    {\\n      \\\"name\\\": \\\"id\\\",\\n      \\\"description\\\": \\\"\\\",\\n      \\\"required\\\": true,\\n      \\\"example\\\": \\\"1\\\",\\n      \\\"type\\\": \\\"string\\\"\\n    }\\n  ],\\n  \\\"query\\\": []\\n}\",\n  \"requestBody\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {}\\n  ]\\n}\",\n  \"response\": \"{\\n  \\\"contentType\\\": \\\"application/json\\\",\\n  \\\"content\\\": [\\n    {\\n      \\\"code\\\": \\\"200\\\"\\n    }\\n  ]\\n}\",\n  \"projectId\": \"64ede114cfac09b25167d549\"\n}",
        "_id": "64eeb52b274d449810b5d40a"
      }
    ]
  }
}
```

```json
{
  "code": 403,
  "msg": "您没有权限"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 批量添加接口

POST /api/interface/batch

从上传的文件中批量导入接口

> Body 请求参数

```json
{
  "type": "string",
  "projectId": "string",
  "datas": [
    {
      "name": "string",
      "description": "string",
      "tag": "string",
      "requestMethod": "string",
      "requestPath": "string",
      "requestHeaders": "string",
      "requestParams": "string",
      "requestBody": "string",
      "response": "string"
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 是 ||none|
|body|body|object| 否 ||none|
|» type|body|string| 是 | 类型|强制覆盖，追加模式|
|» projectId|body|string| 是 | 项目Id|none|
|» datas|body|[object]| 是 ||none|
|»» name|body|string| 是 | 接口名称|none|
|»» description|body|string| 否 ||none|
|»» tag|body|string| 否 | 所属目录|none|
|»» requestMethod|body|string| 是 | 请求方法|none|
|»» requestPath|body|string| 是 | 接口地址|none|
|»» requestHeaders|body|string| 否 | header参数|JSON.stringify(parameter)|
|»» requestParams|body|string| 否 | query参数|JSON.stringify(parameter)|
|»» requestBody|body|string| 否 | body参数|JSON.stringify(requestBody)|
|»» response|body|string| 否 | 返回数据|JSON.stringify(response)|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "批量创建接口成功!",
  "data": [
    {
      "name": "注册用户",
      "description": "",
      "tag": "用户",
      "requestMethod": "POST",
      "requestPath": "/api/user",
      "requestHeaders": "[]",
      "requestParams": "{\n  \"path\": [],\n  \"query\": []\n}",
      "requestBody": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {}\n  ]\n}",
      "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"code\": \"200\"\n    }\n  ]\n}",
      "projectId": "64e1da182d845c0e02cc6811",
      "history": [
        {
          "version": 1,
          "updatedAt": "2023-08-25T13:11:26.696Z",
          "updatedBy": "64dd7ae412844cc36edc60b4",
          "data": "{\n  \"name\": \"注册用户\",\n  \"description\": \"\",\n  \"tag\": \"用户\",\n  \"requestMethod\": \"POST\",\n  \"requestPath\": \"/api/user\",\n  \"requestHeaders\": [],\n  \"requestParams\": {\n    \"path\": [],\n    \"query\": []\n  },\n  \"requestBody\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {}\n    ]\n  },\n  \"response\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {\n        \"code\": \"200\"\n      }\n    ]\n  }\n}",
          "_id": "64e8a87e89412f63b9437e5c"
        }
      ],
      "_id": "64e8a87e89412f63b9437e5b",
      "__v": 0
    },
    {
      "name": "上传文件",
      "description": "上传swagger文件，返回解析的数据",
      "tag": "",
      "requestMethod": "POST",
      "requestPath": "/api/upload",
      "requestHeaders": "[]",
      "requestParams": "{\n  \"path\": [],\n  \"query\": []\n}",
      "requestBody": "{\n  \"contentType\": \"form-data\",\n  \"content\": [\n    {\n      \"name\": \"file\",\n      \"description\": \"\",\n      \"required\": true,\n      \"example\": \"file://C:\\\\Users\\\\WhiteNight\\\\OneDrive\\\\桌面\\\\HTTP-Manager.openapi.json\",\n      \"type\": \"string\"\n    }\n  ]\n}",
      "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"code\": \"200\"\n    }\n  ]\n}",
      "projectId": "64e1da182d845c0e02cc6811",
      "history": [
        {
          "version": 1,
          "updatedAt": "2023-08-25T13:11:26.699Z",
          "updatedBy": "64dd7ae412844cc36edc60b4",
          "data": "{\n  \"name\": \"上传文件\",\n  \"description\": \"上传swagger文件，返回解析的数据\",\n  \"tag\": \"\",\n  \"requestMethod\": \"POST\",\n  \"requestPath\": \"/api/upload\",\n  \"requestHeaders\": [],\n  \"requestParams\": {\n    \"path\": [],\n    \"query\": []\n  },\n  \"requestBody\": {\n    \"contentType\": \"form-data\",\n    \"content\": [\n      {\n        \"name\": \"file\",\n        \"description\": \"\",\n        \"required\": true,\n        \"example\": \"file://C:\\\\Users\\\\WhiteNight\\\\OneDrive\\\\桌面\\\\HTTP-Manager.openapi.json\",\n        \"type\": \"string\"\n      }\n    ]\n  },\n  \"response\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {\n        \"code\": \"200\"\n      }\n    ]\n  }\n}",
          "_id": "64e8a87e89412f63b9437e5f"
        }
      ],
      "_id": "64e8a87e89412f63b9437e5e",
      "__v": 0
    },
    {
      "name": "Mock",
      "description": "将接口上传，后端生成一个Mock接口",
      "tag": "",
      "requestMethod": "POST",
      "requestPath": "/mock/add",
      "requestHeaders": "[]",
      "requestParams": "{\n  \"path\": [],\n  \"query\": []\n}",
      "requestBody": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {}\n  ]\n}",
      "response": "{\n  \"contentType\": \"application/json\",\n  \"content\": [\n    {\n      \"code\": \"200\"\n    }\n  ]\n}",
      "projectId": "64e1da182d845c0e02cc6811",
      "history": [
        {
          "version": 1,
          "updatedAt": "2023-08-25T13:11:26.703Z",
          "updatedBy": "64dd7ae412844cc36edc60b4",
          "data": "{\n  \"name\": \"Mock\",\n  \"description\": \"将接口上传，后端生成一个Mock接口\",\n  \"tag\": \"\",\n  \"requestMethod\": \"POST\",\n  \"requestPath\": \"/mock/add\",\n  \"requestHeaders\": [],\n  \"requestParams\": {\n    \"path\": [],\n    \"query\": []\n  },\n  \"requestBody\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {}\n    ]\n  },\n  \"response\": {\n    \"contentType\": \"application/json\",\n    \"content\": [\n      {\n        \"code\": \"200\"\n      }\n    ]\n  }\n}",
          "_id": "64e8a87e89412f63b9437e65"
        }
      ],
      "_id": "64e8a87e89412f63b9437e64",
      "__v": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 数据模型

## user-project

<a id="schemauser-project"></a>
<a id="schema_user-project"></a>
<a id="tocSuser-project"></a>
<a id="tocsuser-project"></a>

```json
{
  "id": "string",
  "userId": "string",
  "projectId": "string",
  "auth": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none||none|
|userId|string|true|none|用户ID|none|
|projectId|string|true|none|项目ID|none|
|auth|string|true|none|权限|管理，读写，只读|

## history

<a id="schemahistory"></a>
<a id="schema_history"></a>
<a id="tocShistory"></a>
<a id="tocshistory"></a>

```json
{
  "id": "string",
  "updatedAt": "string",
  "updatedBy": "string",
  "data": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none|更改历史ID|none|
|updatedAt|string|false|none|更新时间|none|
|updatedBy|string|true|none||none|
|data|string|true|none|所有数据|JSON.stringify(interface)|

## parameter

<a id="schemaparameter"></a>
<a id="schema_parameter"></a>
<a id="tocSparameter"></a>
<a id="tocsparameter"></a>

```json
{
  "name": "string",
  "description": "string",
  "required": "string",
  "example": "string",
  "type": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|name|string|true|none|参数名|none|
|description|string|false|none|参数描述|none|
|required|string|true|none|是否必须|none|
|example|string|false|none|示例值|none|
|type|string|true|none|类型|none|

## interface

<a id="schemainterface"></a>
<a id="schema_interface"></a>
<a id="tocSinterface"></a>
<a id="tocsinterface"></a>

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "tag": "string",
  "requestMethod": "string",
  "requestPath": "string",
  "requestHeaders": "string",
  "requestParams": "string",
  "requestBody": "string",
  "response": "string",
  "projectId": "string",
  "historys": [
    {
      "version": "string",
      "updatedAt": "string",
      "updatedBy": {
        "id": "string",
        "email": "string",
        "name": "string",
        "bio": "string"
      },
      "data": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none|接口ID|none|
|name|string|true|none|接口名称|none|
|description|string|false|none||none|
|tag|string|false|none|所属目录|none|
|requestMethod|string|true|none|请求方法|none|
|requestPath|string|true|none|接口地址|none|
|requestHeaders|string|false|none|header参数|JSON.stringify(parameter)|
|requestParams|string|false|none|query参数|JSON.stringify(parameter)|
|requestBody|string|false|none|body参数|JSON.stringify(requestBody)|
|response|string|false|none|返回数据|JSON.stringify(response)|
|projectId|string|false|none|所属项目ID|none|
|historys|[object]|false|none|更改历史|该接口的更改历史记录|
|» version|string|true|none||none|
|» updatedAt|string|false|none||none|
|» updatedBy|object|true|none||none|
|»» id|string|false|none|用户ID|none|
|»» email|string|true|none|邮箱|none|
|»» name|string|true|none|用户名|none|
|»» bio|string|false|none|个人简介|none|
|» data|string|true|none||none|

## project

<a id="schemaproject"></a>
<a id="schema_project"></a>
<a id="tocSproject"></a>
<a id="tocsproject"></a>

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "creator": "string",
  "members": [
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "bio": "string"
    }
  ],
  "createTime": "string",
  "interfaceCount": 0,
  "interfaces": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "tag": "string",
      "requestMethod": "string",
      "requestPath": "string",
      "requestHeaders": "string",
      "requestParams": "string",
      "requestBody": "string",
      "response": "string",
      "projectId": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none|项目ID|none|
|name|string|true|none|项目名称|none|
|description|string|false|none|项目描述|none|
|creator|string|false|none|项目创建者ID|none|
|members|[object]|false|none|项目成员|该项目含有的用户|
|» id|string|false|none|用户ID|none|
|» email|string|true|none|邮箱|none|
|» name|string|true|none|用户名|none|
|» bio|string|false|none|个人简介|none|
|createTime|string|false|none|创建时间|none|
|interfaceCount|integer|false|none|接口数量|none|
|interfaces|[object]|false|none|接口列表|该项目含有的接口|
|» id|string|false|none|接口ID|none|
|» name|string|true|none|接口名称|none|
|» description|string|false|none||none|
|» tag|string|false|none|所属目录|none|
|» requestMethod|string|true|none|请求方法|none|
|» requestPath|string|true|none|接口地址|none|
|» requestHeaders|string|false|none|header参数|JSON.stringify(parameter)|
|» requestParams|string|false|none|query参数|JSON.stringify(parameter)|
|» requestBody|string|false|none|body参数|JSON.stringify(requestBody)|
|» response|string|false|none|返回数据|JSON.stringify(response)|
|» projectId|string|false|none|所属项目ID|none|

## user

<a id="schemauser"></a>
<a id="schema_user"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "password": "string",
  "bio": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string|false|none|用户ID|none|
|email|string|true|none|邮箱|none|
|name|string|true|none|用户名|none|
|password|string|true|none|密码|none|
|bio|string|false|none|个人简介|none|

