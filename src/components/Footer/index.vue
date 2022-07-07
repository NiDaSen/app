<template>
    <!-- 底部 -->
    <div class="footer" v-show="">
        <div class="footer-container">
            <div class="footerList">
                <div class="footerItem">
                    <h4>购物指南</h4>
                    <ul class="footerItemCon">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行/团购</li>
                        <li>常见问题</li>
                        <li>购物指南</li>
                    </ul>

                </div>
                <div class="footerItem">
                    <h4>配送方式</h4>
                    <ul class="footerItemCon">
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                        <li>海外配送</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>支付方式</h4>
                    <ul class="footerItemCon">
                        <li>货到付款</li>
                        <li>在线支付</li>
                        <li>分期付款</li>
                        <li>邮局汇款</li>
                        <li>公司转账</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>售后服务</h4>
                    <ul class="footerItemCon">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>返修/退换货</li>
                        <li>取消订单</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>特色服务</h4>
                    <ul class="footerItemCon">
                        <li>夺宝岛</li>
                        <li>DIY装机</li>
                        <li>延保服务</li>
                        <li>尚品汇E卡</li>
                        <li>尚品汇通信</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>帮助中心</h4>
                    <img src="./images/wx_cz.jpg">
                </div>
            </div>
            <div class="copyright">
                <ul class="helpLink">
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>联系我们
                        <span class="space"></span>
                    </li>
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>商家入驻
                        <span class="space"></span>
                    </li>
                    <li>营销中心
                        <span class="space"></span>
                    </li>
                    <li>友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>营销中心
                        <span class="space"></span>
                    </li>
                    <li>友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们</li>
                </ul>
                <p>地址：北京市昌平区宏福科技园综合楼6层</p>
                <p>京ICP备19006430号</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MyFooters',
    };
</script>

<style scoped>
    .floor {
        margin-top: 15px;
    }

    .floor .py-container {
        width: 1200px;
        margin: 0 auto;
    }

    .floor .py-container .title .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
    }

    .floor .py-container .title .fr {
        float: right;
    }

    .floor .py-container .title .fr .nav-tabs {
        margin: 10px 0 0;
        display: inline-block;
    }

    .floor .py-container .title .fr .nav-tabs li {
        float: left;
        line-height: 18px;
    }

    .floor .py-container .title .fr .nav-tabs li a {
        padding-top: 1px;
        font-weight: 400;
        background-color: #fff;
    }

    .floor .py-container .title .fr .nav-tabs li a::after {
        content: "|";
        padding: 0 10px;
    }

    .floor .py-container .title .fr .nav-tabs li:nth-child(7) a::after {
        content: "";
    }

    .floor .py-container .title .fr .nav-tabs li.active a {
        color: #e1251b;
    }

    .floor .py-container .tab-content {
        border-top: 2px solid #c81623;
        border-bottom: 1px solid #e4e4e4;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 {
        height: 360px;
        display: flex;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .blockgary {
        width: 210px;
        height: 100%;
        background: #f7f7f7;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .blockgary .jd-list {
        padding: 15px 0;
        overflow: hidden;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .blockgary .jd-list li {
        list-style-type: none;
        float: left;
        width: 40%;
        margin: 0 10px;
        border-bottom: 1px solid #e4e4e4;
        text-align: center;
        line-height: 26px;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .blockgary img {
        width: 100%;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .floorBanner {
        width: 330px;
        height: 100%;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .split {
        width: 220px;
        height: 100%;
        position: relative;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-x-line {
        position: absolute;
        background: #e4e4e4;
        width: 220px;
        height: 1px;
        top: 180px;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit {
        width: 100%;
        height: 50%;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit img {
        width: 100%;
        height: 100%;
        transition: all 400ms;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit img:hover {
        opacity: 0.8;
    }

    .floor .py-container .tab-content .tab-pane .floor-1 .center {
        border: 1px solid #e4e4e4;
    }

    .brand {
        margin: 10px 0;
    }

    .brand .py-container {
        width: 1200px;
        margin: 0 auto;
    }

    .brand .py-container .brand-list {
        overflow: hidden;
        padding: 15px 0;
        background: #f7f7f7;
        line-height: 18px;
    }

    .brand .py-container .brand-list .brand-item {
        width: 120px;
        float: left;
        height: 37px;
    }

    .brand .py-container .brand-list .brand-item img {
        border-left: 1px dotted #ccc;
        padding: 0 10px;
    }

    .brand .py-container .brand-list .brand-item:first-child img {
        border-left: 0;
    }

    .footer {
        background-color: #eaeaea;
    }

    .footer .footer-container {
        width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
    }

    .footer .footer-container .footerList {
        padding: 20px;
        border-bottom: 1px solid #e4e1e1;
        border-top: 1px solid #e4e1e1;
        overflow: hidden;
        padding-left: 40px;
    }

    .footer .footer-container .footerList .footerItem {
        width: 16.6666667%;
        float: left;
    }

    .footer .footer-container .footerList .footerItem h4 {
        font-size: 14px;
    }

    .footer .footer-container .footerList .footerItem .footerItemCon li {
        line-height: 18px;
    }

    .footer .footer-container .footerList .footerItem:last-child img {
        width: 121px;
    }

    .footer .footer-container .copyright {
        padding: 20px;
    }

    .footer .footer-container .copyright .helpLink {
        text-align: center;
    }

    .footer .footer-container .copyright .helpLink li {
        display: inline;
    }

    .footer .footer-container .copyright .helpLink li .space {
        border-left: 1px solid #666;
        width: 1px;
        height: 13px;
        background: #666;
        margin: 8px 10px;
    }

    .footer .footer-container .copyright p {
        margin: 10px 0;
        text-align: center;
    }
</style>