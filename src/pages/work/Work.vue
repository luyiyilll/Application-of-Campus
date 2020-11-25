<template>
  <view>
    <!-- 加载动画 -->
    <!-- <view class="bg-white flex-sub radius shadow-lg">
      <image
        src="https://image.weilanwl.com/gif/loading-white.gif"
        mode="aspectFit"
        class="gif-white response"
        style="height: 240upx"
      ></image>
    </view> -->
    <view v-if="identify == 1" class="title">我的申请</view>
    <view class="content">
      <view class="rudang">申请入党</view>
      <view class="active">申请积极分子</view>
      <view class="dev">申请发展对象</view>
      <view class="pre">申请预备党员</view>
      <view class="normal">申请党员转正</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      identify: 1, //学生 2.老师
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style scoped>
.title {
  font-weight: bold;
  padding: 10px 0;
  background: #fff;
  text-align: center;
}
.content {
  border-top: 10x solid rgb(240, 240, 240);
  background: #fff;
}
.rudang,
.active,
.dev,
.pre,
.normal {
  position: relative;
  text-align: center;
  border: solid 1px rgb(240, 240, 240);
}
.rudang {
  line-height: 100px;
  width: 100px;
  height: 100px;
}
.active {
  width: 100px;
  height: 180px;
  line-height: 180px;
}
.dev {
}
</style>
