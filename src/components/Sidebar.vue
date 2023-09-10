<template>
  <div class="sidebar">
<!--    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse"-->
<!--             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>-->
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {computed} from "vue";
import {useSidebarStore} from '../store/sidebar'
import {useRoute} from "vue-router";

export default {
  setup() {
    const items = [
      {
        icon: "el-icon-lx-redpacket_fill",
        index: "/dashbord",
        title: "系统首页",
      },
      {
        icon: "el-icon-lx-redpacket_fill",
        index: "/role",
        title: "角色管理",
      },
      {
        icon: "el-icon-lx-redpacket_fill",
        index: "/agent",
        title: "代理管理",
      },
      {
        icon: 'el-icon-menu',
        index: '2',
        title: '玩家管理',
        subs: [
          {
            index: '/baseform',
            title: '玩家信息管理'
          },
          {
            index: '/tabs',
            title: '充值信息管理'
          }
          ,
          {
            index: '/basecharts',
            title: '交易信息管理'
          }
        ]
      },
    ];
    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    const sidebar = useSidebarStore();

    return {
      items,
      onRoutes,
      sidebar,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;

}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
  background-image: url(../assets/img/demo.jpg);
}

.sidebar > ul {
  height: 100%;
}
</style>
