<template>
  <view class="container">
    <view class="top-box"></view>
    <view class="img-box flex">
      <img src="../../static/logo.png" class="img" alt="">
    </view>
    <view class="button-box">
      <button class="cu-btn bg-green lg" open-type="getUserInfo" withCredentials="true" @getuserinfo="getUserInfo"><text
          class="cuIcon-weixin"></text>微信授权登录</button>
    </view>
  </view>
</template>
<script>
  import { login, getOpenid } from '../../network/login'
  import { addUser } from '../../network/user'
  export default {
    data() {
      return {

      }
    },

    onLoad() {
      let that = this;
      uni.login({
        success: (res) => {
          if (res.errMsg == 'login:ok') {
            let code = res.code
            getOpenid({ code }).then(response => {
              if (response.data.openid) {
                uni.setStorageSync('openid', response.data.openid)
              }
              if (response.data.info.length != 0) {
                uni.setStorageSync('openid', response.data.info.openid)
                uni.setStorageSync('userInfo', response.data.info)
                uni.redirectTo({
                  url: '/pages/index/index',
                });
              }
              that.getSetting();
            })
          } else {
            uni.showLoading({
              title: '系统异常'
            })
          }
        }
      })
    },
    methods: {
      getSetting() {
        let that = this;
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {//用户已授权
              uni.showLoading({
                title: "登录中..."
              })
              uni.redirectTo({
                url: '/pages/index/index',
              });
            } else {
              that.getUserInfo();
            }
          }
        });
      },
      getUserInfo() {
        let that = this;
        uni.getUserInfo({
          provider: 'weixin',
          success: function (infoRes) {
            let data = {
              openid: uni.getStorageSync('openid'),
              nick_name: infoRes.userInfo.nickName,
              gender: infoRes.userInfo.gender == 1 ? '男' : '女',
              avatarurl: infoRes.userInfo.avatarUrl,
            }

            uni.setStorageSync('userInfo', data)
            addUser(data).then(res => {
              uni.showLoading({
                title: "登录中..."
              })
              uni.redirectTo({
                url: '/pages/index/index',
              });
            })
          }
        })
      },
    },
  }
</script>
<style scoped>
  .container {
    min-height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .top-box {
    min-height: 30vh;
  }

  .img-box {
    justify-content: center;
  }

  .img {
    border-radius: 10px;
    width: 160px;
    height: 160px;
    border: 3px solid #fff;
  }

  .content-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .content {
    width: 70%;
  }

  .button-box,
  .content-box {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .cu-btn {
    width: 80%;
  }

  .margin-tb-lg {
    margin-bottom: 10px;
  }

  .bg-green {
    background-color: rgb(197, 132, 126);
    color: #ffffff;
  }
</style>