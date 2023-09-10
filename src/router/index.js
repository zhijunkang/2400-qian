import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
          redirect: '/login'
         //redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: '/dashbord',
                name: "dashbord",
                meta: { title: '系统首页' },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashbord.vue')
            },
            {
                path: "/role",
                name: "role",
                meta: {
                    title: '角色管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/role.vue")
            },
            {
                path: "/agent",
                name: "agent",
                meta: {
                    title: '代理管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Agent.vue")
            },
            {
                path: "/baseform",
                name: "baseform",
                meta: {
                    title: '玩家管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/BaseForm.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '充值管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Tabs.vue")
            },
            {
                path: "/basecharts",
                name: "basecharts",
                meta: {
                    title: '交易管理'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/BaseCharts.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    },
    // {
    //     path: '*',
    //     redirect: '/404'
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 自定义`;
    const role = 'admin';
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;