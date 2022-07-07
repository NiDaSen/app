import Vuex from 'vuex';
import Vue from 'vue';
import category from './category';
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

Vue.use(Vuex)

export default new Vuex.Store({
    // 实现模块是开发vuex仓库
    modules: {
        category,//三级菜单渲染
        home,//轮播图的数据
        search,//查询的数组
        detail,//详情页面
        shopCart,//购物车
        user,//登录注册页面
        trade,//获取结算的数据
    }
})

