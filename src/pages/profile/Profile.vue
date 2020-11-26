<template>
  <view>
    <!-- style="background:url('../../static/bg.jpg'); background-size: 100% 100%;" -->
    <view class="banner" style="background:url('../../static/profile_banner.png'); background-size: 100% 100%;">
      <view>
        <img src="../../static/head.jpg" alt="" class="head-img">
      </view>
      <view>
        <view class="name">luyiyi_lll</view>
        <view class="identity">学生</view>
      </view>
    </view>
    <view class="nav-tab">
      <view class="cu-list grid col-4 no-border">
        <view class="cu-item" v-for="(item,index) in navList" :key="index">
          <view>
            <img :src="item.icon" alt="" class="nav-icon">
          </view>
          <text>{{item.title}}</text>
        </view>
      </view>
    </view>
    <view class="form">
      <view class="cu-form-group margin-top">
        <view class="title">姓名</view>
        <input name="name" disabled> 卢漪</input>
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <input name="sex" disabled>女</input>
      </view>
      <view class="cu-form-group">
        <view class="title">身份证号码</view>
        <input name="ID" disabled>500225199801124722</input>
      </view>
      <view class="cu-form-group">
        <view class="title">手机号码</view>
        <input name="tel" disabled>15923257515</input>
      </view>
      <view class="cu-form-group">
        <view class="title">年级</view>
        <input name="grade" disabled>2017</input>
        <!-- <text class='cuIcon-locationfill text-orange'></text> -->
      </view>
      <view class="cu-form-group">
        <view class="title">学院</view>
        <input name="acdemic" disabled>计算机与信息科学学院</input>
      </view>
      <view class="cu-form-group">
        <view class="title">专业</view>
        <input name="major" disabled>计算机科学与技术</input>
      </view>
      <view class="cu-form-group">
        <view class="title">所属支部</view>
        <input name="major" disabled>计信一支部</input>
      </view>
    </view>
  </view>
</template>

<script>

  export default {
    data() {
      return {
        navList: [
          { title: '我的收藏', icon: '../../static/colection.png' },
          { title: '最近浏览', icon: '../../static/records.png' },
          { title: '发表文章', icon: '../../static/article.png' },
          { title: '其他', icon: '../../static/other.png' }

        ]
      };
    },
    onLoad() { },
    methods: {},
  };
</script>

<style scoped>
  .banner {
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(197, 132, 126);
  }

  .head-img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    border: 3px solid #fff;
  }

  .identity,
  .name {
    color: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
  }

  .nav-icon {
    width: 25px;
    height: 25px;
  }
</style>