<template>
  <view>
    <swiper
      class="screen-swiper square-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
    >
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    <scroll-view scroll-x class="bg-white nav text-center">
      <view
        class="cu-item"
        :class="index == TabCur ? 'text-blue cur' : ''"
        v-for="(item, index) in navList"
        :key="index"
        @tap="tabSelect"
        :data-id="index"
      >
        {{ item.title }}
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [
        {
          id: 0,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        },
        {
          id: 1,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg",
        },
        {
          id: 2,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg",
        },
        {
          id: 3,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
        },
        {
          id: 4,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg",
        },
        {
          id: 5,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg",
        },
      ],
      TabCur: 0,
      navList: [
        { title: "通知", icon: "" },
        { title: "会议", icon: "" },
        { title: "公式", icon: "" },
      ],
    };
  },
  components: {},
  onLoad() {},
  methods: {
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
    },
  },
};
</script>

<style>
</style>
