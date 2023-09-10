<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.Value1" placeholder="请选择" class="handle-select mr10">
          <el-option label="代理账号" value="3"></el-option>
          <el-option label="代理ID" value="1"></el-option>
          <el-option label="代理名称" value="2"></el-option>
        </el-select>
        <el-input v-model="query.Value2" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column
            property="role_id"
            width="80"
            label="ID">
        </el-table-column>
        <el-table-column
            property="rolename"
            width="120"
            label="角色名">
        </el-table-column>
        <el-table-column
            property="grade"
            width="120"
            label="等级">
          <template #default="scope">
            <div v-html="gradeStatusName(scope.row.grade)"></div>
          </template>
        </el-table-column>
        <el-table-column
            property="accountName"
            width="120"
            label="账号">
        </el-table-column>
        <el-table-column
            property="accountPwd"
            width="120"
            label="密码">
        </el-table-column>
        <el-table-column
            property="otAreaid"
            width="120"
            label="代理ID">
        </el-table-column>
        <el-table-column
            property="otAreaname"
            width="120"
            label="代理名称">
        </el-table-column>
        <el-table-column
            property="otAtid"
            width="120"
            label="代理注册码">
        </el-table-column>
        <el-table-column
            property="uptime"
            label="离线时间"
            width="120"
            sortable>
        </el-table-column>
        <el-table-column
            property="activity"
            width="120"
            label="封停状态">
          <template #default="scope">
            <div v-html="activityStatusName(scope.row.activity)"></div>
          </template>
        </el-table-column>
        <el-table-column
            property="codecard"
            width="120"
            label="仙玉">
        </el-table-column>
        <el-table-column
            property="money"
            width="120"
            label="累计充值">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
          <template #default="scope">
            <el-button circle icon="el-icon-s-promotion" type="success" title="物品发送"  size="small"
                       @click="handleDelete(scope.$index, scope.row)"/>
            <el-button circle icon="el-icon-edit" type="success" title="修改物品"  size="small"
                       @click="handleUpd(scope.$index, scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
                       :page-size="query.pageSize" :total="pageTotal"
                       @current-change="handlePageChange"></el-pagination>
      </div>
    </div>



    <el-dialog
        title="物品发送"
        :visible="isShowSendGoodsDialog"
        width="380px"
        @close="sendGoodsClose" :modelValue="isShowSendGoodsDialog">
      <el-form
          ref="sendGoodsForm"
          :model="formFileds"
          :rules="rules"
          label-width="80px">
        <el-form-item label="角色名" prop="rolename">
          <el-input v-model="formFileds.rolename" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色ID" prop="role_id">
          <el-input v-model="formFileds.role_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="选择物品" prop="goodsid">
          <el-select v-model="formFileds.goodsid" filterable placeholder="可输入搜索">
            <el-option
                v-for="item in goodsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数量" prop="sum">
          <el-input-number v-model.number="formFileds.sum" :min="1" :max="999" ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button @click="isShowSendGoodsDialog = false;" class="pull-right margin-l-10">取消</el-button>
          <el-button type="primary" @click="handleSendGoods()"  class="pull-right">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog
        title="物品修改"
        :visible="changeGoods"
        width="1300px"
        @close="sendGoodsClose"  :modelValue="changeGoods">
      <el-table :data="goodsTableData" border class="table" ref="multipleTable1" header-cell-class-name="table-header">
        <el-table-column
            property="gid"
            width="80"
            label="gid">
        </el-table-column>
        <el-table-column
            property="goodsname"
            width="80"
            label="名称">
        </el-table-column>
        <el-table-column
            property="value"
            width="820"
            label="物品值">
          <template #default="scope">
            <el-input type="textarea" :rows="4"  @blur="updThis(scope.row)" v-model="scope.row.value" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
            property="usetime"
            width="120"
            label="使用次数">
          <template #default="scope">
            <el-input  v-model="scope.row.usetime" @blur="updThis(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            property="qhv"
            label="qhv"
            width="80"
            sortable>
          <template #default="scope">
            <el-input  v-model="scope.row.qhv" @blur="updThis(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            property="qht"
            width="80"
            label="qht">
          <template #default="scope">
            <el-input  v-model="scope.row.qht" @blur="updThis(scope.row)"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router/dist/vue-router";
import {fetchData,fetchGoods,getUserGood,updGood} from "@/api/index";
import request from "../utils/request";

export default {
  name: "agent",
  setup() {
    const query = reactive({
      Value2: "",
      Value1: "1",
      pageNum: 1,
      pageSize: 10,
    });
    const formFileds = reactive({
      rolename: '',
      activity: '',
      accountName: '',
      accountPwd: '',
      otAreaid:'',
      otAreaname:'',
      otAtid:'',
      ipok:'',
      role_id: '',
      user_id: '',
      userName: '',
      userPwd: '',
      safety: '',
      password: '',
      money: '',
      type: '',
      xianyu: '',
      draw: '',
      unknown: '',
      statues:'',
      goodsid:'',
      sum:1
    });
    const goods = reactive({
      rolename: '',
      activity: '',
      ipok:'',
      role_id: '',
      user_id: '',
      accountName: '',
      accountPwd: '',
      otAreaid:'',
      otAreaname:'',
      otAtid:'',
      userName: '',
      userPwd: '',
      safety: '',
      password: '',
      money: '',
      type: '',
      xianyu: '',
      draw: '',
      unknown: '',
      statues:'',
      goodsid:'',
      sum:1
    });
    const rules= reactive( {
      password: [
        {required: true, message: '解锁密码不能为空', trigger: 'blur'},
        {min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur"}
      ],
          type: [
        {required: true, message: '请选择充值类型'}
      ],
          money: [
        {required: true, message: '请输入充值金额', trigger: 'blur'},
        {type: 'number', message: '充值金额必须为数字'}
      ],
          xianyu: [
        {required: true, message: '请输入仙玉数量', trigger: 'blur'},
        {type: 'number', message: '仙玉数量必须为数字'}
      ],
          goodsid: [
        {required: true, message: '请选择物品', trigger: 'blur'}
      ],
          sum: [
        {required: true, message: '请输入物品数量', trigger: 'blur'},
        {type: 'number', message: '物品数量必须为数字'}
      ]
    })
    const tableData = ref([]);
    const goodsTableData = ref([]);
    const goodsOptions = ref([]);
    const pageTotal = ref(0);
    const goodPageTotal = ref(0);
    const isShowSendGoodsDialog = ref(false);
    const changeGoods = ref(false);
    const role_name = ref('');
    // 获取表格数据
    const getData = () => {
      fetchData(query).then((res) => {
        tableData.value = res.data.list;
        pageTotal.value = res.data.total || 0;
      }).catch(function (error) {
        console.log(error);
      })
    };
    const getGoods = () => {
      fetchGoods().then((response) => {
        for (const key in response.data){
          goodsOptions.value.push({
            label: key,
            value: response.data[key]
          });
        }
      }).catch(function(error){
        console.log(error);
      })

    };
    getData();
    getGoods();
    const sendGoodsClose = () => {
      // 清空编辑表单
      isShowSendGoodsDialog.value = false;
      changeGoods.value = false;
    }
    const handleSendGoods = () => {
      // 清空编辑表单
      let formData = new FormData();
      formData.append('Value1', formFileds.rolename);
      formData.append('Value2', formFileds.goodsid);
      formData.append('Value3', formFileds.sum);
      request.post('/api/sendgoods',formData).then((response) => {
        ElMessage.success('物品发送完成');
        setTimeout(() =>{
          isShowSendGoodsDialog.value = false;
        },500);
      })
    }
    // 查询操作
    const handleSearch = () => {
      query.pageNum = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageNum = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index, row) => {
      for (let key in formFileds) {
        if (key === 'sum'){
          formFileds[key] = 1;
        } else {
         formFileds[key] = row[key];
        }
      }
      isShowSendGoodsDialog.value = true;
    };
    // 删除操作
    const handleUpd = (index, row) => {
      role_name.value=row.rolename
      getUserGood(row.role_id).then((res) => {
        goodsTableData.value = res.data;
      })
      changeGoods.value = true;
    };
    const updThis = (row) => {
      let formData = new FormData();
      formData.append('rgid', row.rgid);
      formData.append('value', row.value);
      row.qhv?formData.append('qhv', row.qhv):'';
      row.qht?formData.append('qht',row.qht):'';
      formData.append('type', row.type);
      formData.append('goodsname', row.goodsname);
      formData.append('skin', row.skin);
      formData.append('usetime', row.usetime);
      formData.append('equipShow', role_name.value);

      request.post('/api/good/updGood',formData).then((res) => {
        ElMessage.success('修改成功');
      })
      changeGoods.value = true;
    };
    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      name: "",
      address: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };
    const activityStatusName = (value) => {
      if (value === 0) return '<span style="color:green">正常</span>'
      if (value === 1) return '<span style="color:red">封停</span>'
    };
    const gradeStatusName = (value) => {
      if (value <= 102) {
        return '<span style="color:#66CD00">0转' + value + '级</span>'
      } else if (value <= 210) {
        return '<span style="color:#FF6E00">1转' + (value - 102 + 14) + '级</span>'
      } else if (value <= 338) {
        return '<span style="color:#3EDFEC">2转' + (value - 210 + 14) + '级</span>'
      } else if (value <= 459) {
        return '<span style="color:#FF0000">3转' + (value - 338 + 59) + '级</span>'
      }
      return '<span style="color:#9B30FF">飞升' + (value - 459 + 139) + '级</span>'
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      rules,
      form,
      formFileds,
      isShowSendGoodsDialog,
      handleSendGoods,
      goodsOptions,
      sendGoodsClose,
      handleSearch,
      handlePageChange,
      handleDelete,
      changeGoods,
      handleUpd,
      handleEdit,
      saveEdit,
      activityStatusName,
      gradeStatusName,
      goodsTableData,
      goodPageTotal,
      updThis,
      role_name,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.el-form {
  padding: 0 10px;
}
.el-date-editor {
  width: 100% !important;
}
.search-select {
  width: 100px !important;
}
.el-select {
  width: 240px;
}
.pwdalert {
  margin-bottom: 15px;
}
</style>
