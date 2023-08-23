<template>
  <el-container style="width: 100%; height: 100%">
    <el-aside>
      <p style="margin-left: 10px">树形控件</p>
      <el-tree
        :data="dataSource"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        class="custom-tree"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span v-if="data.type === 'root'" class="root-node">
              <el-dropdown trigger="contextmenu" class="node-dropdown">
                <el-row class="el-dropdown-link">
                  <el-text size="large">
                    <el-icon><Files /></el-icon>
                    {{ node.label }}
                  </el-text>
                </el-row>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="appendContents(data)"
                      >新建文件夹</el-dropdown-item
                    >
                    <el-dropdown-item @click="appendInterface(data)"
                      >新建接口</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
            <span v-else-if="data.type === 'contents'" class="contents-node">
              <el-dropdown trigger="contextmenu" class="node-dropdown">
                <el-row class="el-dropdown-link">
                  <el-text size="large">
                    <el-icon><Folder /></el-icon>
                    {{ node.label }}
                  </el-text>
                </el-row>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="appendInterface(data)"
                      >新建接口</el-dropdown-item
                    >
                    <el-dropdown-item @click="remove(node, data)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
            <div v-else class="other-node" @click="handleClick(data)">
              <el-text :style="{ color: textColor(data) }"
                >{{ data.data.requestMethod }} &nbsp;
              </el-text>
              <el-text> {{ node.label }}</el-text>
              <el-dropdown trigger="contextmenu" class="node-dropdown">
                <span class="el-dropdown-link"></span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="remove(node, data)"
                      >删除</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </span>
        </template>
      </el-tree>
    </el-aside>
    <el-main>
      <InterfaceDetail :InterfaceId="InterfaceId" :key="detailKey" />
    </el-main>
  </el-container>
  <el-dialog v-model="addFolderVisible" title="新建文件夹" width="30%">
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
  <el-dialog v-model="addInterfaceVisible" title="新建接口" width="30%">
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
</template>

<script setup>
import { ref } from "vue";
import InterfaceDetail from "../views/Interface.vue";
import { Files, Folder } from "@element-plus/icons-vue";
import { getInterfaces } from "../api/interface";
import { ElMessage } from "element-plus";
import { projectStore } from "../store/project";
let detailKey = 0;
const InterfaceId = ref();
let id = 1000;
let addFolderVisible = ref(false);
const addInterfaceVisible = ref(false);
const newFoldername = ref("");
const newInterfacename = ref("");
let tmpData = null;
const dataSource = ref([
  {
    id: 1,
    label: "根目录",
    type: "root",
    children: [],
  },
]);

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
function textColor(data) {
  console.log(data.data.requestMethod);
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
const getInterfaces1 = async () => {
  try {
    const res = await getInterfaces(projectStore().getProjectId);
    if (res.data) {
      const result = {
        id: 1,
        label: "根目录",
        type: "root",
        children: [],
      };
      const tagMap = {};
      res.data.tag.forEach((tag, index) => {
        tagMap[tag] = index + 2;
        result.children.push({
          id: index + 2,
          label: tag,
          type: "contents",
          children: [],
        });
      });
      res.data.interfaces.forEach((interfaceData) => {
        const tagIndex = tagMap[interfaceData.tag];
        const contents = tagIndex ? result.children[tagIndex - 2] : result;
        contents.children.push({
          id: contents.children.length + 1,
          label: interfaceData.name,
          type: "interface",
          data: interfaceData,
        });
      });
      dataSource.value = [result];
      console.log([result]);
    }
  } catch (err) {
    console.log(err);
    ElMessage.error(err);
  }
};
const handleClick = (data) => {
  InterfaceId.value = data.data._id;
  // 为了强制渲染
  detailKey++;
};
const handleAddFolder = () => {
  if (!newFoldername.value) {
    ElMessage.error("请输入文件夹名称");
    return;
  }
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
  if (!newInterfacename.value) {
    ElMessage.error("请输入接口名称");
    return;
  }
  const newChild = {
    id: id++,
    label: newInterfacename.value,
    type: "interface",
    data: { requestMethod: "GET" },
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
  getInterfaces1();
});
onUnmounted(() => {
  document.removeEventListener("contextmenu", handleContextMenu);
});
</script>

<style scoped>
.el-aside {
  border-right: 1px solid #a9a9a97a;
  box-sizing: border-box;
  height: 100%;
  width: 200px;
  margin-left: -10px;
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
