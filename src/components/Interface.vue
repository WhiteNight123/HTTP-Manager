<template>
  <div v-if="parentData.interfaceData.type === 'none'">
    <p style="text-align: center; margin-left: -100px">
      <img
        src="../assets/img/welcome.svg"
        alt="No data available"
        style="display: inline-block; width: 50%"
      />
    </p>
  </div>
  <div v-else>
    <el-container style="min-width: 1003px">
      <el-header>
        <el-row align="middle">
          <el-col :span="3">
            <el-checkbox v-model="isMock" label="Mock服务器" border />
          </el-col>
          <el-col :span="2" :offset="1">
            <el-text type="primary" @click="openPrefixDialog">接口前缀</el-text>
          </el-col>
          <el-col :span="1" :offset="17">
            <History />
          </el-col>
        </el-row>
        <el-row
          :gutter="5"
          justify="space-between"
          align="middle"
          style="margin: 10px -2.5px"
        >
          <el-col :span="3">
            <el-select v-model="interfaceData.requestMethod">
              <el-option label="GET" value="GET" />
              <el-option label="POST" value="POST" />
              <el-option label="PUT" value="PUT" />
              <el-option label="DEL" value="DELETE" />
              <el-option label="PAT" value="PATCH" />
            </el-select>
          </el-col>
          <el-col :span="14">
            <el-input
              v-model="interfaceData.requestPath"
              placeholder="输入请求url"
              clearable
              @change="matchParams"
            />
          </el-col>
          <el-col :span="7">
            <el-button
              type="success"
              plain
              @click="sendRequest"
              style="margin-top: 0"
              >发送请求</el-button
            >
            <el-button
              type="primary"
              @click="saveInterface"
              style="margin-top: 0"
              >保存接口</el-button
            >
            <el-button
              type="primary"
              :icon="Refresh"
              @click="refresh"
              style="margin-top: 0"
              >刷新</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-text> 实际发送请求地址: {{ realRequestPath }} </el-text>
        </el-row>
      </el-header>
      <el-main>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          style="margin-top: 20px"
        >
          <el-tab-pane label="Params" name="Param">
            <el-text>Path参数</el-text>
            <el-table
              :data="interfaceData.requestParams.path"
              stripe
              table-layout="fixed"
            >
              <template #empty>
                <el-text>自动提取接口路径里的 { path } 形式参数</el-text>
              </template>
              <el-table-column
                label="参数名"
                text-align="center"
                min-width="2%"
              >
                <template #default="scope">
                  <el-tooltip
                    effect="light"
                    content="请在接口路径修改"
                    placement="top-start"
                  >
                    <ElInput v-model="scope.row.name" disabled></ElInput>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                label="参数值"
                text-align="center"
                min-width="3%"
              >
                <template #default="scope">
                  <ElInput v-model="scope.row.example"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="类型" text-align="center" min-width="1%">
                <template #default="scope">
                  <el-tooltip
                    effect="light"
                    content="参数类型不允许改变"
                    placement="top-start"
                  >
                    <el-select
                      v-model="scope.row.type"
                      placeholder="请选择"
                      disabled
                    >
                      <el-option label="string" value="string" />
                      <el-option label="integer" value="integer" />
                      <el-option label="number" value="number" />
                    </el-select>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="说明" text-align="center" min-width="2%">
                <template #default="scope">
                  <ElInput v-model="scope.row.description"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="必填" text-align="center" min-width="1%">
                <template #default="scope">
                  <el-switch v-model="scope.row.required" disabled />
                </template>
              </el-table-column>
              <el-table-column label="操作" text-align="center" min-width="2%">
                <template>
                  <el-button
                    type="primary"
                    style="margin-top: 0"
                    :icon="Plus"
                    size="small"
                    disabled
                    circle
                  />
                  <el-button
                    type="danger"
                    style="margin-top: 0"
                    :icon="Delete"
                    size="small"
                    disabled
                    circle
                  />
                </template>
              </el-table-column>
            </el-table>
            <el-text style="display: block; margin-top: 10px"
              >Query参数</el-text
            >
            <el-table
              :data="interfaceData.requestParams.query"
              stripe
              table-layout="fixed"
            >
              <template #empty>
                <el-text @click="addParamsQuery">点击添加一条Query参数</el-text>
              </template>
              <el-table-column
                label="参数名"
                text-align="center"
                min-width="2%"
              >
                <template #default="scope">
                  <ElInput v-model="scope.row.name"></ElInput>
                </template>
              </el-table-column>
              <el-table-column
                label="参数值"
                text-align="center"
                min-width="3%"
              >
                <template #default="scope">
                  <ElInput v-model="scope.row.example"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="类型" text-align="center" min-width="1%">
                <template #default="scope">
                  <el-select v-model="scope.row.type" placeholder="请选择">
                    <el-option label="string" value="string" />
                    <el-option label="integer" value="integer" />
                    <el-option label="number" value="number" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="说明" text-align="center" min-width="2%">
                <template #default="scope">
                  <ElInput v-model="scope.row.description"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="必填" text-align="center" min-width="1%">
                <template #default="scope">
                  <el-switch v-model="scope.row.required" />
                </template>
              </el-table-column>
              <el-table-column label="操作" text-align="center" min-width="2%">
                <template #default="scope">
                  <el-button
                    type="primary"
                    @click="addParamsQuery"
                    style="margin-top: 0"
                    :icon="Plus"
                    size="small"
                    circle
                  />
                  <el-button
                    type="danger"
                    @click="deleteParamsQuery(scope.$index)"
                    style="margin-top: 0"
                    :icon="Delete"
                    size="small"
                    circle
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Body" name="Body">
            <el-radio-group v-model="requestBodyType" @change="changeBody">
              <el-radio label="json">json</el-radio>
              <el-radio label="formData">form-data</el-radio>
              <el-radio label="urlencoded">x-wwww-form-urlencoded</el-radio>
              <el-radio label="raw">raw</el-radio>
              <el-radio label="none">none</el-radio>
            </el-radio-group>
            <div v-if="requestBodyType === 'json'">
              <el-text
                type="info"
                style="
                  display: flex;
                  justify-content: right;
                  margin-right: 5px;
                  margin-bottom: 5px;
                "
                >按Ctrl+I格式化代码</el-text
              >
              <JsonEditorVue
                :class="isDarkMode ? 'jse-theme-dark' : ''"
                v-model="interfaceData.requestBody.content[0]"
                mode="text"
                :main-menu-bar="false"
                :status-bar="false"
                :ask-to-format="true"
              />
            </div>
            <div v-else-if="requestBodyType === 'formData'">
              <ElTable
                :data="interfaceData.requestBody.content"
                stripe
                table-layout="fixed"
              >
                <template #empty>
                  <el-text @click="addBodyFormData"
                    >点击添加一条Body参数</el-text
                  >
                </template>
                <el-table-column
                  label="参数名"
                  text-align="center"
                  min-width="2%"
                >
                  <template #default="scope">
                    <ElInput v-model="scope.row.name"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column
                  label="参数值"
                  text-align="center"
                  min-width="3%"
                >
                  <template #default="scope">
                    <ElInput v-model="scope.row.example"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column
                  label="类型"
                  text-align="center"
                  min-width="1%"
                >
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择">
                      <el-option label="string" value="string" />
                      <el-option label="parameter" value="parameter" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="说明"
                  text-align="center"
                  min-width="2%"
                >
                  <template #default="scope">
                    <ElInput v-model="scope.row.description"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column
                  label="必填"
                  text-align="center"
                  min-width="1%"
                >
                  <template #default="scope">
                    <el-switch v-model="scope.row.required" />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  text-align="center"
                  min-width="2%"
                >
                  <template #default="scope">
                    <el-button
                      type="primary"
                      @click="addBodyFormData"
                      style="margin-top: 0"
                      :icon="Plus"
                      size="small"
                      circle
                    />
                    <el-button
                      type="danger"
                      @click="deleteBodyFormData(scope.$index)"
                      :icon="Delete"
                      size="small"
                      style="margin-top: 0"
                      circle
                    />
                  </template>
                </el-table-column>
              </ElTable>
            </div>
            <div v-else-if="requestBodyType === 'urlencoded'">
              <ElTable
                :data="interfaceData.requestBody.content"
                stripe
                table-layout="fixed"
              >
                <template #empty>
                  <el-text @click="addBodyFormData"
                    >点击添加一条Body参数</el-text
                  >
                </template>
                <el-table-column
                  label="参数名"
                  text-align="center"
                  min-width="2%"
                >
                  <template #default="scope">
                    <ElInput v-model="scope.row.name"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column
                  label="参数值"
                  text-align="center"
                  min-width="3%"
                >
                  <template #default="scope">
                    <ElInput v-model="scope.row.example"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column
                  label="类型"
                  text-align="center"
                  min-width="1%"
                >
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择">
                      <el-option label="string" value="string" />
                      <el-option label="parameter" value="parameter" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="说明"
                  text-align="center"
                  min-width="2%"
                >
                  <template #default="scope">
                    <ElInput v-model="scope.row.description"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column
                  label="必填"
                  text-align="center"
                  min-width="1%"
                >
                  <template #default="scope">
                    <el-switch v-model="scope.row.required" />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  text-align="center"
                  min-width="2%"
                >
                  <template #default="scope">
                    <el-button
                      type="primary"
                      @click="addBodyFormData"
                      style="margin-top: 0"
                      :icon="Plus"
                      size="small"
                      circle
                    />
                    <el-button
                      type="danger"
                      @click="deleteBodyFormData(scope.$index)"
                      style="margin-top: 0"
                      :icon="Delete"
                      size="small"
                      circle
                    />
                  </template>
                </el-table-column>
              </ElTable>
            </div>
            <div v-else-if="requestBodyType === 'raw'">
              <el-input
                v-model="interfaceData.requestBody.content"
                :autosize="{ minRows: 6, maxRows: 16 }"
                type="textarea"
                placeholder="Please input"
              />
            </div>
            <div
              v-else-if="requestBodyType === 'none'"
              style="padding: 68px"
            ></div>
          </el-tab-pane>
          <el-tab-pane label="请求头" name="Header">
            <ElTable
              :data="interfaceData.requestHeaders"
              stripe
              table-layout="fixed"
              style="width: 100%"
            >
              <template #empty>
                <el-text @click="addReqHeader">点击添加一条Header</el-text>
              </template>
              <el-table-column
                label="参数名"
                text-align="center"
                min-width="2%"
              >
                <template #default="scope">
                  <ElInput v-model="scope.row.name"></ElInput>
                </template>
              </el-table-column>
              <el-table-column
                label="参数值"
                text-align="center"
                min-width="3%"
              >
                <template #default="scope">
                  <ElInput v-model="scope.row.example"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="类型" text-align="center" min-width="1%">
                <template #default="scope">
                  <el-select v-model="scope.row.type" placeholder="请选择">
                    <el-option label="string" value="string" />
                    <el-option label="integer" value="integer" />
                    <el-option label="number" value="number" />
                    <el-option label="array" value="array" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="说明" text-align="center" min-width="2%">
                <template #default="scope">
                  <ElInput v-model="scope.row.description"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="必填" text-align="center" min-width="1%">
                <template #default="scope">
                  <el-switch v-model="scope.row.required" />
                </template>
              </el-table-column>
              <el-table-column label="操作" text-align="center" min-width="2%">
                <template #default="scope">
                  <el-button
                    type="primary"
                    @click="addReqHeader"
                    style="margin-top: 0"
                    :icon="Plus"
                    size="small"
                    circle
                  />
                  <el-button
                    type="danger"
                    @click="deleteReqHeader(scope.$index)"
                    :icon="Delete"
                    style="margin-top: 0"
                    size="small"
                    circle
                  />
                </template>
              </el-table-column>
            </ElTable>
          </el-tab-pane>
          <el-tab-pane label="备注信息" name="Description">
            <el-input
              v-model="interfaceData.description"
              :autosize="{ minRows: 6, maxRows: 16 }"
              type="textarea"
              placeholder="Please input"
            />
          </el-tab-pane>
          <el-tab-pane label="Mock" name="Mcok">
            <el-text
              type="info"
              style="
                display: flex;
                justify-content: right;
                margin-right: 5px;
                margin-bottom: 5px;
              "
              >按Ctrl+I格式化代码</el-text
            >
            <JsonEditorVue
              :class="isDarkMode ? 'jse-theme-dark' : ''"
              v-model="interfaceData.response.content[0]"
              mode="text"
              :main-menu-bar="false"
              :status-bar="false"
              :ask-to-format="true"
            />
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer
        ><el-text type="primary" style="display: flex; margin-bottom: 10px"
          >返回响应</el-text
        >
        <JsonEditorVue
          v-if="realResponse"
          :class="isDarkMode ? 'jse-theme-dark' : ''"
          v-model="realResponse"
          :main-menu-bar="false"
          :status-bar="false"
          :read-only="true"
        />
        <el-text v-else>点击"发送请求"按钮获取返回结果</el-text>
      </el-footer>
    </el-container>
    <el-dialog v-model="prefixDialogVisiable" title="接口前缀" width="30%">
      <el-row>
        <div class="folder-name-container">
          <el-text style="white-space: nowrap; margin-right: 10px">
            接口前缀
          </el-text>
          <el-input v-model="prefixTmp" :maxlength="30"></el-input>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="prefixDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="handlePrefix">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import "vanilla-jsoneditor/themes/jse-theme-dark.css";
import { Plus, Delete, Refresh } from "@element-plus/icons-vue";
import History from "../components/History.vue";
import {
  getInterface,
  createInterface,
  updateInterface,
} from "../api/interface";
import axios from "axios";
import JsonEditorVue from "json-editor-vue";
import { ElMessage } from "element-plus";
import { useDark } from "@vueuse/core";
import { projectStore } from "../store/project";
import { computed } from "vue";

const isDarkMode = useDark();
const prefixDialogVisiable = ref(false);
const isMock = ref(false);
const prefix = ref("http://127.0.0.1:3000");
const prefixTmp = ref();
const interfaceData = ref({
  name: "",
  description: "",
  tag: "",
  requestMethod: "GET",
  requestPath: "",
  projectId: projectStore().getProjectId,
  requestHeaders: [],
  requestParams: {
    path: [],
    query: [],
  },
  requestBody: {
    contentType: "",
    content: [],
  },
  response: {
    contentType: "application/json",
    content: [],
  },
});
const realResponse = ref({
  code: 200,
  msg: "获取接口成功!",
  data: {
    name: "更改接口",
    description: "修改接口说明",
    tag: "接口",
    requestMethod: "PATCH",
    requestPath: "/api/interface/:interfaceId",

    _id: "64e8a87e89412f63b9437e61",
    __v: 0,
  },
});
const activeName = ref("Param");
const requestBodyType = ref("json");
// 从父组件获取数据
const parentData = defineProps({
  interfaceData: Object,
});
let interfaceId = "";

onMounted(() => {
  console.log(parentData.interfaceData);
  if (parentData.interfaceData.type === "normal") {
    interfaceId = parentData.interfaceData.InterfaceId;
    getInterfaceData();
  } else if (parentData.interfaceData.type === "new") {
    interfaceData.value.tag = parentData.interfaceData.data.tag;
    interfaceData.value.name = parentData.interfaceData.data.name;
  }
});

const realRequestPath = computed(() => {
  // 匹配path参数,即{}中的参数
  const pathParams = interfaceData.value.requestPath.match(/{\w+}/g);
  let path = interfaceData.value.requestPath;
  if (pathParams) {
    pathParams.forEach((item) => {
      const pathParam = interfaceData.value.requestParams.path.find(
        (path) => path.name === item.slice(1, -1)
      );
      // 如果pathParam不存在，则跳过这一轮
      if (!pathParam) {
        return;
      }
      const pathParamExample = pathParam.example || "{" + pathParam.name + "}";
      path = path.replace(item, pathParamExample);
    });
  }
  // 匹配query参数,即?后的参数
  const queryParams = interfaceData.value.requestParams.query;
  if (queryParams) {
    let query = "?";
    queryParams.forEach((item) => {
      if (item.required) {
        query += item.name + "=" + item.example + "&";
      }
    });
    path += query.slice(0, -1);
  }

  // 根据是否是mock服务器来决定前缀
  if (isMock.value) {
    return prefix.value + "/mock" + path;
  } else {
    return prefix.value + path;
  }
});
const matchParams = () => {
  // 匹配path参数,即{}中的参数
  const pathParams = interfaceData.value.requestPath.match(/{\w+}/g);
  console.log(pathParams);
  if (pathParams) {
    // 如果interfaceData.value.requestParams.path存在但是没有这个pathParams，则删除
    interfaceData.value.requestParams.path.forEach((item, index) => {
      const pathParam = pathParams.find(
        (path) => path.slice(1, -1) === item.name
      );
      if (!pathParam) {
        interfaceData.value.requestParams.path.splice(index, 1);
      }
    });
    // 如果interfaceData.value.requestParams.path存在这个pathParams，则不变
    pathParams.forEach((item) => {
      const pathParam = interfaceData.value.requestParams.path.find(
        (path) => path.name === item.slice(1, -1)
      );
      if (!pathParam) {
        interfaceData.value.requestParams.path.push({
          name: item.slice(1, -1),
          description: "",
          required: true,
          example: "",
          type: "string",
        });
      }
    });
  } else {
    interfaceData.value.requestParams.path = [];
  }
};
const changeBody = (val) => {
  if (val === "json") {
    interfaceData.value.requestBody = {
      contentType: "application/json",
      content: [{}],
    };
  } else if (val === "formData") {
    interfaceData.value.requestBody = {
      contentType: "multipart/form-data",
      content: [],
    };
  } else if (val === "urlencoded") {
    interfaceData.value.requestBody = {
      contentType: "application/x-www-form-urlencoded",
      content: [],
    };
  } else if (val === "raw") {
    interfaceData.value.requestBody = {
      contentType: "text/plain",
      content: "",
    };
  } else if (val === "none") {
    interfaceData.value.requestBody = {
      contentType: "",
      content: "",
    };
  }
};
const openPrefixDialog = () => {
  prefixDialogVisiable.value = true;
  prefixTmp.value = prefix.value;
  console.log(prefix.value);
};
const handlePrefix = () => {
  prefixDialogVisiable.value = false;
  // 去除空格
  prefix.value = prefixTmp.value.replace(/\s+/g, "");
};
const getInterfaceData = async () => {
  try {
    const res = await getInterface(parentData.interfaceData.InterfaceId);
    console.log(JSON.parse(res.data.response).content);
    interfaceData.value = {
      ...res.data,
      requestHeaders: JSON.parse(res.data.requestHeaders),
      requestParams: JSON.parse(res.data.requestParams),
      requestBody: JSON.parse(res.data.requestBody),
      response: JSON.parse(res.data.response),
    };
    // 转换contentType
    if (interfaceData.value.requestBody.contentType === "application/json") {
      requestBodyType.value = "json";
    } else if (
      interfaceData.value.requestBody.contentType === "multipart/form-data"
    ) {
      requestBodyType.value = "formData";
    } else if (
      interfaceData.value.requestBody.contentType ===
      "application/x-www-form-urlencoded"
    ) {
      requestBodyType.value = "urlencoded";
    } else if (interfaceData.value.requestBody.contentType === "text/plain") {
      requestBodyType.value = "raw";
    } else if (interfaceData.value.requestBody.contentType === "") {
      requestBodyType.value = "none";
    }
    console.log(interfaceData.value);
    ElMessage.success("获取接口成功");
  } catch (error) {
    console.log(error);
    ElMessage.error("获取接口失败");
  }
};

const refresh = () => {
  window.location.reload();
  console.log("refresh");
};
const sendRequest = () => {
  console.log(interfaceData.value);
  let body = {};
  if (interfaceData.value.requestBody.contentType === "application/json") {
    if (Object.keys(interfaceData.value.requestBody.content[0]).length !== 0) {
      body = JSON.parse(interfaceData.value.requestBody.content[0]);
    }
  } else {
    body = interfaceData.value.requestBody.content;
  }
  axios({
    method: interfaceData.value.requestMethod,
    url: realRequestPath.value,
    // 将headers转换为请求的headers
    headers: interfaceData.value.requestHeaders.reduce((pre, cur) => {
      pre[cur.name] = cur.example;
      return pre;
    }, {}),
    params: interfaceData.value.requestParams.query.reduce((pre, cur) => {
      pre[cur.name] = cur.example;
      return pre;
    }, {}),
    // 将body转换为请求的body
    data: body,
  })
    .then((res) => {
      response.value = res;
      ElMessage.success("发送请求成功");
    })
    .catch((err) => {
      realResponse.value = err;
      console.log(err);
      if (err.response) {
        ElMessage.error("发送请求失败: " + err.response.data.msg);
      } else {
        ElMessage.error("发送请求失败");
      }
    });
};
const saveInterface = async () => {
  try {
    if (interfaceData.value.requestPath[0] !== "/") {
      ElMessage.error("请求路径必须以/开头");
      return;
    } else if (interfaceData.value.requestPath.includes(" ")) {
      ElMessage.error("请求路径不能包含空格");
      return;
    } else if (interfaceData.value.requestPath.includes("?")) {
      ElMessage.error("请求路径不能包含?");
      return;
    }
    if (interfaceData.value.requestBody.contentType === "application/json") {
      // 如果interfaceData.value.requestBody.content[0]是string，则转换为json
      if (typeof interfaceData.value.requestBody.content[0] === "string") {
        interfaceData.value.requestBody.content[0] = JSON.parse(
          interfaceData.value.requestBody.content[0]
        );
      }
    }
    if (interfaceData.value.response.contentType === "application/json") {
      // 如果interfaceData.value.response.content[0]是string，则转换为json
      if (typeof interfaceData.value.response.content[0] === "string") {
        interfaceData.value.response.content[0] = JSON.parse(
          interfaceData.value.response.content[0]
        );
      }
    }
    const newInterfaceData = {
      ...interfaceData.value,
      requestHeaders: JSON.stringify(
        interfaceData.value.requestHeaders,
        null,
        2
      ),
      requestParams: JSON.stringify(interfaceData.value.requestParams, null, 2),
      requestBody: JSON.stringify(interfaceData.value.requestBody, null, 2),
      response: JSON.stringify(interfaceData.value.response, null, 2),
      projectId: projectStore().getProjectId,
      history: undefined,
      // 删除不需要的字段
      _id: undefined,
    };
    if (parentData.interfaceData.type === "normal") {
      const res = await updateInterface(interfaceId, newInterfaceData);
      console.log(res);
      ElMessage.success("修改成功");
    } else if (parentData.interfaceData.type === "new") {
      const res = await createInterface(newInterfaceData);
      console.log(res);
      ElMessage.success("新建接口成功");
    }
  } catch (error) {
    console.log(error);
    ElMessage.error("保存失败");
  }
};
const addParamsQuery = () => {
  if (
    // 如果上一个query参数没有填写完整，则不允许添加新的query参数
    interfaceData.value.requestParams.query.length == 0 ||
    interfaceData.value.requestParams.query[
      interfaceData.value.requestParams.query.length - 1
    ].name
  ) {
    interfaceData.value.requestParams.query.push({
      name: "",
      example: "",
      type: "string",
      description: "",
      required: true,
    });
  } else {
    ElMessage.error("请先填写完整上一个query参数");
  }
};
const deleteParamsQuery = (index) => {
  interfaceData.value.requestParams.query.splice(index, 1);
};

const addReqHeader = () => {
  if (
    // 如果上一个headers参数没有填写完整，则不允许添加新的headers参数
    interfaceData.value.requestHeaders.length == 0 ||
    interfaceData.value.requestHeaders[
      interfaceData.value.requestHeaders.length - 1
    ].name
  ) {
    interfaceData.value.requestHeaders.push({
      name: "",
      example: "",
      type: "string",
      description: "",
      required: true,
    });
  } else {
    ElMessage.error("请先填写完整上一个Header参数");
  }
};
const deleteReqHeader = (index) => {
  interfaceData.value.requestHeaders.splice(index, 1);
};

const addBodyFormData = () => {
  if (
    // 如果上一个body参数没有填写完整，则不允许添加新的body参数
    interfaceData.value.requestBody.content.length == 0 ||
    interfaceData.value.requestBody.content[
      interfaceData.value.requestBody.content.length - 1
    ].name
  ) {
    interfaceData.value.requestBody.content.push({
      name: "",
      example: "",
      type: "string",
      description: "",
      required: true,
    });
  } else {
    ElMessage.error("请先填写完整上一个Body参数");
  }
};
const deleteBodyFormData = (index) => {
  interfaceData.value.requestBody.content.splice(index, 1);
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 5px;
}
</style>
