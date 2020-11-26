<template>
  <view
    class="container"
    style="background:url('../../static/work_bg.png'); background-size: 100% 100%;"
  >
    <view v-if="identify == 1" class="content-outer">
      <view class="title">我的申请</view>
      <view class="content">
        <view class="content-block rudang">申请入党</view>
        <view class="content-block active">申请积极分子</view>
        <view class="content-block dev">申请发展对象</view>
        <view class="content-block pre">申请预备党员</view>
        <view class="content-block normal">申请党员转正</view>
      </view>
    </view>
    <!-- 加载动画 -->
    <!-- <view class="bg-white flex-sub radius shadow-lg">
      <image
        src="https://image.weilanwl.com/gif/loading-white.gif"
        mode="aspectFit"
        class="gif-white response"
        style="height: 240upx"
      ></image>
    </view>-->
  </view>
</template>

<script>
export default {
  data() {
    return {
      identify: 1 //学生 2.老师
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style scoped>
.container {
  min-height: 580px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  padding: 100px 0 30px 0;
  text-align: center;
}

.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-top: 10x solid rgb(240, 240, 240);
  padding-bottom: 20px;
}

.content-block {
  font-weight: bold;
  line-height: 100px;
  height: 80px;
  border-radius: 5px;
  text-align: center;
  line-height: 80px;
  margin: 5px 5px 5px 5px;
  color: #fff;
  background: rgba(195, 118, 103, 0.6);
}
.content-block:active {
  background: rgb(195, 118, 103);
}

.rudang {
  width: 100px;
}

.active {
  width: 150px;
}

.dev {
  width: 260px;
}

.pre {
  width: 150px;
}

.normal {
  width: 100px;
}
</style>