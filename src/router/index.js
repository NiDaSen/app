import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import routes from './routes'

// 引入store文件

// 重写push和replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        if (savedPosition) {
            return savedPosition
        } else {
            return { y: 0 }
        }
    }
})

//全局守卫：前置守卫（在路由跳转之前进行判断）
/*
to =可以获取到你要跳转到的路由信息
from=可以获取到从哪个路由而来的信息
next()放行netx（‘/login’）
*/
router.beforeEach(async (to, from, next) => {
    // 获取token，
    let token = store.state.user.token;
    //获取用户信息
    let userInfo = store.state.user.getUserInfo
    // 判断是否登录
    if (token) {
        //判断登录以后不能挑战登录页面
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {
            // 跳转到其他路由，挑战别的需要重新发请求
            if (userInfo.name) {
                // 有用户信息就放行
                next();
            } else {
                // 没有用户信息派发action
                try {
                    await store.dispatch('user/reqGetUserInfo');
                    next();
                } catch (error) {
                    await store.dispatch('user/logOut');
                    next('/login');
                }
            }
        }

    } else {
        if (to.path == '/trade' || to.path == '/pay' || to.path == '/paySusses' || to.path.indexOf('/center') != -1) {
            //把未登录的时候去而没有去成的信息，存储在地址栏中
            next('/login?redirect=' + to.path);
        } else {
            next();
        }



    }
})





export default router