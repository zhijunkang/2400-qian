import{u as e,C as a,D as s,o as r,b as o,e as l,f as t,w as d,E as m,r as u,G as p,p as n,h as i,g as c}from"./vendor.02403aa8.js";import{_ as g,u as f}from"./index.bbefd4ed.js";import{s as b}from"./request.7463563a.js";const w={setup(){const r=e(),o=a({userName:"",password:""}),l=s(null);return f().clearTags(),{param:o,rules:{userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},login:l,submitForm:()=>{l.value.validate((e=>{if(!e)return m.error("验证失败"),!1;{const e=new FormData;e.append("UserName",o.userName),e.append("Password",o.password),b.post("/api/login",e).then((e=>{m.success("登录成功，页面即将跳转"),localStorage.setItem("token",e.data),localStorage.setItem("userName",o.userName),r.push("/dashboard")}))}}))}}}},v={class:"login-wrap"},N={class:"ms-login"},h=(e=>(n("data-v-3b8e7d84"),e=e(),i(),e))((()=>l("div",{class:"ms-title"},"無尽空虚后台",-1))),_={class:"login-btn"},V=c("登录");var y=g(w,[["render",function(e,a,s,m,n,i){const c=u("el-input"),g=u("el-form-item"),f=u("el-button"),b=u("el-form");return r(),o("div",v,[l("div",N,[h,t(b,{model:m.param,rules:m.rules,ref:"login","label-width":"0px",class:"ms-content"},{default:d((()=>[t(g,{prop:"username"},{default:d((()=>[t(c,{modelValue:m.param.userName,"onUpdate:modelValue":a[0]||(a[0]=e=>m.param.userName=e),placeholder:"username"},null,8,["modelValue"])])),_:1}),t(g,{prop:"password"},{default:d((()=>[t(c,{type:"password",placeholder:"password",modelValue:m.param.password,"onUpdate:modelValue":a[1]||(a[1]=e=>m.param.password=e),onKeyup:a[2]||(a[2]=p((e=>m.submitForm()),["enter"]))},null,8,["modelValue"])])),_:1}),l("div",_,[t(f,{type:"primary",onClick:a[3]||(a[3]=e=>m.submitForm())},{default:d((()=>[V])),_:1})])])),_:1},8,["model","rules"])])])}],["__scopeId","data-v-3b8e7d84"]]);export{y as default};