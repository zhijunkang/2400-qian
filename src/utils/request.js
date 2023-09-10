import axios from 'axios';
import { ElMessage } from "element-plus";
import {useRouter} from "vue-router";

axios.defaults.withCredentials=true
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000,
     baseURL:"/GameServer/"
    // baseURL:"./"
});
const router = useRouter();
service.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.token = localStorage.getItem('token')
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code===200){
                return response.data;
            }else {
                ElMessage.info(response.data.message);
                return Promise.reject();
            }

        } else {
            if (response.status === 401){
                localStorage.removeItem("ms_username");
                router.push("/login");
            }
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
