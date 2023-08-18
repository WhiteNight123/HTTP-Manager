<!--
<template>
  <div>
    <Header></Header>
    <NavSwiper></NavSwiper>
  </div>
</template>

<script setup>
import Header from "../components/common/Header.vue";
import NavSwiper from "../components/home/NavSwiper.vue";
</script>
-->

<template>
  <div class="main">
    <div class="header">
      <el-row>
        <el-col :span="4">
          <el-checkbox v-model="isMock" label="Mock服务器" border/>
        </el-col>
        <el-col :span="4">
          <el-text type="primary">接口前缀</el-text>
        </el-col>
      </el-row>
      <el-row style="width:510px;">
        <el-col :span="4">
          <el-select v-model="reqType">
            <el-option label="GET" value="GET"/>
            <el-option label="POST" value="POST"/>
            <el-option label="PUT" value="PUT"/>
            <el-option label="DEL" value="DELETE"/>
            <el-option label="PAT" value="PATCH"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="reqURL" placeholder="输入请求url" clearable/>
        </el-col>
        <el-col :span="4">
          <el-button type="success" plain @click="sendRequest">发送请求</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">保存接口</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :icon="Refresh" @click="reFresh">刷新</el-button>
        </el-col>
      </el-row>
      <el-row style="width: 510px;">
        <el-col :span="24">
          <el-input v-model="reallyURL" disabled/>
        </el-col>
      </el-row>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Params" name="1">
          <el-text class="mx-1">Path参数</el-text>
          <div>
            <ElTable :data="paramsPath" stripe table-layout="fixed" style="width: 100%">
              <el-table-column label="参数名" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parName"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="参数值" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parValue"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="类型" text-align="center">
                <template #default="scope">
                  <el-select v-model="scope.row.parType" placeholder="请选择">
                    <el-option label="string" value="string"/>
                    <el-option label="integer" value="integer"/>
                    <el-option label="number" value="number"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="说明" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parDescription"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="必填" text-align="center" width="70px">
                <template #default="scope">
                  <el-switch v-model="scope.row.parRequired" :active-value="1" :inactive-value="0"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="70px" text-align="center">
                <template #default="scope">
                  <el-button type="danger" @click="deleteParamsPath(scope.$index)" :icon="Delete" circle/>
                </template>
              </el-table-column>
            </ElTable>
            <ElButton type="primary" text @click="addParamsPath">新增一条params</ElButton>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Body" name="2">
          <el-radio-group v-model="bodyType">
            <el-radio :label="1">json</el-radio>
            <el-radio :label="2">form-data</el-radio>
            <el-radio :label="3">none</el-radio>
            <!--            <el-radio :label="4">x-wwww-form-urlencoded</el-radio>-->
            <!--            <el-radio :label="5">raw</el-radio>-->
          </el-radio-group>
          <div v-if="bodyType===1">
            <el-input
                v-model="bodyJSON"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入JSON数据"
            />
          </div>
          <div v-if="bodyType===2">
            <ElTable :data="bodyFormData" stripe table-layout="fixed" style="width: 100%">
              <el-table-column label="参数名" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parName"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="参数值" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parValue"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="类型" text-align="center">
                <template #default="scope">
                  <el-select v-model="scope.row.parType" placeholder="请选择">
                    <el-option label="string" value="string"/>
                    <el-option label="parameter" value="parameter"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="说明" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parDescription"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="必填" text-align="center" width="70px">
                <template #default="scope">
                  <el-switch v-model="scope.row.parRequired" :active-value="1" :inactive-value="0"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="70px" text-align="center">
                <template #default="scope">
                  <el-button type="danger" @click="deleteBodyFormData(scope.$index)" :icon="Delete" circle/>
                </template>
              </el-table-column>
            </ElTable>
            <ElButton type="primary" text @click="addBodyFormData">新增一条记录</ElButton>
          </div>
        </el-tab-pane>
        <el-tab-pane label="请求头" name="3">
          <div>
            <ElTable :data="reqHeader" stripe table-layout="fixed" style="width: 100%">
              <el-table-column label="参数名" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parName"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="参数值" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parValue"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="类型" text-align="center">
                <template #default="scope">
                  <el-select v-model="scope.row.parType" placeholder="请选择">
                    <el-option label="string" value="string"/>
                    <el-option label="integer" value="integer"/>
                    <el-option label="number" value="number"/>
                    <el-option label="array" value="array"/>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="说明" text-align="center">
                <template #default="scope">
                  <ElInput v-model="scope.row.parDescription"></ElInput>
                </template>
              </el-table-column>
              <el-table-column label="必填" text-align="center" width="70px">
                <template #default="scope">
                  <el-switch v-model="scope.row.parRequired" :active-value="1" :inactive-value="0"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="70px" text-align="center">
                <template #default="scope">
                  <el-button type="danger" @click="deleteReqHeader(scope.$index)" :icon="Delete" circle/>
                </template>
              </el-table-column>
            </ElTable>
            <ElButton type="primary" text @click="addReqHeader">新增一条请求头</ElButton>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane label="备注信息" name="5"></el-tab-pane>
        <el-tab-pane label="前置脚本" name="6"></el-tab-pane>
        <el-tab-pane label="后置脚本" name="7"></el-tab-pane>
        <el-tab-pane label="Mock" name="8"></el-tab-pane>-->
      </el-tabs>
    </div>
    <div class="bottom">
      <el-text class="mx-1" type="primary">返回响应</el-text>
      <json-viewer v-if="req" :value="req" :expand-depth="5"></json-viewer>
      <div v-else >点击"发送请求"按钮获取返回结果</div>
    </div>
  </div>
</template>

<script setup>
import {ArrowDown, Delete, Refresh} from '@element-plus/icons-vue'
import {set} from "@vueuse/core";
import JsonViewer from 'vue-json-viewer'

/**
 * 初始化数据
 */
onMounted(() => {
  addParamsPath()
  addReqHeader();
  addBodyFormData();
})

/**
 * params参数
 * paramsPath:存储数据
 * paramsPathNum:用于反复删除和新增 数组元素不重复
 * addParamsPath:新增一条记录
 * deleteParamsPath:删除一条记录
 */
let paramsPath = ref([])
let paramsPathNum = 0
let addParamsPath = () => {
  paramsPath.value.push({paramsPathNum: paramsPathNum})
  paramsPathNum++
}
const deleteParamsPath = (index) => {
  paramsPath.value.splice(index, 1)
}

/**
 *  请求头参数
 *  reqHeader:存储数据
 *  reqHeaderNum:用于反复删除和新增 数组元素不重复
 *  addReqHeader:新增一条记录
 *  deleteReqHeader:删除一条记录
 */
let reqHeader = ref([])
let reqHeaderNum = 0
let addReqHeader = () => {
  reqHeader.value.push({reqHeaderNum: reqHeaderNum})
  reqHeaderNum++
}
const deleteReqHeader = (index) => {
  reqHeader.value.splice(index, 1)
}

/**
 * form-data参数
 * bodyFormData:存储数据
 * bodyFormDataNum:用于反复删除和新增 数组元素不重复
 * addBodyFormData:新增一条记录
 * deleteBodyFormData:删除一条记录
 */
let bodyFormData = ref([])
let bodyFormDataNum = 0;
const addBodyFormData = () => {
  bodyFormData.value.push({number: bodyFormDataNum})
  bodyFormDataNum++;
}
const deleteBodyFormData = (index) => {
  bodyFormData.value.splice(index, 1)
}

/**
 * 刷新
 */
const reFresh = () => {

  console.log(reqHeader.value)

  // addParamsPath()
  // addReqHeader();
  // addBodyFormData();
  set(reqURL, "")
}

/**
 * mock请求
 */
let isMock = ref(0)
/**
 * 输入URL
 */
let reqURL = ref("")
/**
 * 计算属性，展示请求地址
 */
const reallyURL = computed(() => {
  return "实际发送请求地址：https://" + reqURL.value
})
/**
 * 切换请求参数
 */
let activeName = ref('1')
/**
 * 切换body下的参数
 */
let bodyType = ref(2)
/**
 * body下json数据
 */
let bodyJSON = ref('')
/**
 * 请求类型
 */
let reqType = ref('GET')

/**
 * 响应结果，json展示
 */
let req = ref(
    {
      "code": 200,
      "msg": "成功",
      "data": [
        {"id": "001", "name": "张三"},
        {"id": "002", "name": "李四"},
        {"id": "003", "name": "王五"},
      ]
    }
)


/**
 * 发送请求按钮
 */
const sendRequest = () => {
  // 请求方式
  console.log("请求方式：", reqType.value)
  // 请求URL
  console.log("请求URL：", reqURL.value)
  // activeName
  console.log("activeName：", activeName.value)
  // 通过activeName判断是params还是body
  switch (activeName.value) {
    case '1':
      console.log("paramsPath：", paramsPath.value)
      break
    case '2':
      // 通过bodyType判断是json还是form-data
      switch (bodyType.value) {
        case 1:
          console.log("bodyJSON：", bodyJSON.value)
          break
        case 2:
          console.log("bodyFormData：", bodyFormData.value)
          break
        case 3:
          console.log("none")
      }
      break
  }
  // 请求头
  console.log("请求头：", reqHeader.value)
}


</script>

<style scoped>
.main {
  margin: 100px auto;
  width: 1200px;
  height: 600px;

}
</style>
