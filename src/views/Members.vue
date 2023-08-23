<template>
  <div class="users">
    <h2>用户列表</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="auth" label="角色"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="button-group">
            <el-button
              type="primary"
              :disabled="scope.$index === 0"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              :disabled="scope.$index === 0"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="addButton" :icon="Plus" @click="addMember1"
      >邀请用户</el-button
    >
    <el-dialog v-model="updateDialogVisible" title="编辑用户权限" width="30%">
      <el-form :model="editForm" ref="editForm1" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <p class="dialog-form-name">{{ editForm.name }}</p>
        </el-form-item>
        <el-form-item label="权限" prop="auth">
          <el-select v-model="editForm.auth" placeholder="请选择">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="编辑者" value="write"></el-option>
            <el-option label="只读访问" value="read"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-model="addDialogVisible" title="邀请用户" width="30%">
      <el-form :model="editForm" ref="editForm1" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="auth">
          <el-select v-model="editForm.auth" placeholder="请选择">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="编辑者" value="write"></el-option>
            <el-option label="只读访问" value="read"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { projectStore } from "../store/project";
const store = projectStore();
const projectId = store.getProjectId;
import router from "../router";
import {
  getProject,
  addMember,
  updateMember,
  deleteMember,
} from "../api/project";

const users = ref([]);
const updateDialogVisible = ref(false);
const addDialogVisible = ref(false);
const editForm = ref({});
const authOptions = [
  { label: "管理员", value: "admin" },
  { label: "编辑者", value: "write" },
  { label: "只读访问", value: "read" },
];

const getProjectList = async () => {
  try {
    const res = await getProject(projectId);
    console.log(res);
    users.value = res.data.members.map((item) => {
      return {
        ...item,
        auth: authOptions.find((auth) => auth.value === item.auth).label,
      };
    });
    console.log("获取项目列表成功");
  } catch (error) {
    console.log(error);
    ElMessage.error(error);
  }
};

const handleEdit = (row) => {
  updateDialogVisible.value = true;
  editForm.value = Object.assign({}, row);
};
const addMember1 = async () => {
  addDialogVisible.value = true;
};

const handleUpdate = async () => {
  try {
    const updateData = {
      userId: editForm.value._id,
      projectId: projectId,
      auth: editForm.value.auth,
    };
    console.log(updateData);
    await updateMember(updateData);
    ElMessage.success("更新成功");
    updateDialogVisible.value = false;
    getProjectList();
  } catch (error) {
    ElMessage.error(error);
  }
};

const handleDelete = async (row) => {
  try {
    await deleteMember({ userId: row._id, projectId: projectId });
    ElMessage.success("删除成功");
    getProjectList();
  } catch (error) {
    ElMessage.error(error);
  }
};

const handleAdd = async () => {
  try {
    const addData = {
      email: editForm.value.email,
      projectId: projectId,
      auth: editForm.value.auth,
    };
    console.log(addData);
    await addMember(addData);
    ElMessage.success("邀请成功");
    addDialogVisible.value = false;
    getProjectList();
  } catch (error) {
    ElMessage.error(error);
  }
};

onMounted(() => {
  getProjectList();
  console.log(store.getProjectId);
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
.button-group {
  margin-top: -9px;
  display: flex;
  align-items: center;
}
.dialog-form-name {
  margin-top: -1px;
  margin-left: 5px;
}
</style>
