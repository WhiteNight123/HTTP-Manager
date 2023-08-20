<template>
  <div class="users">
    <h2>用户列表</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="编辑用户" width="30%">
      <el-form :model="editForm" ref="editForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  getProject,
  addMember,
  updateMember,
  deleteMember,
} from "../api/project";

export default {
  name: "Users",
  setup() {
    const users = ref([]);
    const dialogVisible = ref(false);
    const editForm = ref({
      name: "",
      email: "",
      role: "",
    });
    const getProjectList = async () => {
      try {
        const res = await getProject();
        console.log(res);
        users.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const handleEdit = (row) => {
      dialogVisible.value = true;
      editForm.value = Object.assign({}, row);
    };
    const handleUpdate = async () => {
      try {
        await updateMember(editForm.value);
        ElMessage({
          message: "更新成功",
          type: "success",
        });
        dialogVisible.value = false;
        getProjectList();
      } catch (error) {
        console.log(error);
      }
    };
    const handleDelete = async (row) => {
      try {
        await deleteMember(row.id);
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        getProjectList();
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getProjectList();
    });
    return {
      users,
      dialogVisible,
      editForm,
      handleEdit,
      handleUpdate,
      handleDelete,
    };
  },
};
</script>
