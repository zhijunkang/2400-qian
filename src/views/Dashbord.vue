<template>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6" v-for="(item, index) in startData" :key="index">
        <el-card shadow="hover" :body-style="{padding: '80px',margin: '0px'}">
          <div :class="item.icon"  style="padding-bottom: 8px; margin-right: 8px; height: 108.800px">
            <i class="el-icon-lx-people grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num" style="width: 155px">{{ item.total }}</div>
              <div>{{ item.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

<!--      <el-col :span="6" :data="startData">-->
<!--        <el-card shadow="hover" :body-style="{padding: '80px',margin: '0px'}">-->
<!--          <div class="grid-content grid-con-2" style="padding-bottom: 8px; margin-right: 8px;">-->
<!--            <i class="el-icon-lx-notice grid-con-icon"></i>-->
<!--            <div class="grid-cont-right">-->
<!--              <div class="grid-num"   property="total">321</div>-->
<!--              <div>物品总类总数</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="6">-->
<!--        <el-card shadow="hover" :body-style="{padding: '80px',margin: '0px'}">-->
<!--          <div class="grid-content grid-con-3"  style="padding-bottom: 8px; margin-right: 8px;">-->
<!--            <i class="el-icon-lx-goods grid-con-icon"></i>-->
<!--            <div class="grid-cont-right">-->
<!--              <div class="grid-num">5000</div>-->
<!--              <div>三日内活跃玩家</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--      <el-col :span="6">-->
<!--        <el-card shadow="hover" :body-style="{padding: '80px',margin: '0px'}">-->
<!--          <div class="grid-content grid-con-3" style="padding-bottom: 8px; margin-right: 8px;">-->
<!--            <i class="el-icon-lx-goods grid-con-icon"></i>-->
<!--            <div class="grid-cont-right">-->
<!--              <div class="grid-num">5000</div>-->
<!--              <div>当前在线玩家</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

    </el-row>

</template>

<script>
import Schart from "vue-schart";
import {stat} from "@/api/index";
import request from "../utils/request";
import {ref} from "vue";
export default {
  name: 'dashboard',
  setup() {
    // 获取表格数据
    const startData = ref([]);
    const getStart = () => {
      stat().then((res) => {
        startData.value = res.data;
        console.log(startData.value);
      }).catch(function (error) {
        console.log(error);
      })
    };
     getStart();
    return {
      startData,
      name: localStorage.getItem('ms_username'),

    };
  },
  components: {
    Schart
  },
  computed: {
    role() {
      return this.name === 'admin' ? '超级管理员' : '普通用户';
    }
  },
  // created() {
  //     this.handleListener();
  //     this.changeDate();
  // },
  // activated() {
  //     this.handleListener();
  // },
  // deactivated() {
  //     window.removeEventListener('resize', this.renderChart);
  //     bus.$off('collapse', this.handleBus);
  // },
  methods: {
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      });
    }

  }
};
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 20px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 160, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
</style>