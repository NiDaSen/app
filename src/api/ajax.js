import axios from "axios";
// 引入进度条,start:进度条开始   done:进度条结束
import nprogress from "nprogress";
// 引入进度条的样式
/* 可以调整颜色进度条 去这个css文件中*/
import 'nprogress/nprogress.css';
// 引入store下的detail文件
import store from "../store/index"

//axios的二次封装(requests就是axios)
const requests = axios.create({
    // 基础路径，发请求的时候，路径当中会出现api
    // baseURL: '/api',
    // 代表请求超时的时间5s，超过5s了就请求失败了
    timeout: 5000,
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到
requests.interceptors.request.use((config) => {
    // config：配置对象，对象里边有一个很重要的属性headers请求头
    if (store.state.detail.uuid) {
        //给请求头添加一个字段，和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid
    }
    // 根据token获取用户信息token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start()
    return config;
}, (error) => new Promise(new Error(error)))

// 响应拦截器
requests.interceptors.response.use((resolve) => {
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到,可以做一些事情
    // 进度条结束
    nprogress.done();
    return resolve.data;
}, (error) => {
    // 响应失败的回调函数,返回pengding状态的promise  直接终端promise链
    // return Promise.reject(new Error('failed to intercept'));
    return new Promise(() => { });
})

export default requests;