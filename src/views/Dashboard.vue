<template>
  <div class="project-details">
    <h2>{{ project.name }}</h2>
    <p>{{ project.description }}</p>
    <p>创建者: {{ project.creator }}</p>
    <p>创建时间: {{ project.createTime }}</p>
    <p>接口数量: {{ project.interfaceCount }}</p>
    <p>项目成员数量: {{ project.memberCount }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { projectStore } from "../store/project";
const store = projectStore();
const projectId = store.getProjectId;
import router from "../router";
import { createProject, getProject } from "../api/project";

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

onMounted(() => {
  console.log(store.getProjectId);
  getProjectDetail();
});
</script>
