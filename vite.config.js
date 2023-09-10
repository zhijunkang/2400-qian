import vue from '@vitejs/plugin-vue'
import path from 'path'
export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js','element-plus/lib/locale/lang/zh-cn']
    },
    resolve: {
        // https://cn.vitejs.dev/config/#resolve-alias
        alias: {
            // 设置路径
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src')
        },
        // https://cn.vitejs.dev/config/#resolve-extensions extensions 页面引入是后缀省略   router、其他引的地方 文件加上.vue 会有只能提示
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
        port: 8081,
        // host: true,
        host: 'localhost',
        open: true,
        proxy: {
            // https://cn.vitejs.dev/config/#server-proxy
            // https://cn.vitejs.dev/config/#server-proxy
            '/GameServer': {
                target: 'http://localhost:8083',
                changeOrigin: true,
                pathRewrite:{
                    '^/GameServer':'' //重写api，把api变成空字符，因为我们真正请求的路径是没有api的
                }
            }
        },
    },
}