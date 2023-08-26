<template>
  <div class="project-details">
    <el-card>
      <div class="project-name">{{ projectData.name }}</div>
      <div class="project-description">
        项目介绍：{{ projectData.description }}
      </div>
      <div class="project-info">
        <el-row>
          <el-col :span="12">
            <p style="font-size: 18px">创建者: {{ projectData.creator }}</p>
            <p style="font-size: 18px">
              创建时间: {{ projectData.createTime }}
            </p>
          </el-col>
          <el-col :span="12">
            <p style="font-size: 18px">
              接口数量: {{ projectData.interfaceCount }}
            </p>
            <p style="font-size: 18px">
              项目成员数量: {{ projectData.memberCount }}
            </p>
          </el-col>
        </el-row>
      </div>
      <div class="project-actions">
        <el-button type="success" :icon="Upload" @click="importInterface">
          导入接口
        </el-button>
        <el-button type="primary" :icon="Edit" @click="editProject"
          >修改项目</el-button
        >
        <el-button type="danger" :icon="Delete" @click="deleteProject1"
          >删除项目</el-button
        >
      </div>
    </el-card>
    <el-dialog v-model="importDialogVisible" title="导入接口" width="40%">
      <el-upload
        v-model:file-list="fileList"
        ref="uploadRef"
        class="upload"
        drag
        action="http://localhost:3000/api/upload"
        :limit="1"
        :on-exceed="handleExceed"
        :before-upload="handleBeforeUpload"
        :accept="'.json'"
        :auto-upload="true"
        :on-success="handleSuccess"
        :on-error="handleError"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">支持Swagger/OpenApi 3.0</div>
      </el-upload>
      <el-card shadow="hover" style="margin-top: 10px; margin-bottom: 5px">
        <el-Text type="primary">导入数据预览</el-Text>
        <el-tree
          ref="importTreeRef"
          :data="importData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1]"
          :default-checked-keys="[1]"
          style="margin-top: 5px"
        >
          <template #default="{ node, data }">
            <span
              v-if="data.type === 'root' || data.type === 'contents'"
              class="root-node"
            >
              <el-row class="el-dropdown-link">
                <el-text size="large">
                  <el-icon><Files /></el-icon>
                  {{ node.label }}
                </el-text>
              </el-row>
            </span>
            <div v-else class="other-node">
              <el-text :style="{ color: textColor(data) }"
                >{{ data.data.requestMethod }} &nbsp;
              </el-text>
              <el-text> {{ node.label }}</el-text>
            </div>
          </template>
        </el-tree>
      </el-card>
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio label="append">追加模式</el-radio>
        <el-radio label="overwrite">覆盖模式</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer" style="margin-top: 5px">
        <el-button @click="importDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleImport">确定导入</el-button>
      </span>
    </el-dialog>
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
import router from "../router";
import { Upload, Edit, Delete } from "@element-plus/icons-vue";
import { Files, Folder } from "@element-plus/icons-vue";
import { updateProject, getProject, deleteProject } from "../api/project";
import { batchCreateInterface } from "../api/interface";
import { projectStore } from "../store/project";
const store = projectStore();
const projectId = store.getProjectId;
const uploadRef = ref();
const fileList = ref([]);
const editForm = ref({});
const importTreeRef = ref();
const radio1 = ref("append");
const updateDialogVisible = ref(false);
const importDialogVisible = ref(false);
const importData = ref([]);
const projectData = ref({});
let id = 1;

// 获取项目详情
const getProjectDetail = async () => {
  try {
    const res = await getProject(projectId);
    console.log(res);
    projectData.value = {
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

// 根据请求方法返回对应的颜色
function textColor(data) {
  switch (data.data.requestMethod) {
    case "GET":
      return "#67C23Ac0";
    case "POST":
      return "#E6A23Cc0";
    case "PUT":
    case "PATCH":
      return "#409EFFc0";
    case "DELETE":
      return "#F56C6Cc0";
    default:
      return "";
  }
}

// 打开导入接口弹窗
const importInterface = () => {
  importDialogVisible.value = true;
};

// 处理上传文件超过限制
const handleExceed = (files, fileList) => {
  ElMessage.warning("只能上传一个文件");
};

const handleBeforeUpload = (file) => {
  // 限制文件大小
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error("上传文件大小不能超过 2MB!");
    throw new Error("上传文件大小不能超过 2MB!");
  }
  // 检查是否为json文件
  console.log(file);
  const isJson = file.type === "application/json";
  if (!isJson) {
    ElMessage.error("上传文件只能是json格式!");
    throw new Error("上传文件只能是json格式!");
  }
  return true;
};

// 上传成功的钩子
const handleSuccess = (response, file, fileList) => {
  if (response.data) {
    const result = {
      id: 1,
      label: "根目录",
      type: "root",
      children: [],
    };
    let tags = [];
    response.data.forEach((item) => {
      if (item.tag) {
        tags.push(item.tag);
      }
    });
    tags = [...new Set(tags)];
    const tagMap = {};
    tags.forEach((tag, index) => {
      tagMap[tag] = index + 2;
      result.children.push({
        id: id++,
        label: tag,
        type: "contents",
        children: [],
      });
    });
    response.data.forEach((interfaceData) => {
      const tagIndex = tagMap[interfaceData.tag];
      const contents = tagIndex ? result.children[tagIndex - 2] : result;
      contents.children.push({
        id: id++,
        label: interfaceData.name,
        type: "interface",
        data: interfaceData,
      });
    });
    importData.value = [result];
    console.log(importData.value);
  }
};

// 上传失败的钩子
const handleError = (err, file, fileList) => {
  console.log(err);
  ElMessage.error("上传失败");
};

// 导入接口
const handleImport = async () => {
  if (importData.value.length === 0) {
    ElMessage.error("请先上传文件");
    return;
  }
  if (importTreeRef.value.getCheckedNodes().length === 0) {
    ElMessage.error("请选择要导入的接口");
    return;
  }
  // 选出type为interface的节点
  const interfaces = importTreeRef.value.getCheckedNodes().filter((node) => {
    return node.type === "interface";
  });
  const interfaceData = {
    type: radio1.value,
    projectId: projectId,
    datas: interfaces.map((interface1) => {
      return interface1.data;
    }),
  };
  try {
    console.log(interfaceData);
    await batchCreateInterface(interfaceData);
    ElMessage.success("导入成功");
    importDialogVisible.value = false;
    getProjectDetail();
  } catch (error) {
    console.log(error);
    ElMessage.error(error);
  }
};

function editProject() {
  updateDialogVisible.value = true;
  editForm.value = {
    name: projectData.value.name,
    description: projectData.value.description,
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
