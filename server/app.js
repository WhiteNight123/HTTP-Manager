// 导入配置文件
const config = require("./config");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// 处理json的中间件
app.use(express.json());
// 处理跨域的中间件
app.use(cors());
// 处理日志的中间件
app.use(morgan("dev"));

// 静态资源托管
app.use(express.static("public"));

// 连接mongodb
require("./model");

// 引入路由中间件
app.use("/api", require("./routes"));
app.use("/mock", require("./routes/mock"));

// 处理错误的中间件,必须放在路由后面
app.use(require("./middleware/error"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got a POST request");
});

app.listen(config.app.port, () => {
  console.log(`Running at http://localhost:${config.app.port}`);
});
