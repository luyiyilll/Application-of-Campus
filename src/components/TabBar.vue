<template name="TabBar">
    <view class="cu-bar tabbar bg-white footer">
			<view class="action" @click="NavChange" data-cur="index">
				<view class='cuIcon-cu-image'>
					<image :src="'../static/tabbarIcon/' + [PageCur=='index'?'index':'un-index'] + '.png'"></image>
				</view>
				<view :class="PageCur=='index'?'tab-text-color':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="signin">
				<view class='cuIcon-cu-image'>
					<image :src="'../static/tabbarIcon/' + [PageCur == 'signin'?'signin':'un-signin'] + '.png'"></image>
				</view>
				<view :class="PageCur=='sigin'?'tab-text-color':'text-gray'">签到</view>
			</view>
      
      <view class="action text-gray add-action">
        <button class="cu-btn cuIcon-add bg-green shadow"></button>
        发布
      </view>

			<view class="action" @click="NavChange" data-cur="work">
				<view class='cuIcon-cu-image'>
					<image :src="'../static/tabbarIcon/' + [PageCur == 'work'?'work':'un-work'] + '.png'"></image>
				</view>
				<view :class="PageCur=='work'?'tab-text-color':'text-gray'">工作</view>
			</view>

      <view class="action" @click="NavChange" data-cur="profile">
        <view class='cuIcon-cu-image'>
					<image :src="'../static/tabbarIcon/' + [PageCur == 'profile'?'profile':'un-profile'] + '.png'"></image>
				</view>
        <view :class="PageCur=='profile'?'tab-text-color':'text-gray'">我的</view>
      </view>
    </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "TabBar",
  data() {
    return {
     
    };
  },
  onLoad() {},
  computed:{
    ...mapState(['PageCur'])
  },
  methods: {
    ...mapMutations(['changePageCur']),
    NavChange(e){
      if(this.PageCur!=e.currentTarget.dataset.cur){
        this.changePageCur(e.currentTarget.dataset.cur);
        uni.redirectTo({
          url:'../'+this.PageCur+"/"+this.PageCur
        })
      }
      console.log(e)
    },
  },
};
</script>

<style>
.footer{
  background: #fff  !important;
  width:100%;
  position:fixed;
  bottom:0;
  border-top: 1px solid rgb(240,240,240);
  z-index: 999;
}
.tab-text-color{
  color:rgb(195, 118, 103);
}
.bg-green{
  background: #c37667;
  color:#fff;
}
</style>
