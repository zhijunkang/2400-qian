import{u as e,G as a,C as s,o as r,b as o,e as l,f as t,w as d,E as m,r as u,H as p,p as n,h as i,g as c}from"./vendor.5d3966ca.js";import{_ as f,u as g}from"./index.32ff0ca4.js";import{s as w}from"./request.48509952.js";const v={setup(){const r=e(),o=a({userName:"",password:""}),l=s(null);return g().clearTags(),{param:o,rules:{userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},login:l,submitForm:()=>{l.value.validate((e=>{if(!e)return m.error("验证失败"),!1;{const e=new FormData;e.append("UserName",o.userName),e.append("Password",o.password),w.post("/api/adminLogin",e).then((e=>{m.success("登录成功，页面即将跳转"),localStorage.setItem("token",e.data),localStorage.setItem("userName",o.userName),r.push("/role")}))}}))}}}},b={class:"login-wrap"},N={class:"ms-login"},_=(e=>(n("data-v-518d3fcd"),e=e(),i(),e))((()=>l("div",{class:"ms-title"},"無尽空虚后台",-1))),h={class:"login-btn"},V=c("登录");var y=f(v,[["render",function(e,a,s,m,n,i){const c=u("el-input"),f=u("el-form-item"),g=u("el-button"),w=u("el-form");return r(),o("div",b,[l("div",N,[_,t(w,{model:m.param,rules:m.rules,ref:"login","label-width":"0px",class:"ms-content"},{default:d((()=>[t(f,{prop:"username"},{default:d((()=>[t(c,{modelValue:m.param.userName,"onUpdate:modelValue":a[0]||(a[0]=e=>m.param.userName=e),placeholder:"username"},null,8,["modelValue"])])),_:1}),t(f,{prop:"password"},{default:d((()=>[t(c,{type:"password",placeholder:"password",modelValue:m.param.password,"onUpdate:modelValue":a[1]||(a[1]=e=>m.param.password=e),onKeyup:a[2]||(a[2]=p((e=>m.submitForm()),["enter"]))},null,8,["modelValue"])])),_:1}),l("div",h,[t(g,{type:"primary",onClick:a[3]||(a[3]=e=>m.submitForm())},{default:d((()=>[V])),_:1})])])),_:1},8,["model","rules"])])])}],["__scopeId","data-v-518d3fcd"]]);export{y as default};
