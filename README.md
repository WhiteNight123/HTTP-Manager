#   API 接口管理平台

## 项目名称

API 接口管理平台

## 项目简介

随着互联网的发展，接口管理变得越来越重要。API 接口管理平台为项目管理员，开发人员和测试人员提供了一个高效的工具，用于管理、测试和模拟 HTTP 接口。 

## 项目组分工

项目 2 组，成员为郭晓强、何坤屹。分工如下：

- 郭晓强：用户模块，接口模块，整体框架。
- 何坤屹：项目模块，测试，文档。

## 技术选型

- **前端框架**：Vue3 + Element Plus
- **后端框架**：NodeJS + express
- **数据库**：MongoDB                        

## 运行项目

### 前端

```bash
# 安装依赖
npm install
# 运行
npm run dev
```

### 后端

后端在[/server](https://github.com/WhiteNight123/HTTP-Manager/tree/main/server)目录下

```bash
# 切换到server目录下
cd server
# 安装依赖
npm install
# 运行
nodemon app.js
```

---

## 项目架构

项目功能结构图

<img src="https://s2.loli.net/2023/12/17/f5aqoxCPtILg9X4.png" alt="功能模块图" width="800px"/>   

用例图     

<img src="https://s2.loli.net/2023/12/17/gdP7ltkw4ZrFSai.png" alt="用例图" width="600px"/>     

全局类图

<img src="https://s2.loli.net/2023/12/17/qNtAlpoG5O8BDEf.png" alt="全局类图" width="800px"/>

### 前端

前端架构图

```mermaid
graph TB
  vue["前端"]
  index["index.html"]
  package["package.json"]
  src["src"]
  public["public"]
  App["App.vue"]
  api["api"]
  assets["assets"]
  components["components"]
  main["main.js"]
  router["router"]
  store["store"]
  views["views"]
  vite["vite.config.js"]
  vue --> index
  vue --> package
  vue --> src
  vue -->public
  vue --> vite
  src --> App
  src --> api
  src --> assets
  src --> components
  src --> main
  src --> router
  src --> store
  src --> views
```

```bash
├── README.md                 # 项目的说明文档
├── index.html                # 主HTML文件，Vue应用的入口点
├── package-lock.json         
├── package.json              # 项目依赖、脚本等
├── public                    # 公共文件目录，存放静态资源
│   ├── cqupt.svg            
│   └── vue.svg              
├── src                       
│   ├── App.vue               # 主Vue组件
│   ├── api                   # API请求相关的目录
│   │   ├── interface.js      # 接口相关的API请求
│   │   ├── project.js        # 项目相关的API请求
│   │   ├── request.js        # API请求的基础配置
│   │   └── user.js           # 用户相关的API请求
│   ├── assets                # 资源目录，如图片、样式等
│   │   ├── css               
│   │   │   └── reset.css     # 重置样式文件
│   │   └── img               # 图片目录
│   │       ├── 404.svg       
│   │       ├── cqupt.svg     
│   │       ├── history.svg   
│   │       ├── vue.svg       
│   │       └── welcome.svg   
│   ├── components            # Vue组件目录
│   │   ├── Header.vue        # 头部组件
│   │   ├── History.vue       # 历史组件
│   │   └── Interface.vue     # 接口组件
│   ├── main.js               # Vue应用的主入口文件
│   ├── router                # 路由配置目录
│   │   └── index.js          # 主路由配置文件
│   ├── store                 # Vuex状态管理目录
│   │   ├── index.js          # Vuex的主入口文件
│   │   ├── interface.js      # 接口相关的状态管理
│   │   ├── project.js        # 项目相关的状态管理
│   │   └── user.js           # 用户相关的状态管理
│   ├── style.css             # 主样式文件
│   └── views                 # Vue页面组件目录
│       ├── 404.vue           # 404页面组件
│       ├── Dashboard.vue     # 仪表盘页面组件
│       ├── Home.vue          # 主页组件
│       ├── InterfaceTree.vue # 接口树页面组件
│       ├── Login.vue         # 登录页面组件
│       ├── Members.vue       # 成员页面组件
│       ├── My.vue            # 个人页面组件
│       ├── Projects.vue      # 项目页面组件
│       ├── Register.vue      # 注册页面组件
│       └── Welcome.vue       # 欢迎页面组件
└── vite.config.js            # Vite的配置文件
```

### 后端

后端架构图

```mermaid
graph TB
  app["app.js"]
  config["config"]
  controller["controller"]
  middleware["middleware"]
  mock["mock"]
  model["model"]
  package["package.json"]
  public["public"]
  routes["routes"]
  utils["utils"]
  app --> config
  app --> controller
  app --> middleware
  app --> mock
  app --> model
  app --> package
  app --> public
  app --> routes
  app --> utils
```

```bash
├── README.md                 # 后端接口文档
├── app.js                    # 应用的主入口文件
├── config                    # 配置文件目录
│   └── index.js              # 主配置文件
├── controller                # 控制器目录，处理业务逻辑
│   ├── auth.js               # 认证相关的控制器
│   ├── interface.js          # 接口相关的控制器
│   ├── project.js            # 项目相关的控制器
│   ├── upload.js             # 文件上传相关的控制器
│   └── user.js               # 用户相关的控制器
├── middleware                # 中间件目录，用于处理请求前或响应后的操作
│   ├── auth.js               # 认证相关的中间件
│   ├── checkpermission.js    # 权限检查的中间件
│   ├── error.js              # 错误处理的中间件
│   └── validate.js           # 数据验证的中间件
├── mock                      # 模拟数据或模拟服务的目录
│   └── mock.js               # 模拟数据的主文件
├── model                     # 数据模型目录，定义数据结构和与数据库的交互
│   ├── index.js              # 数据模型的入口文件
│   ├── interface.js          # 接口相关的数据模型
│   ├── project.js            # 项目相关的数据模型
│   ├── user-project.js       # 用户和项目关联的数据模型
│   └── user.js               # 用户相关的数据模型
├── package-lock.json         
├── package.json              # 项目依赖、脚本等
├── public                    # 公共文件目录，如静态资源
│   └── upload                # 上传文件的存储目录
├── routes                    # 路由目录，定义URL路径与处理函数的映射
│   ├── auth.js               # 认证相关的路由
│   ├── index.js              # 路由的主入口文件
│   ├── interface.js          # 接口相关的路由
│   ├── mock.js               # 模拟数据的路由
│   ├── project.js            # 项目相关的路由
│   ├── upload.js             # 文件上传相关的路由
│   └── user.js               # 用户相关的路由
└── utils                     # 实用工具目录，如工具函数、常量等
```

## 主要功能

### 项目管理

- **创建项目**：项目管理员可以创建新的项目，并指定项目名称、描述等。
- **修改项目**：项目管理员可以修改项目的基本信息和为成员配置权限。
- **删除项目**：项目管理员可以删除项目及其相关信息。
- **查看项目**：项目成员可以查看项目列表和项目详情。

### 接口管理

- **创建接口**：开发人员可以在项目中创建新的接口。
- **导入接口**：支持导入 [swagger](https://swagger.io/) 文档，并解析接口信息。
- **修改接口**：开发人员可以修改接口信息，并记录变更日志。
- **删除接口**：开发人员可以删除接口及其相关信息。
- **查看接口**：项目成员可以查看接口列表和接口详情。
- **复杂数据结构**：支持返回复杂的数据结构，如数组、对象等。

### 接口 Mock 服务

- **数据格式支持**：支持 JSON、XML、YAML等格式。
- **HTTP 请求方式**：支持 GET、POST、PUT、DELETE、PATCH 等请求方式。
- **参数匹配和响应规则**：支持参数匹配和设置响应规则。
- **动态 Mock 数据**：支持动态生成 Mock 数据和随机响应码。
- **复杂数据结构**：支持返回复杂的数据结构，如数组、对象等。

---

## 界面描述

### 登录界面

<img src="https://s2.loli.net/2023/12/13/xS6me9DWHrY1jZL.png" alt="登陆界面" width="400px" />

- **功能描述**：
  此界面为用户的入口，提供登录功能。用户可以通过输入已注册的邮箱和密码进行登录。对于新用户，界面还提供了一个注册按钮，允许他们创建新账户。
- **主要元素**：

  - **邮箱输入框**：用户输入注册时使用的邮箱地址。
  - **密码输入框**：用户输入对应的密码。
  - **登录按钮**：点击后，系统将验证邮箱和密码的正确性，正确则进入项目列表界面。
    <img src="https://s2.loli.net/2023/12/13/si9BgQcuSI6H25l.png" alt="注册界面" width="400px"/>
  - **注册按钮**：点击后，用户将被引导到注册界面。

---

### 项目列表界面

<img src="https://s2.loli.net/2023/12/13/ZNqdERFgvPIj41n.png" alt="项目列表界面" width="800px" />

- **功能描述**：
  此界面展示了用户所创建或参与的所有项目。用户可以一目了然地查看所有项目，并可以创建新的项目。每个项目都可以点击，进入其详细页面。
- **主要元素**：

  - **项目列表**：以列表形式展示用户的所有项目，每个项目条目显示项目名称，项目描述，创建者，创建时间和接口数量。
    <img src="https://s2.loli.net/2023/12/13/DaCGAIPNdjctLoK.png" alt="项目列表界面" width="400px"/>
  - **创建项目按钮**：点击后，用户将被引导到项目创建界面。

---

### 项目详情界面

<img src="https://s2.loli.net/2023/12/13/g1TOYlCaLpoPEyV.png" alt="项目详情界面" width="800px"/>

- **功能描述**：
  在此界面，用户可以查看特定项目的详细信息，如创建时间、创建者、接口数量和参与项目的成员数量。除了查看功能，用户还可以进行一系列操作，如导入新的接口、修改项目信息或删除项目。下面还有两个可视化图表，展示了接口种类，项目人员类型。
- **主要元素**：

  - **项目名称**：显示项目的名称。
  - **创建时间**：显示项目的创建日期和时间。
  - **创建者**：显示创建该项目的用户。
  - **接口数量**：显示该项目中的接口数量。
  - **成员数量**：显示参与该项目的成员数量。
  - **导入接口按钮**：点击后，用户将被引导到导入接口界面。
    
    <img src="https://s2.loli.net/2023/12/13/jxM1QRPdYf4K2eN.png" alt="修改项目界面" width="400px"/>
  - **修改项目按钮**：点击后，用户可以修改项目的相关信息。
  - **删除项目按钮**：点击后，用户可以删除该项目。
  - **接口种类柱状图**：显示项目各种接口的数量。
  - **人员类型饼图**：显示项目人员类型的分布。

---

### 导入接口界面

<img src="https://s2.loli.net/2023/12/13/xPiZB8CztYqvaR2.png" alt="导入接口界面" width="800px"/>

- **功能描述**：
  此界面为用户提供了一个简单的方式来导入新的接口。用户可以上传 Swagger 文件，系统将自动解析文件并展示接口信息。用户可以选择他们想要导入的接口，并通过一键导入功能将其添加到项目中。
- **主要元素**：

  - **文件上传区域**：用户可以点击或拖放 Swagger 文件到此区域进行上传。
  - **解析结果展示区**：文件上传并解析后，此区域将展示解析出的接口信息。
  - **选择接口复选框**：用户可以选择需要导入的接口。
  - **一键导入按钮**：点击后，选定的接口将被导入到项目中。

---

### 用户管理界面

<img src="https://s2.loli.net/2023/12/13/mNfXLb6wI3VclsY.png" alt="用户管理界面" width="800px"/>

- **功能描述**：
  此界面允许查看和管理项目中的所有用户。管理员可以添加新用户、删除现有用户或修改用户的权限。权限级别包括管理员、编辑者和只读访问。
- **主要元素**：

  - **用户列表**：以列表形式展示所有用户，每个用户条目显示用户名、邮箱和权限。
    
    <img src="https://s2.loli.net/2023/12/13/r36GpQKodA2xutC.png" alt="邀请用户界面" width="300px"/>
  - **添加用户按钮**：点击后，用户可以添加新的项目成员。
  - **删除用户按钮**：选定用户后，点击此按钮可以删除用户。
  - **权限下拉菜单**：用户可以为每个项目成员设置权限，如管理员、编辑者或只读访问。

---

### 接口树界面

- **功能描述**：
  此界面为用户提供了一个结构化的方式来查看和管理项目中的所有接口。接口以树状结构展示，用户可以轻松地浏览、添加或删除接口。此外，还提供了右键菜单，允许用户进行更多高级操作。
- **主要元素**：

  - **接口树形控件**：以树状结构展示所有接口和文件夹。
  - **右键菜单**：用户可以右键点击接口或文件夹，弹出菜单提供新建、删除等操作。
  - **接口详情展示区**：选定接口后，此区域将展示接口的详细信息。

---

### 接口详情界面

<img src="https://s2.loli.net/2023/12/13/kChrzmZ9vX27NwS.png" alt="接口详情界面" width="800px"/>

- **功能描述**：
  此界面展示了选定接口的所有详细信息。用户可以查看和编辑接口的请求方法、请求路径、参数等。界面还提供了 Mock 服务功能，允许用户模拟接口的行为。用户还可以查看接口的更改历史，比较不同版本之间的差异，并根据需要回滚到早期版本。
- **主要元素**：

  - **Mock 服务复选框**：用户可以启用或禁用 Mock 服务。
  - **接口前缀输入框**：用户可以修改接口的前缀。
  - **请求方法下拉菜单**：显示接口的 HTTP 请求方法，如 GET、POST 等。
  - **请求路径输入框**：显示接口的请求路径。
  - **发送请求、保存接口、刷新按钮**：提供对接口的操作功能。
  - **请求参数**：展示详细的接口 Params、Body、请求头、接口描述和 Mock 功能。
  - **返回响应展示区**：显示接口的返回响应数据。
  - **历史功能按钮**：点击后，用户可以查看接口的更改历史。

---

### 请求参数界面

- **功能描述**：
  此界面能够详细查看和编辑接口的请求参数。它涵盖了接口的 Params、Body、请求头、接口描述以及 Mock 功能，确保用户能够全面地管理和配置他们的 API 接口。
- **主要元素**：

  - **接口 Params 区域：**
    
    <img src="https://s2.loli.net/2023/12/13/e6jPB9TfnkGAgVl.png" alt="请求参数" width="600px"/>
    
    - **参数列表：**详细展示接口的所有请求参数。每个参数都有其名称、数据类型、是否必填的标志以及简短描述。
    - **添加参数按钮：**用户点击此按钮后，将添加一个新列，允许他们输入新参数的详细信息，如名称、类型、是否必填和描述。
    - **删除参数按钮：**用户可以通过选择特定的参数，然后点击此按钮来删除不再需要的参数。
  - **Body 区域：**
    
    <img src="https://s2.loli.net/2023/12/13/EAfHa8BthnxdWo5.png" alt="请求体" width="600px"/>
    
    - **数据格式 Radio**：允许用户选择请求体的数据格式，如 JSON、form-data、row 等，确保与 API 接口的实际需求相匹配。
    - **编辑框：**一个大型的文本框，用户可以在其中直接输入或粘贴请求体的内容，也可以进行编辑和修改。
  - **请求头区域：**
    
    <img src="https://s2.loli.net/2023/12/13/1kaP23wlfDGyNiB.png" alt="请求头" width="600px"/>
    
    - **头部列表：**清晰地列出接口的所有请求头。每个头部都有其名称和值，方便用户一目了然。
    - **添加头部按钮：**点击此按钮，用户可以添加新的请求头，为其指定名称和值。
    - **删除头部按钮：**用户可以选择不需要的请求头，然后点击此按钮进行删除。
  - **接口描述区域：**
    - **编辑框：**一个专门的文本框，允许用户为接口提供详细的描述。这有助于其他团队成员理解接口的用途和功能。
  - **Mock 功能区域：**
    
    <img src="https://s2.loli.net/2023/12/13/j5CaIiPcpzJun1E.png" alt="Mock功能" width="600px"/>
    
    - **启用 Mock 复选框**：用户通过勾选此复选框来决定是否启用 Mock 服务。
    - **Mock 数据编辑框：**当 Mock 服务被启用时，此编辑框允许用户输入或修改用于模拟的数据。
    - **响应状态码输入框：**用户可以在此输入框中设置 Mock 服务的响应状态码，如 200、404 等。
    - **添加 Mock 规则按钮：**点击此按钮后，用户可以为接口添加新的 Mock 规则。例如，他们可以设置在接收到特定参数时返回特定的 Mock 数据。

### 更改历史界面

  <img src="https://s2.loli.net/2023/12/13/w8TlaVKJjr6dt2z.png" alt="历史记录界面" width="300px"/>

- **功能描述**：
  此界面为用户提供了一个查看接口更改历史的方式。每次更改都会被记录，包括更改人和更新时间。用户可以查看每个更改的详细内容，比较与当前版本的差异，并可以回滚到之前的版本。
- **主要元素**：
  - **更改列表**：以列表形式展示所有的更改记录，每个记录显示更改人和更新时间。
    
    <img src="https://s2.loli.net/2023/12/13/U1C5E7jW9lhyqVn.png" alt="差分对比界面" width="500px"/>
    
  - **历史详情**：点击后，用户可以查看选定历史记录与当前版本的差异。
  - **回滚按钮**：点击后，接口将回滚到选定的历史版本。
