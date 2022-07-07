<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sorttrs">
          <div class="sort" v-show="shows">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryLists"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{ cur: categoryIndex == index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: categoryIndex == index ? 'block' : 'none',
                  }"
                >
                  <!-- 二级三级的分类 -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>1
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储鼠标移动一级分类的索引
      categoryIndex: -1,
      // 三级联动是否展示，在主页的时候为true
      shows: true,
    };
  },
  computed: {
    // 获取请求的数据三级联动的菜单
    ...mapState("category", ["categoryLists"]),
  },
  mounted() {
    // 通知vuex发请求获取数据，存储于仓库之中
    if (this.$route.path != "/home") {
      this.shows = false;
    }
  },
  methods: {
    // 三级联动菜单的节流  用的lodashi的throttle的方法实现
    changeIndex: throttle(function (index) {
      this.categoryIndex = index;
    }, 50),
    // 鼠标离开三级联动的时候设置
    leaveIndex() {
      this.categoryIndex = -1;
      // 判断不在home主页的时候是否显示三级联动菜单
      if (this.$route.path != "/home") {
        this.shows = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      //最好的解决方式是用编程式导航+事件委派
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      // 如果自定义属性有这个就进去判断实施路由跳转传参数
      if (categoryname) {
        let location = { path: "/search" };
        let query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
          // 多次点击清除上一次的自定义属性的id
          delete this.$route.query.category2Id;
          delete this.$route.query.category3Id;
        } else if (category2id) {
          query.category2Id = category2id;
          // 多次点击清除上一次的自定义属性的id
          delete this.$route.query.category3Id;
          delete this.$route.query.category1Id;
        } else {
          query.category3Id = category3id;
          // 多次点击清除上一次的自定义属性的id
          delete this.$route.query.category2Id;
          delete this.$route.query.category1Id;
        }
        // 传参数的合并和头部的输入框的参数合并
        if (this.$route.query) {
          location.query = {
            ...this.$route.query,
            ...query,
          };
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.shows = true;
    },
  },
};
</script>
<style scoped>
.cur {
  background-color: #e1251b;
}

.type-nav {
  border-bottom: 2px solid #e1251b;
}

.type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}

.type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}

.type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}

.sorttrs-enter,
.sorttrs-leave-to {
  height: 0px;
}

.sorttrs-enter-to,
.sorttrs.leave {
  height: 461px;
}

.sorttrs-enter-active,
.sorttrs-leave-active {
  transition: all 0.5s linear;
}

.type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}

.type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}

.type-nav .container .sort .all-sort-list2 .item .item-list {
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}

.type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
</style>
