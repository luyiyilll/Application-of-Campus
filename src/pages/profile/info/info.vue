<template>
    <view class="form">
      <view class="cu-form-group margin-top-sm">
        <view class="title">姓名</view>
        <input name="name" class="text-right" :value="user.realname?user.realname:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">出生日期</view>
        <input name="ID" class="text-right" :value="user.birthday?user.birthday:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <input name="sex" class="text-right" :value="user.gender?user.gender:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">身份证号码</view>
        <input name="ID" class="text-right" :value="user.IDcode?user.IDcode:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">手机号码</view>
        <input name="tel" class="text-right" :value="user.tel?user.tel:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">年级</view>
        <input name="grade" class="text-right" :value="user.grade?user.grade:'暂无'" disabled />
        <!-- <text class='cuIcon-locationfill text-orange'></text> -->
      </view>
      <view class="cu-form-group">
        <view class="title">学院</view>
        <input name="acdemic" class="text-right" :value="user.academic?user.academic:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">专业</view>
        <input name="major" class="text-right" :value="user.major?user.major:'暂无'" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">所属支部</view>
        <input name="major" class="text-right" :value="user.department?user.department:'暂无'" disabled />
      </view>
      <view class="btn-box flex ">
        <button class="cu-btn line-green text-green" @click="backNav">返回上级</button>
				<button class="cu-btn bg-green margin-left">申请修改</button>
      </view>
    </view>
</template>

<script>
export default {
  data(){
    return{
       user:{}
    }
  },
  onShow(){
    this.user=uni.getStorageSync('userInfo')
  },
  onLoad(){
    this.user=uni.getStorageSync('userInfo')
  },
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