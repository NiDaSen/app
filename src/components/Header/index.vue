<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!getName.nickName">
                        <span>请</span>
                        <router-link to="/Login">登录</router-link>
                        <router-link to="/Register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{getName.nickName}}</a>|
                        <a @click="logOut">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center/myOrder">我的订单</router-link>
                    <router-link to="/shopCart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo">
                    <img src="./images/logo.png" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        name: "MyHeader",
        data() {
            return {
                keyword: "",//获取输入框的数据
            };
        },
        computed: {
            getName() {
                return this.$store.state.user.getUserInfo
            }
        },
        methods: {
            // 搜索按钮的回调函数，需要向search路由去跳转
            goSearch() {
                // 参数的合并
                if (this.$route.query) {
                    // 设置路由跳转地址
                    let location = { path: "/search", };
                    // 传入输入框的参数
                    let query = { keyword: this.keyword || undefined }
                    // 用展开运算符合并对象，让参数合并
                    location.query = {
                        ...this.$route.query, ...query
                    };
                    // 通过路由跳转传入参数，发送axios请求，请求数据
                    this.$router.push(location)
                }
            },
            // 退出登录
            async logOut() {
                try {
                    // 退出成功
                    await this.$store.dispatch('user/logOut');
                    // 回到首页
                    this.$router.push('/home')
                } catch (error) {
                    console.log(error.message);
                }
            }
        },
        mounted() {
            //移除面包屑的时候需要重置输入框的文字，通过全局事件总线的方法传过来
            this.$bus.$on('removeKeyword', () => {
                this.keyword = '';
            });

        },
    };
</script>
<style scoped>
    .header>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;
    }

    .header>.top .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }

    .header>.top .container .loginList {
        float: left;
    }

    .header>.top .container .loginList p {
        float: left;
        margin-right: 10px;
    }

    .header>.top .container .loginList p .register {
        border-left: 1px solid #b3aeae;
        padding: 0 5px;
        margin-left: 5px;
    }

    .header>.top .container .typeList {
        float: right;
    }

    .header>.top .container .typeList a {
        padding: 0 10px;
    }

    .header>.top .container .typeList a+a {
        border-left: 1px solid #b3aeae;
    }

    .header>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }

    .header>.bottom .logoArea {
        float: left;
    }

    .header>.bottom .logoArea .logo img {
        width: 175px;
        margin: 25px 45px;
    }

    .header>.bottom .searchArea {
        float: right;
        margin-top: 35px;
    }

    .header>.bottom .searchArea .searchForm {
        overflow: hidden;
    }

    .header>.bottom .searchArea .searchForm input {
        box-sizing: border-box;
        width: 490px;
        height: 32px;
        padding: 0px 4px;
        border: 2px solid #ea4a36;
        float: left;
    }

    .header>.bottom .searchArea .searchForm input:focus {
        outline: none;
    }

    .header>.bottom .searchArea .searchForm button {
        height: 32px;
        width: 68px;
        background-color: #ea4a36;
        border: none;
        color: #fff;
        float: left;
        cursor: pointer;
    }

    .header>.bottom .searchArea .searchForm button:focus {
        outline: none;
    }
</style>