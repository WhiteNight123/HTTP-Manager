<template>
  <div class="custom-tree-container">
    <p>树形控件</p>
    <el-tree
      :data="dataSource"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      class="custom-tree"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node" @click="shoulog(data)">
          <span v-if="data.type === 'root'" class="root-node">
            <el-text
              ><el-icon> <Files /> </el-icon>{{ node.label }}</el-text
            >
            <el-dropdown trigger="contextmenu" class="node-dropdown">
              <span class="el-dropdown-link"></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="appendContents(data)"
                    >Append Contents</el-dropdown-item
                  >
                  <el-dropdown-item @click="appendInterface(data)"
                    >Append Interface</el-dropdown-item
                  >
                  <el-dropdown-item @click="remove(node, data)"
                    >Delete</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <span v-else-if="data.type === 'contents'" class="contents-node">
            <el-text
              ><el-icon> <Folder /> </el-icon>{{ node.label }}</el-text
            >
            <el-dropdown trigger="contextmenu" class="node-dropdown">
              <span class="el-dropdown-link"></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="appendInterface(data)"
                    >Append Interface</el-dropdown-item
                  >
                  <el-dropdown-item @click="remove(node, data)"
                    >Delete</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <div v-else class="other-node">
            <el-text>{{ node.label }}</el-text>
            <el-dropdown trigger="contextmenu" class="node-dropdown">
              <span class="el-dropdown-link"></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="remove(node, data)"
                    >Delete</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </span>
      </template>
    </el-tree>
    <el-dialog v-model="addFolderVisible" title="新建文件夹" width="35%">
      <el-row>
        <div class="folder-name-container">
          <el-text style="white-space: nowrap; margin-right: 10px">
            文件夹名称
          </el-text>
          <el-input v-model="newFoldername"></el-input>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFolderVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddFolder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-model="addInterfaceVisible" title="新建接口" width="35%">
      <el-row>
        <div class="folder-name-container">
          <el-text style="white-space: nowrap; margin-right: 10px">
            接口名称
          </el-text>
          <el-input v-model="newInterfacename"></el-input>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addInterfaceVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddInterface">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Files, Folder } from "@element-plus/icons-vue";

let id = 1000;
let addFolderVisible = ref(false);
const addInterfaceVisible = ref(false);
const newFoldername = ref("");
const newInterfacename = ref("");
let tmpData = null;

function appendContents(data) {
  addFolderVisible.value = true;
  console.log(data);
  tmpData = data;
}

function appendInterface(data) {
  addInterfaceVisible.value = true;
  console.log(data);
  tmpData = data;
}

const shoulog = (data) => {
  console.log(data);
};
const handleAddFolder = () => {
  const newChild = {
    id: id++,
    label: newFoldername.value,
    type: "contents",
    children: [],
  };
  if (!tmpData.children) {
    tmpData.children = [];
  }
  tmpData.children.push(newChild);
  dataSource.value = [...dataSource.value];
  addFolderVisible.value = false;
};

const handleAddInterface = () => {
  const newChild = {
    id: id++,
    label: newInterfacename.value,
    type: "interface",
    data: {},
  };
  if (!tmpData.children) {
    tmpData.children = [];
  }
  tmpData.children.push(newChild);
  dataSource.value = [...dataSource.value];
  addInterfaceVisible.value = false;
};

const remove = (node, data) => {
  const parent = node.parent;
  const children = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
  dataSource.value = [...dataSource.value];
};

const dataSource = ref([
  {
    id: 1,
    label: "根目录",
    type: "root",
    children: [
      {
        id: 4,
        label: "用户",
        type: "contents",
        children: [
          {
            id: 9,
            label: "注册用户",
            type: "interface",
            data: {
              _id: "64d72ffc9d1e92800db33d28",
              name: "注册用户",
              requestMethod: "POST",
              requestPath: "/api/user",
              projectId: "64d72ffc9d1e92800db33d28",
            },
          },
          {
            id: 10,
            label: "上传文件",
            type: "interface",
            data: {
              _id: "64d72ffc9d1e92800db33d28",
              name: "上传文件",
              requestMethod: "POST",
              requestPath: "/api/upload",
              projectId: "64d72ffc9d1e92800db33d28",
            },
          },
        ],
      },
      {
        id: 4,
        label: "项目",
        type: "contents",
        children: [
          {
            id: 11,
            label: "修改项目",
            type: "interface",
            data: {
              _id: "64d72ffc9d1e92800db33d28",
              name: "修改项目",
              requestMethod: "PATCH",
              requestPath: "/api/project/:id",
              projectId: "64d72ffc9d1e92800db33d28",
            },
          },
        ],
      },
      {
        id: 12,
        label: "Mock",
        type: "interface",
        data: {
          _id: "64d72ffc9d1e92800db33d28",
          name: "Mock",
          requestMethod: "POST",
          requestPath: "/mock/add",
          projectId: "64d72ffc9d1e92800db33d28",
        },
      },
    ],
  },
]);

// 处理右键菜单
const handleContextMenu = (event) => {
  // 阻止默认的右键菜单弹出
  event.preventDefault();
  const leftClickEvent = new MouseEvent("click", {
    button: 0,
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // 触发模拟的左键点击事件
  event.target.dispatchEvent(leftClickEvent);
};

// 监听右键菜单事件
onMounted(() => {
  document.addEventListener("contextmenu", handleContextMenu);
});
</script>

<style scoped>
.custom-tree {
  width: 30%;
}

.custom-tree-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.root-node,
.contents-node,
.other-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.node-dropdown {
  width: 100%;
  height: 100%;
}

.el-dropdown-link {
  width: 100%;
  height: 100%;
}
.folder-name-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.folder-name-container el-text {
  white-space: nowrap;
}
</style>
