import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import { Carousel, CarouselItem } from 'element-ui';
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);


// 三级联动组件--全局组件
import TypeNav from './components/TypeNav/index.vue'
Vue.component(TypeNav.name, TypeNav)
// 引用轮播图全局的，第一个参数组件名字，第二个参数是哪个组件
import Carousels from './components/Carousels/index.vue'
Vue.component(Carousels.name, Carousels)
// 按需引入路由
import router from './router/index'
// 引入vuex中的store
import store from './store/index'
// 引入mock
import './mock/mockServer'
// 引入分页Pagination
import Pagination from './components/Pagination/index.vue'
Vue.component(Pagination.name, Pagination)
//引入图片懒加载
import ChenJie from './assets/CJ.png'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: ChenJie
})
// 引入全局的api
import * as api from './api/index'
// 引入element库
import { Button, Select, MessageBox, } from 'element-ui';
// 设置为全局的
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
// 挂载原型上，element注册的组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入全局校验数据
import './plugins/validate.js'


new Vue({
  render: h => h(App),
  router,//注册路由,所有的组件中都拥有$router,$router属性
  store,//注册仓库:组件实例的身上会多一个$store属性
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = api;
  }
}).$mount('#app')
