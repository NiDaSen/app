<template>
  <div class="pagination fr page">
    <div class="fr page">
      <div class="sui-pagination clearfix">
        <button
          class="prev disabled"
          :disabled="pageNo == 1"
          @click="$emit('getPageNo', pageNo - 1)"
        >
          <a>«上一页</a>
        </button>
        <button
          class="dotted"
          v-if="startNumAndEndNum.start > 1"
          @click="$emit('getPageNo', pageNo - 1)"
        >
          <span :class="{ active: pageNo == 1 }">1</span>
        </button>
        <button class="dotted" v-if="startNumAndEndNum.start > 2">
          <span>...</span>
        </button>
        <button
          class="active"
          v-for="(page, index) in startNumAndEndNum.end"
          :key="index"
          v-show="page >= startNumAndEndNum.start"
          @click="$emit('getPageNo', page)"
        >
          <a :class="{ active: pageNo == page }">{{ page }}</a>
        </button>
        <button class="dotted" v-show="startNumAndEndNum.end < totalPage - 1">
          <span>...</span>
        </button>
        <button
          class="dotted"
          v-show="startNumAndEndNum.end < totalPage"
          @click="$emit('getPageNo', totalPage)"
        >
          <span :class="{ active: pageNo == totalPage }">{{ totalPage }}</span>
        </button>
        <button
          class="next"
          @click="$emit('getPageNo', pageNo + 1)"
          :disabled="pageNo == totalPage"
        >
          <a>下一页»</a>
        </button>
        <button class="dotted">
          <span>共{{ total }} 条</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // pageNo当前第几页/pageSize每一页要展示多少条数据/total一共有多少天数据/continues连续的页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0;
      let end = 0;
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }

      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continues + 1;
      }
      return { start, end };
    },
  },
};
</script>

<style scoped>
.active {
  background: cyan;
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

.main .py-container .details .page .sui-pagination {
  margin-left: 0;
  margin-bottom: 0;
  width: 1000px;
  float: left;
}

.main .py-container .details .page .sui-pagination button {
  display: inbuttonne-block;
}

.main .py-container .details .page .sui-pagination button a {
  position: relative;
  float: left;

  text-decoration: none;
  background-color: #fff;
  border: 1px sobuttond #e0e9ee;
  margin-left: -1px;
  font-size: 14px;
  padding: 9px 18px;
  color: #333;
}

.main .py-container .details .page .sui-pagination button.active a {
  background-color: #fff;
  /* color: #e1251b; */
  border-color: #fff;
  cursor: defat;
}

.main .py-container .details .page .sui-pagination button.prev a {
  background-color: #fafafa;
}

.main .py-container .details .page .sui-pagination button.disabled a {
  color: #999;
  cursor: defat;
}

.main .py-container .details .page .sui-pagination button.dotted span {
  margin-left: -1px;
  position: relative;
  float: left;

  text-decoration: none;
  /* background-color: #fff; */
  font-size: 14px;
  border: 0;
  padding: 9px 18px;
  color: #333;
}

.main .py-container .details .page .sui-pagination button.next a {
  background-color: #fafafa;
}

.main .py-container .details .page .sui-pagination div {
  color: #333;
  font-size: 14px;
  float: right;
  width: 241px;
}
</style>
