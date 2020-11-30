<template>
  <view class="container">
    <view class="img-box flex">
      <img src="../../static/head.jpg" class="img" alt="">
    </view>
    <view class='margin-tb-lg content-box'>
      <view class="content">申请获取以下权限</view>
      <text class="content margin-tb-sm text-gray">获得你的公开信息(昵称，头像等)</text>
    </view>
    <view class="button-box">
      <button class="cu-btn bg-green lg" open-type="getUserInfo" withCredentials="true" @getuserinfo="wxGetUserInfo"><text class="cuIcon-weixin"></text>微信授权登录</button>
    </view>
  </view>
</template>
<script>
import {login,updateUserInfo} from '../../network/student/login'
export default {
  data() {
    return {
      isFirstAuth:uni.getStorageSync('isFirstAuth') || true
    }
  },
  onLoad(){
    this.Login();
  },
  methods: {
    wxGetUserInfo(){
      let that=this;
      uni.getUserInfo({
        provider:'weixin',
        success:function(infoRes){
          console.log(infoRes)
          try {
            uni.setStorageSync('isFirstAuth', false);//记录是否第一次授权  false:表示不是第一次授权
            _this.updateUserInfo();
          } catch (e) {}
        },
        fail(res){}
       
      })
    },
    Login(){
      let _this=this;
      // console.log(123)
      // uni.showLoading({
      //   title:'登录中...'
      // })
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          console.log(loginRes);
          // let code=loginRes.code;
          // console.log(loginRes);
          // if(!_this.isFirstAuth){//不是第一次授权获取用户信息
          //   uni.getUserInfo({
          //     provider: 'weixin',
          //     success: function (infoRes) {
          //       console.log(infoRes)
          //       _this.updateUserInfo()
          //     }
          //   });
          // }
          // login(code).then(res=>{
          //   uni.hideLoading();
          // })
        }
       
      });
    },
    updateUserInfo(){
      let _this=this;
      let data={
        appKey: '',
        customerId: '',
        nickName:'',       
      }
      updateUserInfo(data).then(res=>{
        console.login(res)
      })
    }
  },
}
</script>
<style scoped>
.container{
  min-height: 100vh;
  background:#fff;
  padding-top: 100px;
}
.img-box{
  justify-content: center;
}
.img{
  border-radius: 5px;
  width:80px;
  height:80px;
}
.content-box{
  display:flex;
  justify-content:center;
  flex-direction: column;
  align-items:center;
}

.content{
  width:70%;
}

.button-box,.content-box{
  width:100%;
  display:flex;
  justify-content:center;
}

.cu-btn{
  width:80%;
}
.margin-tb-lg{
  margin-bottom:10px;
}
</style>