<template>
  <view class="container border-top">
    <view class="info-title ">团员推优及民主评议材料</view>
      <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
        <image :src="imgList[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {

  }
</script>
<style scoped>
  .container{
    background:#fff;
    min-height:100vh;
  }
  .info-title{
    padding:10px 0px 10px 15px;;
    font-weight: bold;
    font-size: 16px;
    background: #fff;
    border-top:1px solid rgb(240, 240, 240);
    border-bottom:1px solid rgb(240, 240, 240);
  }


</style>