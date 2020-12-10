<template>
  <view>
    <view></view>

  </view>
</template>
<script>
export default {
  data(){
    return{
      content:{
        title:'第一次会议',
        publishtime:'2020-10-2',
        description:'在10501展开第一次会议，具体内容为入体内容为体内容为体内容为体内容为体内容为体内容为体内容为体内容为v党申请的通知...',
        views:26,
        collect:20,
        likes:2
      }
    }
  },
  onLoad(e){
    let id=e.id;
    let type=e.type;
    console.log(e)
  }
}
</script>