<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel,index in skuImageList" :key="carousel.id">
        <img :src="carousel.imgUrl" :class="{active:isShowCurrent == index}" @click="changeCurrent(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.css'
  export default {
    name: "ImageList",
    props: ['skuImageList'],
    data() {
      return {
        isShowCurrent: 0,
      }
    },
    methods: {
      changeCurrent(index) {
        this.isShowCurrent = index;
        this.$bus.$emit('changeCurrent', index)
      }
    },
    watch: {
      skuImageList: {
        // 数据一上来渲染，
        // 监听数据：可以保证数据过来了，但是不保证v-for执行完事了
        immediate: true,
        handler() {
          this.$nextTick(function () {
            new Swiper(this.$refs.mySwiper, {
              autoplay: true,
              // direction: 'vertical', // 垂直切换选项
              // loop: true, // 循环模式选项
              // 如果需要分页器
              // pagination: {
              //   el: '.swiper-pagination',
              //   clickable: true,
              // },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              slidesPerView: 6
            })
          })
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }


      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;

      &::after {
        font-size: 12px;
      }
    }
  }
</style>