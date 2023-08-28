<template>
  <img
    src="../assets/img/history.svg"
    alt="历史记录"
    @click="showHistory"
    style="width: 20px; height: 20px"
  />
  <el-drawer v-model="drawer" title="历史记录" size="350">
    <el-table :data="historyData" @row-click="showData">
      <el-table-column property="name" label="更改人" width="100" />
      <el-table-column property="date" label="时间" width="210" />
    </el-table>
  </el-drawer>
  <el-dialog v-model="dialogDiffVisible" title="差异对比">
    <el-row>
      <el-col :span="12">
        <el-text size="large" type="danger">历史数据</el-text>
      </el-col>
      <el-col :span="12">
        <el-text size="large" type="success">当前数据</el-text>
      </el-col>
    </el-row>
    <code-diff
      :old-string="oldData"
      :new-string="newData"
      language="json"
      :filename="historyDate"
      output-format="side-by-side"
    />
    <el-row justify="center">
      <el-button type="primary" @click="rollBack"> 确定回滚 </el-button>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { CodeDiff } from "v-code-diff";
import { ElMessage } from "element-plus";
import { getHistory, rollbackHistory } from "../api/interface";
import { interfaceStore } from "../store/interface";


const drawer = ref(false);
const dialogDiffVisible = ref(false);
const historyData = ref([]);
const historyDate = ref("");
const historyId = ref("");
const oldData = ref("");
const newData = ref("");
let interfaceId = ""
const emit = defineEmits(["refresh"]);
const showHistory = async () => {
  drawer.value = true;
  try {
    interfaceId = interfaceStore().getInterfaceId;
    // 如果没有interfaceId，说明是新建接口，不需要展示历史记录
    if (!interfaceId) {
      return;
    }
    console.log(interfaceId);
    const res = await getHistory(interfaceId);
    historyData.value = res.data.map((item) => {
      return {
        name: item.updatedBy.name,
        date: new Date(item.updatedAt).toLocaleString(),
        id: item._id,
        data: item.data,
      };
    });
    console.log(historyData.value);
  } catch (err) {
    console.log(err);
    ElMessage.error(err);
  }
};
const showData = (row) => {
  dialogDiffVisible.value = true;
  historyDate.value = row.date;
  historyId.value = row.id;
  console.log(row.data);
  
  // 将row.data与historyData[-1]进行diff比较，展示差异
  if (typeof row.data === "string"){
    row.data = JSON.parse(row.data);
  }
  if (typeof row.data.requestHeaders === "string"){
    oldData.value = JSON.stringify({...row.data,
    requestHeaders: JSON.parse(row.data.requestHeaders),
      requestParams: JSON.parse(row.data.requestParams),
      requestBody: JSON.parse(row.data.requestBody),
      response: JSON.parse(row.data.response),
  }, null, 2);  } else {
    oldData.value = JSON.stringify(row.data, null, 2);
  }
  
  
  if (typeof historyData.value[0].data === "string"){
    historyData.value[0].data = JSON.parse(historyData.value[0].data);
  }
  console.log(historyData.value[0]);  
  newData.value = JSON.stringify({...historyData.value[0].data,
    requestHeaders: JSON.parse(historyData.value[0].data.requestHeaders),
      requestParams: JSON.parse(historyData.value[0].data.requestParams),
      requestBody: JSON.parse(historyData.value[0].data.requestBody),
      response: JSON.parse(historyData.value[0].data.response),
  }, null, 2);

};
const rollBack = async () => {
  try {
    console.log(interfaceId, historyId.value);
    const res = await rollbackHistory(interfaceId, historyId.value);
    console.log(res);
    ElMessage.success("回滚成功");
    dialogDiffVisible.value = false;
    showHistory();
    // 调用父组件的方法，刷新接口数据
     emit("refresh");
    } catch (err) {
    console.log(err);
    ElMessage.error(err);
  }
};
</script>
