<template>
  <view class="container border-top">
    <view class="cu-timeline" v-for="(item,index) in applyList" :key="index">
      <view class="cu-time">{{item.date}}</view>
      <view class="cu-item" :class="[applyList.length-1 == index ? 'text-green' : '']">
        <view class="content bg-gray" :class="[index%2==0?'':'bg']">
          <text>{{item.time}}</text>{{index%2}} 【{{item.title}}】 {{item.status}}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        applyList: [
          { date: '2020-06-17', time: '10:30', title: '入党申请', status: '已提交', color: 'red' },
          { date: '2020-06-17', time: '16:00', title: '入党申请', status: '审核通过', color: 'red' },
          { date: '2020-09-17', time: '16:00', title: '积极分子申请', status: '已提交', color: 'red' },
          { date: '2020-09-18', time: '16:00', title: '积极分子申请', status: '审核通过', color: 'red' }
        ]
      }
    },
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
</style>