<template>
  <div class="project-details">
    <el-card>
      <div class="project-name">{{ project.name }}</div>
      <div class="project-description">项目介绍：{{ project.description }}</div>
      <div class="project-info">
        <el-row>
          <el-col :span="12">
            <p style="font-size: 18px">创建者: {{ project.creator }}</p>
            <p style="font-size: 18px">创建时间: {{ project.createTime }}</p>
          </el-col>
          <el-col :span="12">
            <p style="font-size: 18px">
              接口数量: {{ project.interfaceCount }}
            </p>
            <p style="font-size: 18px">
              项目成员数量: {{ project.memberCount }}
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="project-actions">
        <el-button type="primary" @click="editProject">修改项目</el-button>
        <el-button type="danger" @click="deleteProject1">删除项目</el-button>
      </div>
    </el-card>
    <el-dialog v-model="updateDialogVisible" title="修改项目" width="40%">
      <el-form :model="editForm" ref="editForm1">
        <el-form-item label="项目" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="auth">
          <el-input
            type="textarea"
            v-model="editForm.description"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { updateProject, getProject, deleteProject } from "../api/project";
import { projectStore } from "../store/project";
const store = projectStore();
const projectId = store.getProjectId;
import router from "../router";
const editForm = ref({});
const updateDialogVisible = ref(false);
const project = ref({});

const getProjectDetail = async () => {
  try {
    const res = await getProject(projectId);
    console.log(res);
    project.value = {
      ...res.data,
      creator: res.data.creator.name,
      createTime: new Date(res.data.createTime).toLocaleDateString(),
      memberCount: res.data.members.length,
    };
    ElMessage.success("获取项目详情成功");
  } catch (error) {
    console.log(error);
    ElMessage.error(error);
  }
};

function editProject() {
  updateDialogVisible.value = true;
  editForm.value = {
    name: project.value.name,
    description: project.value.description,
  };
}
const handleUpdate = async () => {
  try {
    console.log(editForm.value);
    await updateProject(projectId, editForm.value);
    ElMessage.success("更新成功");
    updateDialogVisible.value = false;
    getProjectDetail();
  } catch (error) {
    ElMessage.error(error);
  }
};

const deleteProject1 = async () => {
  try {
    await deleteProject(projectId);
    ElMessage.success("删除成功");
    router.push("/projects");
  } catch (error) {
    ElMessage.error(error);
  }
};

onMounted(() => {
  console.log(store.getProjectId);
  getProjectDetail();
});
</script>

<style>
.project-details {
  width: 90%;
  margin: 0 auto;
}

.project-name {
  display: flex;
  justify-content: center;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
}

.project-description {
  line-height: 1.5;
  font-size: 17px;
}

.project-info {
  margin-top: 10px;
}
.project-actions {
  display: flex;
  justify-content: flex-end;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
