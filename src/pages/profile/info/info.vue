<template>
    <view class="form">
      <view class="cu-form-group margin-top-sm">
        <view class="title">姓名</view>
        <input name="name" class="text-right" value="卢漪" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">出生日期</view>
        <input name="ID" class="text-right" value="2020-11-27" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <input name="sex" class="text-right" value="女" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">身份证号码</view>
        <input name="ID" class="text-right" value="500225199801124722" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">手机号码</view>
        <input name="tel" class="text-right" value="15923257515" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">年级</view>
        <input name="grade" class="text-right" value="2017" disabled />
        <!-- <text class='cuIcon-locationfill text-orange'></text> -->
      </view>
      <view class="cu-form-group">
        <view class="title">学院</view>
        <input name="acdemic" class="text-right" value="计算机与信息科学学院" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">专业</view>
        <input name="major" class="text-right" value="计算机科学与技术" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">所属支部</view>
        <input name="major" class="text-right" value="计信一支部" disabled />
      </view>
      <view class="btn-box flex ">
        <button class="cu-btn line-green text-green" @click="backNav">返回上级</button>
				<button class="cu-btn bg-green margin-left">申请修改</button>
      </view>
    </view>
</template>

<script>
export default {
  methods: {
    backNav(){
      uni.navigateBack({
        delta: 1
      });
    }
  },
}
</script>
<style scoped>
  .flex{
    display:flex;
    justify-content:center;
  }
  .bg-green{
    background:rgb(197, 132, 126);
  }

  .text-green{
    color:rgb(197, 132, 126);
  }

  .btn-box{
    border-top:1px solid rgb(240, 240, 240);
    padding:20px;
    background:#fff;
  }
  .cu-btn{
    width:45%;
    height:40px;
  }
</style>