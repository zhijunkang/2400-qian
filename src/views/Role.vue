<template>
  <div>
    <div class="container" style="width: 2500px;">
      <div class="handle-box">
        <el-select v-model="query.Value1" placeholder="请选择" class="handle-select mr10">
          <el-option label="玩家账号" value="3"></el-option>
          <el-option label="玩家ID" value="1"></el-option>
          <el-option label="玩家名称" value="2"></el-option>
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
            property="password"
            width="120"
            label="背包密码">
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
            property="statues"
            label="在线状态"
            width="120"
            sortable>
          <template #default="scope">
            <div v-html="statusName(scope.row.statues)"></div>
          </template>
        </el-table-column>
        <el-table-column
            property="uptime"
            label="离线时间"
            width="100"
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
            property="paysum"
            width="120"
            label="累计充值">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
          <template #default="scope">
            <!--            <el-button circle icon="el-button el-button&#45;&#45;primary" type="buttonm" title="物品发送"  size="small"-->
            <!--                       @click="handleDelete(scope.$index, scope.row)"/>-->
            <!--            <el-button circle icon="el-button el-button&#45;&#45;primary" type="success" title="修改物品"  size="small"-->
            <!--                       @click="handleUpd(scope.$index, scope.row)"/>-->
            <el-button type="primary" title="物品发送" size="small" @click="handleDelete(scope.$index, scope.row)">原物品
            </el-button>
            <el-button type="primary" title="修改物品" size="small" @click="handleUpd(scope.$index, scope.row)">原修改
            </el-button>
            <el-button type="primary" title="物品" size="small" @click="handleUpd(scope.$index, scope.row)">物品</el-button>
            <el-button type="success" title="宠物" size="small" @click="openChongWu(scope.$index, scope.row);">宠物
            </el-button>
            <el-button type="info" title="坐骑" size="small"  @click="openZq(scope.$index, scope.row);">坐骑</el-button>
            <el-button type="warning" title="灵宝" size="small"  @click="openLb(scope.$index, scope.row);">灵宝</el-button>
            <el-button type="danger" title="孩子" size="small"  @click="openHz(scope.$index, scope.row);">孩子</el-button>
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
          <el-input-number v-model.number="formFileds.sum" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button @click="isShowSendGoodsDialog = false;" class="pull-right margin-l-10">取消</el-button>
          <el-button type="primary" @click="handleSendGoods()" class="pull-right">发送</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog
        title="物品修改"
        :visible="changeGoods"
        width="1300px"
        @close="sendGoodsClose" :modelValue="changeGoods">
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
            <el-input type="textarea" :rows="4" @blur="updThis(scope.row)" v-model="scope.row.value"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            property="usetime"
            width="120"
            label="使用次数">
          <template #default="scope">
            <el-input v-model="scope.row.usetime" @blur="updThis(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            property="qhv"
            label="qhv"
            width="80"
            sortable>
          <template #default="scope">
            <el-input v-model="scope.row.qhv" @blur="updThis(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
            property="qht"
            width="80"
            label="qht">
          <template #default="scope">
            <el-input v-model="scope.row.qht" @blur="updThis(scope.row)"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--    召唤兽弹窗-->

    <el-dialog title="召唤兽" :visible="showChongWu" width="30%" @close="closeChongwu" :modelValue="showChongWu">
      <el-table :data="chongwuTableData" border class="table" ref="multipleTable2"
                header-cell-class-name="table-header">
        <el-table-column
            property="sid"
            width="240"
            label="sid">
        </el-table-column>
        <el-table-column
            property="summoningname"
            width="240"
            label="召唤兽名称">
        </el-table-column>
        <el-table-column
            width="80"
            label="修改">
          <el-button type="primary" @click="openChongWuDetail(chongwuTableData)">修改</el-button>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
                <el-button @click="showChongWu = false;" class="pull-right margin-l-10">取 消</el-button>
            </span>
    </el-dialog>

    <el-dialog title="召唤兽属性" :visible="showChongWuDetail" width="50%" @close="closeChongwuDetail"
               :modelValue="showChongWuDetail">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="表单名称">
          <el-input v-model="cwFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="选择器">
          <el-select v-model="cwFrom.region" placeholder="请选择">
            <el-option key="bbk" label="步步高" value="bbk"></el-option>
            <el-option key="xtc" label="小天才" value="xtc"></el-option>
            <el-option key="imoo" label="imoo" value="imoo"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="多选框">
          <el-checkbox-group v-model="cwFrom.type">
            <el-checkbox label="步步高" name="type"></el-checkbox>
            <el-checkbox label="小天才" name="type"></el-checkbox>
            <el-checkbox label="imoo" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框">
          <el-radio-group v-model="cwFrom.resource">
            <el-radio label="步步高"></el-radio>
            <el-radio label="小天才"></el-radio>
            <el-radio label="imoo"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                 <el-button @click="showChongWuDetail = false;" class="pull-right margin-l-10">取 消</el-button>
                <el-button @click="showChongWuDetail = false;" class="pull-right margin-l-10">修改</el-button>
            </span>
    </el-dialog>


    <!--    坐骑弹窗-->
    <el-dialog title="坐骑" :visible="showZq" width="30%" @close="closeZq" :modelValue="showZq">
      <el-table :data="zqTableData" border class="table" ref="multipleTable3"
                header-cell-class-name="table-header">
        <el-table-column
            property="mid"
            width="240"
            label="mid">
        </el-table-column>
        <el-table-column
            property="mountname"
            width="240"
            label="坐骑名称">
        </el-table-column>
        <el-table-column
            width="80"
            label="修改">
          <el-button type="primary" @click="openZqDetail(chongwuTableData)">修改</el-button>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
                <el-button @click="showZq = false;" class="pull-right margin-l-10">取 消</el-button>
            </span>
    </el-dialog>

    <el-dialog title="坐骑属性" :visible="showZqDetail" width="50%" @close="closeZqDetail" :modelValue="showZqDetail">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="表单名称">
          <el-input v-model="cwFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="选择器">
          <el-select v-model="cwFrom.region" placeholder="请选择">
            <el-option key="bbk" label="步步高" value="bbk"></el-option>
            <el-option key="xtc" label="小天才" value="xtc"></el-option>
            <el-option key="imoo" label="imoo" value="imoo"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="多选框">
          <el-checkbox-group v-model="cwFrom.type">
            <el-checkbox label="步步高" name="type"></el-checkbox>
            <el-checkbox label="小天才" name="type"></el-checkbox>
            <el-checkbox label="imoo" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框">
          <el-radio-group v-model="cwFrom.resource">
            <el-radio label="步步高"></el-radio>
            <el-radio label="小天才"></el-radio>
            <el-radio label="imoo"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                 <el-button @click="showZqDetail  = false;" class="pull-right margin-l-10">取 消</el-button>
                <el-button @click="showZqDetail  = false;" class="pull-right margin-l-10">修改</el-button>
            </span>
    </el-dialog>

    <!--    灵宝弹窗-->
    <el-dialog title="灵宝" :visible="showLb" width="30%" @close="closeLb" :modelValue="showLb">
      <el-table :data="lbTableData" border class="table" ref="multipleTable4"
                header-cell-class-name="table-header">
        <el-table-column
            property="lid"
            width="240"
            label="sid">
        </el-table-column>
        <el-table-column
            property="summoningname"
            width="240"
            label="灵宝名称">
        </el-table-column>
        <el-table-column
            width="80"
            label="修改">
          <el-button type="primary" @click="openLbDetail(chongwuTableData)">修改</el-button>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
                <el-button @click="showLb = false;" class="pull-right margin-l-10">取 消</el-button>
            </span>
    </el-dialog>
    <!--    孩子弹窗-->
    <el-dialog title="孩子" :visible="showHz" width="30%" @close="closeHz" :modelValue="showHz">
      <el-table :data="hzTableData" border class="table" ref="multipleTable5"
                header-cell-class-name="table-header">
        <el-table-column
            property="hid"
            width="240"
            label="hid">
        </el-table-column>
        <el-table-column
            property="summoningname"
            width="240"
            label="孩子名称">
        </el-table-column>
        <el-table-column
            width="80"
            label="修改">
          <el-button type="primary" @click="openHzDetail(chongwuTableData)">修改</el-button>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
                <el-button @click="showHz = false;" class="pull-right margin-l-10">取 消</el-button>
            </span>
    </el-dialog>

  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router/dist/vue-router";
import ChongWu from "./ChongWu.vue";
import {fetchData, fetchGoods, getUserGood, updGood, getUserPet,updUserPet, getUserMount,getUserLing,getUserBaby,updUserMount,updUserLing,updUserBaby,updUserGood} from "@/api/index";
import request from "../utils/request";

export default {
  name: "role",
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
      password: '',
      otAreaid: '',
      otAreaname: '',
      otAtid: '',
      ipok: '',
      role_id: '',
      user_id: '',
      userName: '',
      userPwd: '',
      safety: '',
      money: '',
      type: '',
      xianyu: '',
      draw: '',
      unknown: '',
      statues: '',
      goodsid: '',
      sum: 1
    });
    const goods = reactive({
      rolename: '',
      activity: '',
      ipok: '',
      role_id: '',
      user_id: '',
      accountName: '',
      accountPwd: '',
      password: '',
      otAreaid: '',
      otAreaname: '',
      otAtid: '',
      userName: '',
      userPwd: '',
      safety: '',
      money: '',
      type: '',
      xianyu: '',
      draw: '',
      unknown: '',
      statues: '',
      goodsid: '',
      sum: 1
    });
    const rules = reactive({
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
    const showChongWu = ref(false);
    const showChongWuDetail = ref(false);
    const chongwuTableData = ref([]);
    const changeGoods = ref(false);
    const role_name = ref('');
    const showZq = ref(false);
    const showZqDetail = ref(false);
    const showLb = ref(false);
    const showLbDetail = ref(false);
    const showHz = ref(false);
    const showHzDetail = ref(false);
    const zqTableData = ref([]);
    const lbTableData = ref([]);
    const hzTableData = ref([]);


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
        for (const key in response.data) {
          goodsOptions.value.push({
            label: key,
            value: response.data[key]
          });
        }
      }).catch(function (error) {
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
      request.post('/api/sendgoods', formData).then((response) => {
        ElMessage.success('物品发送完成');
        setTimeout(() => {
          isShowSendGoodsDialog.value = false;
        }, 500);
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
        if (key === 'sum') {
          formFileds[key] = 1;
        } else {
          formFileds[key] = row[key];
        }
      }
      isShowSendGoodsDialog.value = true;
    };
    // 删除操作
    const handleUpd = (index, row) => {
      role_name.value = row.rolename
      getUserGood(row.role_id).then((res) => {
        goodsTableData.value = res.data;
      })
      changeGoods.value = true;
    };
    //这是干嘛的？

    const openChongWu = (index, row) => {
      query.value1 = row.role_id;
      //根据角色ID请求获取宠物信息
      getUserPet(query).then((res) => {
        chongwuTableData.value = res.data;
      })
      showChongWu.value = true;
    };
    //关闭修改宠物
    const closeChongwu = () => {
      showChongWu.value = false;
    }

    //打开宠物详情弹框
    const openChongWuDetail = (data) => {
      console.log(data);
      showChongWuDetail.value = true;
    };
    //关闭宠物详情弹框
    const closeChongwuDetail = () => {
      showChongWuDetail.value = false;
    }

    //打开坐骑弹框
    const openZq = (index, row) => {
      query.value1 = row.role_id;
      //根据角色ID请求获取坐骑信息
      getUserMount(query).then((res) => {
        zqTableData.value = res.data;
      })
      showZq.value = true;
    };
    //关闭坐骑弹框
    const closeZq = () => {
      showZq.value = false;
    }

    //打开坐骑详情弹框
    const openZqDetail = (data) => {
      console.log(data);
      showZqDetail.value = true;
    };
    //关闭坐骑详情弹框
    const closeZqDetail = () => {
      showZqDetail.value = false;
    }

    const openLb = (index, row) => {
      query.value1 = row.role_id;
      //根据角色ID请求获灵宝物信息
      getUserLing(query).then((res) => {
        lbTableData.value = res.data;
      })
      showLb.value = true;
    };
    //关闭灵宝情弹框
    const closeLb = () => {
      showLb.value = false;
    }

    //打开孩子弹框
    const openHz = (index, row) => {
      query.value1 = row.role_id;
      //根据角色ID请求获灵宝物信息
      getUserBaby(query).then((res) => {
        hzTableData.value = res.data;
      })
      showHz.value = true;
    };
    //关闭孩子弹框
    const closeHz = () => {
      showHz.value = false;
    }
    const updThis = (row) => {
      let formData = new FormData();
      formData.append('rgid', row.rgid);
      formData.append('value', row.value);
      row.qhv ? formData.append('qhv', row.qhv) : '';
      row.qht ? formData.append('qht', row.qht) : '';
      formData.append('type', row.type);
      formData.append('goodsname', row.goodsname);
      formData.append('skin', row.skin);
      formData.append('usetime', row.usetime);
      formData.append('equipShow', role_name.value);

      request.post('/api/good/updGood', formData).then((res) => {
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
      if (value === 0) return '<span style="color:#40be40">正常</span>'
      if (value === 1) return '<span style="color:red">封停</span>'
    };
    const statusName = (value) => {
      if (value === '在线') return '<span style="color:#40be40">在线</span>'
      if (value === '离线') return '<span style="color:red">离线</span>'
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


    let cwFrom = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: true,
      type: ['步步高'],
      resource: '小天才',
      desc: '',
      options: []
    });


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
      statusName,
      goodsTableData,
      goodPageTotal,
      updThis,
      role_name,
      openChongWu,
      closeChongwu,
      showChongWu,
      chongwuTableData,
      showChongWuDetail,
      closeChongwuDetail,
      openChongWuDetail,
      cwFrom,
      showZq,
      closeZq,
      openZq,
      showZqDetail,
      closeZqDetail,
      openZqDetail,
      showLb,
      closeLb,
      openLb,
      showHz,
      closeHz,
      openHz,
      zqTableData,
      lbTableData,
      hzTableData,
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
