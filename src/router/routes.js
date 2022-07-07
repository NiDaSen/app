
export default [

    {
        // 查看订单详情
        name: 'center',
        path: '/center',
        component: () => import('../views/Center'),
        meta: {
            show: true
        },
        children: [
            {
                path: 'myOrder',
                component: () => import('../views/Center/MyOrder')

            },
            {
                path: 'groupOrder',
                component: () => import('../views/Center/GroupOrder')
            },
            // 重定向，一上来访问这个页面的时候重新定向
            {
                path: '/center',
                redirect: '/center/myOrder'
            }
        ]
    },
    {
        // 交易成功的路由
        name: 'paySusses',
        path: '/paySusses',
        component: () => import('../views/PaySuccess'),
        meta: {
            show: true
        }
    },
    {
        // 交易路由
        name: 'pay',
        path: '/pay',
        component: () => import('../views/Pay'),
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/trade') {
                next();
            } else {
                next(from.path);
            }
        }
    },
    {
        // 交易路由
        name: 'trade',
        path: '/trade',
        component: () => import('../views/Trade'),
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/shopCart') {
                next();
            } else {
                next(from.path);
            }
        }
    },
    {
        name: 'shopCart',
        path: '/shopCart',
        component: () => import('../views/ShopCart'),
        meta: {
            show: true
        }
    },
    {
        name: 'addCartSsccess',
        path: '/addCartSsccess',
        component: () => import('../views/AddCartSuccess'),
        meta: {
            show: true
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        //路由懒加载，当路由被访问的时候才加载
        component: () => import('../views/Detail/index.vue'),
        meta: {
            show: true
        }
    },
    {
        path: '/home',
        component: () => import('../views/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: () => import('../views/Login'),
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: () => import('../views/Register'),
        meta: {
            show: false
        }
    },
    {
        path: '/search',
        component: () => import('../views/Search'),
        meta: {
            show: true
        }
    },

    // 重定向，在项目跑起来的时候，访问/立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]