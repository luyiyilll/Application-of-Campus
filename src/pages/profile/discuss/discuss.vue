<template>
  <view class="border-top">
    <view class="block"  v-for="(item,index) in disList" :key="index">
      <view class="banner-img" style="background:url('../../../static/banner_top.jpg'); background-size: 100% 100%; background-position:top"></view>
      <view class="top">
        <img :src="user.avatar" alt="头像" class="avatar">
        <view class="flex">
          <view class="nick-name">{{user.nick_name}}</view>
          <view class="text-gray">{{item.postdate}}</view>
        </view>
      </view>
      <view class="mid">
        <view class="title">【{{item.title}}】</view>
        <view class="margin-top">{{item.content}}</view>
      </view>
      <view class="bottom">
        <view class="text-red left"><span class="text-orange text-xs cuIcon-hotfill"></span>热度{{item.views}}℃</view>
        <view class="right">
          <view class="like-margin" @click="like"> <span class="text-sm" :class="!flag?'cuIcon-like':'cuIcon-likefill'"></span></view>
          <view><span class="text-sm cuIcon-comment" ></span></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import {discussInfo} from '../../../network/discuss'
export default {
  data(){
    return{
      user:'',
      flag:false,
      disList:[
        {postdate:'2020-1-1',title:'讨论主题',content:'内容内容内容',views:13},
        {postdate:'2020-9-2',title:'测试',content:'今天几点了 两点二十',views:19},
        {postdate:'2020-12-5',title:'今天吃饭了吗',content:'吃饭了吗 吃了吧 对的',views:132}
      ]
    }
  },
  onLoad(){
    this.user=uni.getStorageSync('userInfo')
    console.log(uni.getStorageSync('openid'))
    discussInfo({openid:uni.getStorageSync('openid')}).then(res=>{
      console.log(1111)
    })
  },
  methods:{
    like(){

      this.flag=!this.flag
    }
  }
}
</script>
<style scoped>
.block,.top{
  display:flex;
}

.block{
  flex-direction:column;
  background:#fff;
  margin-bottom:10px; 
}
.banner-img{
  width:100%;
  height:20px;
}
.top,.mid,.bottom{
  padding:0 10px 10px 10px;
}
.avatar{
  width:50px;
  height:50px;
  border-radius:50%;
}
.flex{
  flex-direction: column;
  justify-content: center;
  align-items:center;
}

.nick-name{
  margin-bottom:6px;
}
.bottom{
  display:flex;
  justify-content:space-around;
}
.left{
  flex:1;
}
.right{
  width:60px;
  display:flex;
  justify-content: center;
}
.like-margin{
  margin-right:10px;
}
.text-sm{
  font-size: 20px;
}
</style>