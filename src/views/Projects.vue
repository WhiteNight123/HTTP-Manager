<template>
  <Header></Header>
  <h2 style="margin-bottom: 0px; margin-top: 20px">项目列表</h2>
  <el-table
    :data="projectList"
    class="project-list"
    @row-click="handleRowClick"
  >
    <template #empty>
      <div class="empty-container">
        <el-text> 你还没有项目呢,创建一个新项目吧 </el-text>
        <el-button
          class="create-button"
          :icon="Plus"
          @click="dialogFormVisible = true"
          style="margin-top: 0; margin-bottom: 10px"
        >
          创建项目
        </el-button>
      </div>
    </template>
    <el-table-column
      prop="name"
      label="项目名称"
      min-width="2%"
    ></el-table-column>
    <el-table-column
      prop="description"
      label="项目描述"
      min-width="8%"
    ></el-table-column>
    <el-table-column
      prop="creator"
      label="创建者"
      min-width="2%"
    ></el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      min-width="2%"
    ></el-table-column>
    <el-table-column
      prop="interfaceCount"
      label="接口数量"
      min-width="2%"
    ></el-table-column>
  </el-table>
  <el-button
    v-if="projectList.length > 0"
    class="create-button"
    :icon="Plus"
    @click="dialogFormVisible = true"
    style="float: right; margin-right: 40px; margin-top: 10px"
  >
    创建项目
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="创建项目" width="35%">
    <el-form :model="newProject" :rules="rules" ref="projectFormRef">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="newProject.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述" prop="description" label-width="80px">
        <el-input
          v-model="newProject.description"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createProject1"> 创建 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import router from "../router";
import { createProject, getProjects } from "../api/project";
import { storeToRefs } from "pinia";
import { useStore } from "../store/user";
import { projectStore } from "../store/project";

const store = useStore();
const projectStore1 = projectStore();
let { userName } = storeToRefs(store);
const projectFormRef = ref();
const dialogFormVisible = ref(false);
const rules = ref({
  name: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 2, max: 15, message: "项目名称在 2 到 15 个字符", trigger: "blur" },
  ],
  description: [
    { min: 5, max: 100, message: "项目描述在 5到 100 个字符", trigger: "blur" },
  ],
});
const newProject = ref({
  name: "",
  description: "",
});
const projectList = ref([]);

const getProjectList = async () => {
  try {
    const res = await getProjects();
    console.log(res);
    // 将res.data.createTime转换为本地时间
    projectList.value = res.data.map((item) => {
      return {
        ...item,
        creator: item.creator.name,
        createTime: new Date(item.createTime).toLocaleDateString(),
      };
    });

    console.log("获取项目列表成功");
  } catch (error) {
    ElMessage.error(error);
  }
};
const createProject1 = async () => {
  try {
    await projectFormRef.value.validate().catch((error) => {
      if (error.name) throw error.name[0].message;
      if (error.description) throw error.description[0].message;
      throw error;
    });
    console.log("Project form:", newProject.value);
    await createProject(newProject.value);
    // 项目创建成功后，将项目添加到项目列表中
    projectList.value.push({
      name: newProject.value.name,
      description: newProject.value.description,
      creator: userName.value,
      createTime: new Date().toLocaleDateString(),
      interfaceCount: 0,
    });
    dialogFormVisible.value = false;
    newProject.value.name = "";
    newProject.value.description = "";
    getProjectList();
    ElMessage.success("项目创建成功");
  } catch (error) {
    ElMessage.error(error);
  }
};
const handleRowClick = (row) => {
  console.log(row);
  // 跳转到项目详情页面
  projectStore1.setProjectId(row._id);
  router.push("/Dashboard");
};

getProjectList();
</script>

<style scoped>
.el-button.create-button {
  margin-left: 30px;
}
.el-select {
  width: 300px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  padding: 0 20px;
  border-top: 1px solid #eee;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.project-list {
  width: 95%;
  margin: 0 30px;
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
