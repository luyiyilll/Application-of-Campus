<template>
  <view class="container">
    <view class="title margin-bottom">{{content.title}}</view>
    <view class="text-gray time">
      {{content.publishtime}}
    </view>
    <view class="margin-top">
      <rich-text :nodes="content.description"></rich-text>
    </view>
    <view class="icon-box margin-top">
      <view class="icon">
        <view class="collects" @click="toCollect">
          <span class="icon-item text-red" :class="isActive?'cuIcon-favorfill text-red':'cuIcon-favor'"></span>
          <span class="text-gray text-sm">{{content.collect}}</span>
        </view>
        <view class="likes">
          <span class="icon-item text-green cuIcon-attention"></span>
          <span class="text-gray text-sm">{{content.views}}</span>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
  export default {
    data() {
      return {
        content: {
          title: '第一次会议',
          publishtime: '2020-10-2',
          description: '<p>在10501展开第一次会议，具体内容为入体内容为体内容为体内容为体内容为体内容为体内容为体内容为体内容为v党申请的通知...</p>',
          views: 26,
          collect: 20,
          likes: 2
        },
        isActive: false
      }
    },
    onLoad(e) {
      let id = e.id;
      let type = e.type;
    },
    methods: {
      toCollect() {
        console.log(this.isActive)
        this.isActive = !this.isActive

      }
    },
  }
</script>
<style scoped>
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .time {
    text-align: center;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .icon-box {
    position: relative;
    flex: 1;
    width: 100%;
  }

  .icon {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;

  }

  .collects,
  .likes {
    margin: 5px
  }

  .icon-item {
    font-size: 25px;
    margin: 0 5px;
  }
</style>