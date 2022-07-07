<template>
  <div>
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel, index) in carouselList"
          :key="carousel.id"
        >
          <img :src="carousel.imgUrl" @click="ClickImgJump(index)" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script>
// 封装的轮播图组件
// 引入轮播图的包
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "Carouseles",
  methods: {
    ClickImgJump(index) {
      if (index == 0) window.location.href = "https://www.baidu.com";
    },
  },
  // 传入一个数组
  props: ["carouselList"],
  watch: {
    carouselList: {
      immediate: true,
      handler() {
        this.$nextTick(function () {
          // var mySwiper =
          new Swiper(this.$refs.mySwiper, {
            // 设置自动播放
            autoplay: true,
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>
<style scoped>
</style>