<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="searchQuery.categoryName">
              {{ searchQuery.categoryName }}
              <i @click="deleteMian">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-show="$route.query.keyword">
              {{ $route.query.keyword }}
              <i @click="removeKeyword">x</i>
              <!-- 关键字的面包屑 -->
            </li>

            <li class="with-x" v-show="searchQuery.trademark">
              {{ searchQuery.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
              <!-- 关键字的面包屑 -->
            </li>

            <li
              class="with-x"
              v-for="(attrProps, index) in searchQuery.props"
              :key="index"
            >
              {{ attrProps.split(":")[1] }}
              <i @click="removeAttrsProps(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          :attrsList="reqSearchInfo.attrsList"
          :trademarkList="reqSearchInfo.trademarkList"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: izSynthesize }" @click="changeSort('1')">
                  <a
                    >综合<span v-show="isAscendingSort && izSynthesize">👆</span
                    ><span v-show="isDescendingOrder && izSynthesize"
                      >👇</span
                    ></a
                  >
                </li>
                <li :class="{ active: isPrice }" @click="changeSort('2')">
                  <a
                    >价格<span v-show="isAscendingSort && isPrice">👆</span
                    ><span v-show="isDescendingOrder && isPrice">👇</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="good in reqSearchInfo.goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;&nbsp;</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >Apple苹果iPhone
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a target="_blank" class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchQuery.pageNo"
            :pageSize="searchQuery.pageSize"
            :total="reqSearchInfo.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 双向数据绑定给数据初始化
      searchQuery: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  computed: {
    // 获取数据，用vuex
    ...mapState("search", ["reqSearchInfo"]),
    izSynthesize() {
      return this.searchQuery.order.indexOf("1") != -1;
    },
    isPrice() {
      return this.searchQuery.order.indexOf("2") != -1;
    },
    isAscendingSort() {
      //升序
      return this.searchQuery.order.indexOf("asc") != -1;
    },
    isDescendingOrder() {
      //降序
      return this.searchQuery.order.indexOf("desc") != -1;
    },
  },
  beforeMount() {
    // 把对象合并 后面的会合并到前面的   后面的数据会覆盖前面的数据
    Object.assign(this.searchQuery, this.$route.query);
  },
  watch: {
    // 监视$route是否变换，一变换就重新加载
    $route: {
      deep: true,
      handler() {
        // 清空id
        this.searchQuery.category1Id = undefined;
        this.searchQuery.category2Id = undefined;
        this.searchQuery.category3Id = undefined;
        // 再次发请求之前整理带给服务器的参数，双向数据绑定给他重新赋值参数
        Object.assign(this.searchQuery, this.$route.query);
        // 再次发ajax请求
        this.getName();
      },
    },
  },
  async mounted() {
    // 一挂载就发请求，请求数据渲染页面
    this.getName();
    this.$bus.$on("trademarkMianbao", this.addTrademark);
    this.$bus.$on("addAttrs", this.addAttrs);
  },
  methods: {
    // 发请求，请求数据，多个地方用到
    getName() {
      this.$store.dispatch("search/searchInfo", this.searchQuery);
    },
    // 面包屑删除
    deleteMian() {
      this.searchQuery.categoryName = undefined;
      this.searchQuery.category1Id = undefined;
      this.searchQuery.category2Id = undefined;
      this.searchQuery.category3Id = undefined;
      if (this.$route.query.keyword) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: this.$route.query.keyword,
          },
        });
      } else {
        this.$router.push({ path: "/search" });
      }
      this.getName();
    },
    // 面包屑关键字删除
    removeKeyword() {
      this.searchQuery.keyword = undefined;

      if (this.$route.query.hasOwnProperty("categoryName")) {
        this.$router.push({
          path: "/search",
          query: {
            categoryName: this.$route.query.categoryName,
            category1Id: this.$route.query.category1Id,
            category2Id: this.$route.query.category2Id,
            category3Id: this.$route.query.category3Id,
          },
        });
      } else {
        this.$router.push({
          path: "/search",
        });
      }

      this.getName();
      // 移除头部的input框数据
      this.$bus.$emit("removeKeyword");
    },
    //点击标签名字添加到面包屑
    addTrademark(trademark) {
      this.searchQuery.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getName();
    },
    //移除点击名字查询面包屑
    removeTrademark() {
      this.searchQuery.trademark = "";
      this.getName();
    },
    // 平台售卖属性的添加
    addAttrs(attrs, attrValue) {
      let addProps = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      if (this.searchQuery.props.indexOf(addProps) == -1) {
        this.searchQuery.props.push(addProps);
      }
      this.getName();
    },
    //  平台售卖面包屑的删除
    removeAttrsProps(index) {
      this.searchQuery.props.splice(index, 1);
      this.getName();
    },
    // 排序
    changeSort(orderId) {
      let orders0 = this.searchQuery.order.split(":")[0];
      let orders1 = this.searchQuery.order.split(":")[1];
      let newOrder = "";
      if (orders0 == orderId) {
        if (orders1 == "desc") {
          orders1 = "asc";
          newOrder = orders0 + ":" + orders1;
        } else {
          orders1 = "desc";
          newOrder = orders0 + ":" + orders1;
        }
      } else {
        newOrder = `${orderId}:${"desc"}`;
      }
      this.searchQuery.order = newOrder;
      this.getName();
    },
    // 分页的点击
    getPageNo(pageNo) {
      this.searchQuery.pageNo = pageNo;
      this.getName();
    },
  },
};
</script>

<style scoped>
.main {
  margin: 10px 0;
}

.main .py-container {
  width: 1200px;
  margin: 0 auto;
}

.main .py-container .bread {
  margin-bottom: 5px;
  overflow: hidden;
}

.main .py-container .bread .sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}

.main .py-container .bread .sui-breadcrumb li {
  display: inline-block;
  line-height: 18px;
}

.main .py-container .bread .sui-breadcrumb li a {
  color: #666;
  text-decoration: none;
}

.main .py-container .bread .sui-breadcrumb li a:hover {
  color: #4cb9fc;
}

.main .py-container .bread .sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}

.main .py-container .bread .sui-tag .with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}

.main .py-container .bread .sui-tag .with-x i {
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.main .py-container .bread .sui-tag .with-x:hover {
  color: #28a3ef;
}

.main .py-container .selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;
}

.main .py-container .selector .logo {
  border-top: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
}

.main .py-container .selector .logo .key {
  padding-bottom: 87px !important;
}

.main .py-container .selector .type-wrap {
  margin: 0;
  position: relative;
  border-top: 1px solid #ddd;
  overflow: hidden;
}

.main .py-container .selector .type-wrap .key {
  width: 100px;
  background: #f1f1f1;
  line-height: 26px;
  text-align: right;
  padding: 10px 10px 0 15px;
  float: left;
}

.main .py-container .selector .type-wrap .value {
  overflow: hidden;
  padding: 10px 0 0 15px;
  color: #333;
  margin-left: 120px;
  padding-right: 90px;
}

.main .py-container .selector .type-wrap .value .logo-list li {
  float: left;
  border: 1px solid #e4e4e4;
  margin: -1px -1px 0 0;
  width: 105px;
  height: 52px;
  text-align: center;
  line-height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  color: #e1251b;
  font-style: italic;
  font-size: 14px;
}

.main .py-container .selector .type-wrap .value .logo-list li img {
  max-width: 100%;
  vertical-align: middle;
}

.main .py-container .selector .type-wrap .value .type-list li {
  float: left;
  display: block;
  margin-right: 30px;
  line-height: 26px;
}

.main .py-container .selector .type-wrap .value .type-list li a {
  text-decoration: none;
  color: #666;
}

.main .py-container .selector .type-wrap .ext {
  position: absolute;
  top: 10px;
  right: 10px;
}

.main .py-container .selector .type-wrap .ext .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 0 10px;
  background: #fff;
  border: 1px solid #d5d5d5;
}

.main .py-container .selector .type-wrap .ext a {
  color: #666;
}

.main .py-container .details {
  margin-bottom: 5px;
}

.main .py-container .details .sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}

.main .py-container .details .sui-navbar .filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}

.main .py-container .details .sui-navbar .filter .sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}

.main .py-container .details .sui-navbar .filter .sui-nav li {
  float: left;
  line-height: 18px;
}

.main .py-container .details .sui-navbar .filter .sui-nav li a {
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}

.main .py-container .details .sui-navbar .filter .sui-nav li.active a {
  background: #e1251b;
  color: #fff;
}

.main .py-container .details .goods-list {
  margin: 20px 0;
}

.main .py-container .details .goods-list ul {
  display: flex;
  flex-wrap: wrap;
}

.main .py-container .details .goods-list ul li {
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}

.main .py-container .details .goods-list ul li .list-wrap .p-img {
  padding-left: 15px;
  width: 215px;
  height: 255px;
}

.main .py-container .details .goods-list ul li .list-wrap .p-img a {
  color: #666;
}

.main .py-container .details .goods-list ul li .list-wrap .p-img a img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

.main .py-container .details .goods-list ul li .list-wrap .price {
  padding-left: 15px;
  font-size: 18px;
  color: #c81623;
}

.main .py-container .details .goods-list ul li .list-wrap .price strong {
  font-weight: 700;
}

.main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: -5px;
}

.main .py-container .details .goods-list ul li .list-wrap .attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.main .py-container .details .goods-list ul li .list-wrap .attr a {
  color: #333;
  text-decoration: none;
}

.main .py-container .details .goods-list ul li .list-wrap .commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}

.main .py-container .details .goods-list ul li .list-wrap .commit span {
  font-weight: 700;
  color: #646fb0;
}

.main .py-container .details .goods-list ul li .list-wrap .operate {
  padding: 12px 15px;
}

.main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}

.main
  .py-container
  .details
  .goods-list
  ul
  li
  .list-wrap
  .operate
  .btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}

.main
  .py-container
  .details
  .goods-list
  ul
  li
  .list-wrap
  .operate
  .btn-bordered:hover {
  border: 1px solid #666;
  color: #fff !important;
  background-color: #666;
  text-decoration: none;
}

.main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
  border: 1px solid #e1251b;
  color: #e1251b;
}

.main
  .py-container
  .details
  .goods-list
  ul
  li
  .list-wrap
  .operate
  .btn-danger:hover {
  border: 1px solid #e1251b;
  background-color: #e1251b;
  color: white !important;
  text-decoration: none;
}

.main .py-container .details .page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  float: right;
}

.main .py-container .details .page .sui-pagination {
  margin: 18px 0;
}

.main .py-container .details .page .sui-pagination ul {
  margin-left: 0;
  margin-bottom: 0;
  vertical-align: middle;
  width: 490px;
  float: left;
}

.main .py-container .details .page .sui-pagination ul li {
  line-height: 18px;
  display: inline-block;
}

.main .py-container .details .page .sui-pagination ul li a {
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #e0e9ee;
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}

.main .py-container .details .page .sui-pagination ul li.active a {
  background-color: #fff;
  color: #e1251b;
  border-color: #fff;
  cursor: default;
}

.main .py-container .details .page .sui-pagination ul li.prev a {
  background-color: #fafafa;
}

.main .py-container .details .page .sui-pagination ul li.disabled a {
  color: #999;
  cursor: default;
}

.main .py-container .details .page .sui-pagination ul li.dotted span {
  margin-left: -1px;
  position: relative;
  float: left;
  line-height: 18px;
  text-decoration: none;
  background-color: #fff;
  font-size: 14px;
  border: 0;
  padding: 9px 18px;
  color: #333;
}

.main .py-container .details .page .sui-pagination ul li.next a {
  background-color: #fafafa;
}

.main .py-container .details .page .sui-pagination div {
  color: #333;
  font-size: 14px;
  float: right;
  width: 241px;
}
</style>