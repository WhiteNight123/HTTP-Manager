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
          <el-col :span="4">
            <el-checkbox v-model="isMock" label="Mock服务器" border />
          </el-col>
          <el-col :span="2">
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
          style="margin: 8px -2.5px"
        >
          <el-col :span="2">
            <el-select v-model="interfaceData.requestMethod">
              <el-option label="GET" value="GET" />
              <el-option label="POST" value="POST" />
              <el-option label="PUT" value="PUT" />
              <el-option label="DEL" value="DELETE" />
              <el-option label="PAT" value="PATCH" />
            </el-select>
          </el-col>
          <el-col :span="15">
            <el-input
              v-model="interfaceData.requestPath"
              placeholder="输入请求url"
              clearable
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
            <el-button type="primary" style="margin-top: 0">保存接口</el-button>
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
          <el-text>
            实际发送请求地址:
            {{
              isMock
                ? "http:127.0.0.1:3000/mock" + interfaceData.requestPath
                : prefix + interfaceData.requestPath
            }}
          </el-text>
        </el-row>
      </el-header>
      <el-main>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          style="margin-top: 20px"
        >
          <el-tab-pane label="Params" name="1">
            <el-text class="mx-1">Path参数</el-text>
            <div>
              <ElTable
                :data="interfaceData.requestParams.path"
                stripe
                table-layout="fixed"
              >
                <el-table-column label="参数名" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.name"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="参数值" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.example"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="类型" text-align="center">
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择">
                      <el-option label="string" value="string" />
                      <el-option label="integer" value="integer" />
                      <el-option label="number" value="number" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="说明" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.description"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="必填" text-align="center" width="70px">
                  <template #default="scope">
                    <el-switch v-model="scope.row.required" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" text-align="center">
                  <template #default="scope">
                    <el-button
                      type="danger"
                      @click="deleteParamsPath(scope.$index)"
                      style="margin-top: 0"
                      :icon="Delete"
                      circle
                    />
                  </template>
                </el-table-column>
              </ElTable>
              <ElButton type="primary" text @click="addParamsPath"
                >新增一条params</ElButton
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="Body" name="2">
            <el-radio-group v-model="requestBodyType">
              <el-radio :label="1">json</el-radio>
              <el-radio :label="2">form-data</el-radio>
              <el-radio :label="4">x-wwww-form-urlencoded</el-radio>
              <el-radio :label="5">raw</el-radio>
              <el-radio :label="3">none</el-radio>
            </el-radio-group>

            <div v-if="requestBodyType === 1">
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
                ref="jsonEditor"
                v-model="interfaceData.requestBody.content[0]"
                mode="text"
                :main-menu-bar="false"
                :status-bar="false"
                :ask-to-format="true"
              />
            </div>
            <div v-if="requestBodyType === 2">
              <ElTable
                :data="interfaceData.requestBody.content"
                stripe
                table-layout="fixed"
              >
                <el-table-column label="参数名" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.name"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="参数值" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.example"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="类型" text-align="center">
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择">
                      <el-option label="string" value="string" />
                      <el-option label="parameter" value="parameter" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="说明" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.description"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="必填" text-align="center" width="70px">
                  <template #default="scope">
                    <el-switch v-model="scope.row.required" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="70px" text-align="center">
                  <template #default="scope">
                    <el-button
                      type="danger"
                      @click="deleteBodyFormData(scope.$index)"
                      :icon="Delete"
                      circle
                    />
                  </template>
                </el-table-column>
              </ElTable>
              <ElButton type="primary" text @click="addBodyFormData"
                >新增一条记录</ElButton
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="请求头" name="3">
            <div>
              <ElTable
                :data="interfaceData.requestHeaders"
                stripe
                table-layout="fixed"
                style="width: 100%"
              >
                <el-table-column label="参数名" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.name"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="参数值" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.example"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="类型" text-align="center">
                  <template #default="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择">
                      <el-option label="string" value="string" />
                      <el-option label="integer" value="integer" />
                      <el-option label="number" value="number" />
                      <el-option label="array" value="array" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="说明" text-align="center">
                  <template #default="scope">
                    <ElInput v-model="scope.row.description"></ElInput>
                  </template>
                </el-table-column>
                <el-table-column label="必填" text-align="center" width="70px">
                  <template #default="scope">
                    <el-switch v-model="scope.row.required" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="70px" text-align="center">
                  <template #default="scope">
                    <el-button
                      type="danger"
                      @click="deleteReqHeader(scope.$index)"
                      :icon="Delete"
                      circle
                    />
                  </template>
                </el-table-column>
              </ElTable>
              <ElButton type="primary" text @click="addReqHeader"
                >新增一条请求头</ElButton
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="备注信息" name="5"></el-tab-pane>
          <el-tab-pane label="Mock" name="8"></el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer
        ><el-text type="primary" style="display: flex; margin-bottom: 5px"
          >返回响应</el-text
        >
        <JsonEditorVue
          v-if="response"
          :class="isDarkMode ? 'jse-theme-dark' : ''"
          v-model="response"
          :main-menu-bar="false"
          :status-bar="false"
          :read-only="true"
        />
        <div v-else>点击"发送请求"按钮获取返回结果</div>
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
import { Delete, Refresh } from "@element-plus/icons-vue";
import History from "../components/History.vue";
import "vanilla-jsoneditor/themes/jse-theme-dark.css";
import { getInterface } from "../api/interface";
import JsonEditorVue from "json-editor-vue";
import { ElMessage } from "element-plus";
import { useDark } from "@vueuse/core";
const isDarkMode = useDark();
const prefixDialogVisiable = ref(false);
const isMock = ref(false);
const jsonEditor = ref();
const prefix = ref("http://127.0.0.1:3000");
const prefixTmp = ref();
const interfaceData = ref({
  name: "",
  description: "",
  tag: "",
  requestMethod: "",
  requestPath: "",
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
    contentType: "",
    content: [],
  },
});
const response = ref({
  code: 200,
  msg: "获取接口成功!",
  data: {
    name: "更改接口",
    description: "修改接口说明",
    tag: "接口",
    requestMethod: "PATCH",
    requestPath: "/api/interface/:interfaceId",
    requestHeaders:
      '[\n  {\n    "name": "Authorization",\n    "description": "必选token",\n    "required": true,\n    "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4",\n    "type": "string"\n  }\n]',
    requestParams:
      '{\n  "path": [\n    {\n      "name": "interfaceId",\n      "description": "接口Id",\n      "required": true,\n      "example": "64d782b65239aaa91333922f",\n      "type": "string"\n    }\n  ],\n  "query": []\n}',
    requestBody:
      '{\n  "contentType": "application/json",\n  "content": [\n    {}\n  ]\n}',
    response:
      '{\n  "contentType": "application/json",\n  "content": [\n    {\n      "id": "",\n      "name": "",\n      "description": "",\n      "requestMethod": "",\n      "requestPath": "",\n      "requestHeaders": "",\n      "requestParams": "",\n      "requestBody": "",\n      "response": "",\n      "projectId": "",\n      "code": "200"\n    }\n  ]\n}',
    projectId: "64e1da182d845c0e02cc6811",
    history: [
      {
        version: 1,
        updatedAt: "2023-08-25T13:11:26.701Z",
        updatedBy: "64dd7ae412844cc36edc60b4",
        data: '{\n  "name": "更改接口",\n  "description": "修改接口说明",\n  "tag": "接口",\n  "requestMethod": "PATCH",\n  "requestPath": "/api/interface/:interfaceId",\n  "requestHeaders": [\n    {\n      "name": "Authorization",\n      "description": "必选token",\n      "required": true,\n      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ1ZDc5YjQwNDhiYmFkMTkyZmYwZWQiLCJpYXQiOjE2OTE4MTA3NjYsImV4cCI6MTY5MjY3NDc2Nn0.Z_u8P4Q8Z1VQ37QNPR64bJIsbA5IqjYEj2aRIZr08T4",\n      "type": "string"\n    }\n  ],\n  "requestParams": {\n    "path": [\n      {\n        "name": "interfaceId",\n        "description": "接口Id",\n        "required": true,\n        "example": "64d782b65239aaa91333922f",\n        "type": "string"\n      }\n    ],\n    "query": []\n  },\n  "requestBody": {\n    "contentType": "application/json",\n    "content": [\n      {}\n    ]\n  },\n  "response": {\n    "contentType": "application/json",\n    "content": [\n      {\n        "id": "",\n        "name": "",\n        "description": "",\n        "requestMethod": "",\n        "requestPath": "",\n        "requestHeaders": "",\n        "requestParams": "",\n        "requestBody": "",\n        "response": "",\n        "projectId": "",\n        "code": "200"\n      }\n    ]\n  }\n}',
        _id: "64e8a87e89412f63b9437e62",
      },
    ],
    _id: "64e8a87e89412f63b9437e61",
    __v: 0,
  },
});
const activeName = ref("1");
const requestBodyType = ref(1);
const parentData = defineProps({
  interfaceData: Object,
});
let paramsPathNum = 0;
console.log(parentData.interfaceData);
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
  const res = await getInterface(parentData.interfaceData.InterfaceId);
  console.log(res);
  interfaceData.value = {
    ...res.data,
    requestHeaders: JSON.parse(res.data.requestHeaders),
    requestParams: JSON.parse(res.data.requestParams),
    requestBody: JSON.parse(res.data.requestBody),
    response: JSON.parse(res.data.response),
  };
  console.log(interfaceData.value);
  console.log(interfaceData.value.requestBody.content[0]);
};

onMounted(() => {
  if (parentData.interfaceData.type === "none") {
    return;
  }
  getInterfaceData();
});
const refresh = () => {
  window.location.reload();
  console.log("refresh");
};
const sendRequest = () => {};
const addParamsPath = () => {
  console.log(interfaceData.value);
  interfaceData.value.requestParams.path.push({ paramsPathNum: paramsPathNum });
  paramsPathNum++;
};
const deleteParamsPath = (index) => {
  interfaceData.value.requestParams.path.splice(index, 1);
};
let reqHeaderNum = 0;
const addReqHeader = () => {
  interfaceData.value.requestHeaders.push({ reqHeaderNum: reqHeaderNum });
  reqHeaderNum++;
};
const deleteReqHeader = (index) => {
  interfaceData.value.requestHeaders.splice(index, 1);
};
let bodyFormDataNum = 0;
const addBodyFormData = () => {
  interfaceData.value.requestBody.content.push({ number: bodyFormDataNum });
  bodyFormDataNum++;
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
