<template>
  <view class="container">
    <view v-if="identify == 1" class="border-top">
      <view class="title">我的申请</view>
      <view class="content">
        <view class="content-block rudang" @click="navigateToApply">
          申请入党
        </view>
        <view class="content-block active" @click="navigateToAct">申请积极分子</view>
        <view class="content-block dev" @click="navigateToDev">申请发展对象</view>
        <view class="content-block pre" @click="navigateToPre">申请预备党员</view>
        <view class="content-block normal" @click="navigateToNormal">申请党员转正</view>
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
    <tab-bar></tab-bar>
  </view>


</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  export default {
    data() {
      return {
        identify: 1 //学生 2.老师
      };
    },
    components: {
      TabBar
    },
    onLoad() { },
    methods: {
      navigateToApply() {
        uni.navigateTo({
          url: '/pages/work/student/apply'
        });
      },
      navigateToAct() {
        uni.navigateTo({
          url: '/pages/work/student/active'
        });
      },
      navigateToDev() {
        uni.navigateTo({
          url: '/pages/work/student/dev'
        })
      },
      navigateToPre() {
        uni.navigateTo({
          url: '/pages/work/student/pre'
        })
      },
      navigateToNormal() {
        uni.navigateTo({
          url: '/pages/work/student/normal'
        })
      }
    }
  };
</script>

<style scoped>
  .container-work {
    min-height: 100vh;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 0 30px 0;
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
    width: 40%;
  }

  .active {
    width: 50%;
  }

  .dev {
    width: 92%;
  }

  .pre {
    width: 55%;
  }

  .normal {
    width: 35%;
  }
</style>