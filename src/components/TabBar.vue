<template name="TabBar">
  <view class="box">
    <view class="cu-bar tabbar bg-white">
      <view class="action">
        <view class="cuIcon-cu-image">
          <image src="/static/tabbar/basics_cur.png"></image>
        </view>
        <view class="text-green">
          <router-link to="/">首页</router-link>
        </view>
      </view>
      <view class="action">
        <view class="cuIcon-cu-image">
          <image src="/static/tabbar/component.png"></image>
        </view>
        <view class="text-gray"
          ><router-link to="/signin">签到</router-link>
        </view>
      </view>
      <view class="action">
        <view class="cuIcon-cu-image">
          <image src="/static/tabbar/plugin.png"></image>
          <view class="cu-tag badge">99</view>
        </view>
        <view class="text-gray">
          <router-link to="/work">工作</router-link>
        </view>
      </view>
      <view class="action">
        <view class="cuIcon-cu-image">
          <image src="/static/tabbar/about.png"></image>
          <view class="cu-tag badge"></view>
        </view>
        <view class="text-gray">
          <router-link to="/profile">我的</router-link>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
</style>
