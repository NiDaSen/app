<template>
  <div class="spec-preview">
    <img :src="imgUrl.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgUrl.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0,
      }
    },
    computed: {
      imgUrl() {
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted() {
      this.$bus.$on('changeCurrent', (index) => {
        this.currentIndex = index;
      })
    },
    methods: {
      handler(e) {
        let mask = this.$refs.mask;
        let big = this.$refs.big;
        let leftMask = e.offsetX - mask.offsetWidth / 2;
        let topMask = e.offsetY - mask.offsetHeight / 2;
        if (leftMask <= 0) leftMask = 0
        if (leftMask >= mask.offsetWidth) leftMask = mask.offsetWidth
        if (topMask <= 0) topMask = 0
        if (topMask >= mask.offsetHeight) topMask = mask.offsetHeight
        // 修改元素的top和left属性值
        mask.style.left = leftMask + 'px'
        mask.style.top = topMask + 'px'
        big.style.left = -2 * leftMask + 'px'
        big.style.top = -2 * topMask + 'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>