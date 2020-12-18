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
      <button class="cu-btn bg-green lg" open-type="getUserInfo" withCredentials="true" @getuserinfo="getUserInfo"><text
          class="cuIcon-weixin"></text>微信授权登录</button>
    </view>
  </view>
</template>
<script>
  import { login, getOpenid } from '../../network/login'
  import { addUser } from '../../network/student/user'
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
              uni.setStorageSync('openid',response.data.openid ? response.data.openid : '')
              uni.setStorageSync('userInfo', response.data.info !== '' ? response.data.info : '')
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
              openid:uni.getStorageSync('openid'),
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



    // onLoad() {
    //   let that = this;
    //   wx.getSetting({
    //     success: function (res) {
    //       if (res.authSetting['scope.userInfo']) {
    //         //用户已授权
    //         uni.showLoading({
    //           title: "登录中..."
    //         })
    //         uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
    //         that.userLogin();
    //       } else {
    //         //用户没有授权
    //         that.isCanUse = true;
    //       }
    //     }
    //   });

    // },
    // methods: {
    //   getUserInfo() {
    //     let that = this;
    //     uni.login({
    //       success: (res) => {
    //         if (res.errMsg == 'login:ok') {
    //           let code = res.code
    //           getOpenid({ code }).then(response => {
    //             console.log(response)
    //             that.$store.commit('SET_USER_OPENID_KEY', response.data.info.openid, response.data.info.session_key)
    //             that.userLogin();
    //           })
    //         } else {
    //           uni.showLoading({
    //             title: '系统异常'
    //           })
    //         }
    //       }
    //     })
    //   },
    //   userLogin() {
    //     let that = this;
    //     uni.getUserInfo({
    //       provider: 'weixin',
    //       success: function (infoRes) {
    //         that.$store.commit('SET_USER_INFO', infoRes)
    //         that.updateUserInfo(infoRes, that.$store.state.openInfo)
    //       }
    //     })
    //   },
    //   updateUserInfo(info, openInfo) {
    //     let data = {
    //       openid: openInfo.openid,
    //       session_key: openInfo.session_key,
    //       nick_name: info.nickName,
    //       gender: info.gender == 1 ? '男' : '女',
    //       avatar: info.avatarUrl,
    //     }
    //     addUser(data).then(res => {
    //       console.log(res)
    //     })

    //   }
    // },
  }
</script>
<style scoped>
  .container {
    min-height: 100vh;
    background: #fff;
    padding-top: 100px;
  }

  .img-box {
    justify-content: center;
  }

  .img {
    border-radius: 5px;
    width: 90px;
    height: 90px;
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
</style>