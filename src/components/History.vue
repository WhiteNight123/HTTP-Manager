<template>
  <img
    src="../assets/img/history.svg"
    alt="历史记录"
    @click="showHistory"
    style="width: 18px; height: 18px"
  />
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    open
  </el-button>

  <el-drawer v-model="drawer" title="历史记录" size="350">
    <el-table :data="historyData" @row-click="showData">
      <el-table-column property="name" label="更改人" width="100" />
      <el-table-column property="date" label="时间" width="210" />
    </el-table>
  </el-drawer>
  <el-dialog v-model="dialogDiffVisible" title="差异对比">
    <el-row>
      <el-col :span="12">
        <el-text size="large">历史数据</el-text>
      </el-col>
      <el-col :span="12">
        <el-text size="large">当前数据</el-text>
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
const drawer = ref(false);
const dialogDiffVisible = ref(false);
const historyData = ref([]);
const historyDate = ref("");
const historyId = ref("");
const oldData = ref("");
const newData = ref("");
const interfaceId = "64e728a3163a57a3679e41e8"
const showHistory = async () => {
  drawer.value = true;
  try {
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
  console.log(row.data);
  console.log(historyData.value[historyData.value.length - 1].data);
  historyDate.value = row.date;
  historyId.value = row.id;
  // 将row.data与historyData[-1]进行diff比较，展示差异
  oldData.value = row.data;
  newData.value = historyData.value[historyData.value.length - 1].data;
};
const rollBack = async () => {
  try {
    console.log(interfaceId, historyId.value);
    const res = await rollbackHistory(interfaceId, historyId.value);
    console.log(res);
    ElMessage.success("回滚成功");
    dialogDiffVisible.value = false;
    showHistory();
  } catch (err) {
    console.log(err);
    ElMessage.error(err);
  }
};
</script>
