<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">無尽空虚后台</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.userName" placeholder="username">

          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password"
                    @keyup.enter="submitForm()">

          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {useTagsStore} from '../store/tags'
import {useRouter} from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import request from '../utils/request';
export default {
  setup() {
    const router = useRouter();
    const param = reactive({
      userName: "",
      password: "",
    });

    const rules = {
      userName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {required: true, message: "请输入密码", trigger: "blur"},
      ],
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          const formData = new FormData();
          formData.append('UserName',param.userName);
          formData.append('Password',param.password);
          request.post('/api/adminLogin',formData).then((response) => {
            ElMessage.success("登录成功，页面即将跳转")
            localStorage.setItem('token',response.data)
            localStorage.setItem('userName', param.userName);
            router.push('/role');
          });
        } else {
          ElMessage.error("验证失败");
          return false;
        }
      });
    };

    const tags = useTagsStore();
    tags.clearTags();

    return {
      param,
      rules,
      login,
      submitForm,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/2.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: black;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  /* 使用自定义字体，例如 "Arial", "Helvetica", 或其他 */
  font-family: Arial, sans-serif;

  /* 设置字体大小 */
  font-size: 24px;

  /* 可以添加其他样式，比如颜色、粗细等 */
  color: #333;
  font-weight: bold;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(128, 138, 135, 0.8);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>