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
      <view class="content-block rudang">申请入党</view>
      <view class="content-block active">申请积极分子</view>
      <view class="content-block dev">申请发展对象</view>
      <view class="content-block pre">申请预备党员</view>
      <view class="content-block normal">申请党员转正</view>
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
    onLoad() { },
    methods: {},
  };
</script>

<style scoped>
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
    background: #fff;
    text-align: center;
  }

  .content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-top: 10x solid rgb(240, 240, 240);
    background: #fff;
    padding-bottom: 20px;
  }

  .content-block {
    font-weight: bold;
    line-height: 100px;

    height: 80px;
    border-radius: 5px;
    text-align: center;
    line-height: 80px;
    margin: 10px 5px 5px 5px;
    color: #fff;
  }

  .rudang {
    width: 140px;
    background: rgb(164, 209, 186);
  }

  .active {
    width: 140px;
    background-color: rgb(255, 217, 124);
  }

  .dev {
    width: 290px;
    background-color: rgb(171, 223, 244);
  }

  .pre {
    width: 140px;
    background: rgb(184, 167, 245);
  }

  .normal {
    width: 140px;
    background-color: rgb(255, 92, 103);
  }
</style>