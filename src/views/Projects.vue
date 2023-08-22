<template>
  <Header></Header>
  <el-button
    class="create-button"
    type="primary"
    :icon="Plus"
    @click="dialogFormVisible = true"
  >
    创建项目
  </el-button>
  <el-dialog v-model="dialogFormVisible" title="创建项目">
    <el-form :model="newProject" :rules="rules" ref="projectFormRef">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="newProject.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述" prop="description">
        <el-input v-model="newProject.description" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createProject1"> 创建 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-table
    :data="projectList"
    class="project-list"
    @row-click="handleRowClick"
  >
    <el-table-column prop="name" label="项目名称"></el-table-column>
    <el-table-column prop="description" label="项目描述"></el-table-column>
    <el-table-column prop="creator" label="创建者"></el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column prop="interfaceCount" label="接口数量"></el-table-column>
  </el-table>
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

    ElMessage.success("获取项目列表成功");
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
    console.log(userName.value);
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
  margin-left: 15px;
}
.el-select {
  width: 300px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
</style>
