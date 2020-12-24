<template>
  <view class="container">
    <view class="title margin-bottom">{{content.title}}</view>
    <view class="bg-gray time">
      <view>{{content.publishtime}}</view>
      <view>阅读:{{content.views}}</view>
    </view>
    <view class="margin-top">
      <rich-text :nodes="content.description"></rich-text>
    </view>
    <view class="icon-box margin-top">
      <view class="icon">
        <view class="collects"><span class="text-sm cuIcon-favor" ></span>{{content.collect}}</view>
        <view class="likes"><span class="text-lg cuIcon-like" ></span>{{content.likes}}</view>
      </view>
    </view>

  </view>
</template>
<script>
export default {
  data(){
    return{
      content:{
        title:'第一次会议',
        publishtime:'2020-10-2',
        description:'<p>在10501展开第一次会议，具体内容为入体内容为体内容为体内容为体内容为体内容为体内容为体内容为体内容为v党申请的通知...</p>',
        views:26,
        collect:20,
        likes:2
      }
    }
  },
  onLoad(e){
    let id=e.id;
    let type=e.type;

  }
}
</script>
<style scoped>
.container{
  padding:20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:flex-start;
}
.title{
  font-size:20px;
  font-weight:bold;
}
.time{
  text-align: center;
  padding:10px;
  display:flex;
  justify-content: space-between;
  width:100%;
}
.icon-box{
  flex:1;
  display: flex;
  flex-direction: column;
  align-self:flex-end;
  width:100%;
}
.icon{
  display:flex;
  justify-content: center;
  width:100%;
}
.collects,.likes{
  margin:5px
}

</style>
