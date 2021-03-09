<template>
  <view class="container border-top">
    <view class="cu-timeline" v-for="(item,index) in applyList" :key="index">
      <view class="cu-time">{{item.date}}</view>
      <view class="cu-item" :class="[applyList.length-1 == index ? 'text-green' : '']">
        <view class="content bg-gray" :class="[index%2==0?'':'bg']">
          <text class="time-font">{{item.time}}</text> <text class="time-weight">【{{item.title}}】</text> {{item.status}}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import { getMyApplication } from '../../../network/user'
  export default {
    data() {
      return {
        applyList: []
      }
    },
    onLoad() {
      getMyApplication({ openid: uni.getStorageSync('openid') }).then(res => {
        console.log(res.data.data)
        this.applyList = res.data.data
      })
    }
  }
</script>
<style scoped>
  .cu-timeline .cu-time {
    width: 100px;
  }

  .bg {
    background: rgba(197, 132, 126, .5);
  }

  .text-green {
    color: rgba(197, 132, 126, .8);
  }

  .time-font {
    font-size: 12px;
  }

  .time-weight {
    font-weight: bold;
  }
</style>