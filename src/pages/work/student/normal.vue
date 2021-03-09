<template>
  <view class="container">
    <view class="info-title ">转正申请书材料</view>
    <view class="cu-form-group" v-if="(status>=4 && user.is_apply==1) || (status>4)">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in user.tonormal_pic" :key="index" @tap="ViewImage"
          :data-url="picHost+user.tonormal_pic[index]">
          <image :src="picHost+user.tonormal_pic[index]" mode="aspectFill"></image>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in tonormal_pic" :key="index" @tap="ViewImage"
            :data-url="tonormal_pic[index]">
            <image :src="tonormal_pic[index]" mode="aspectFill"></image>
            <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
              <text class='cuIcon-close'></text>
            </view>
          </view>
          <view class="solids" @tap="ChooseImage" v-if="tonormal_pic.length<4">
            <text class='cuIcon-cameraadd'></text>
          </view>
        </view>
      </view>
      <view class="btn-box padding-bottom-sm padding-top-sm">
        <button class="cu-btn shadow-blur lg" @click="submitBtn">提交</button>
      </view>
    </view>
  </view>
</template>
<script>
  import { picHost } from "../../../utils/config.js"
  import { getIdentity } from "../../../utils/constant.js"
  import { findUserByOid } from '../../../network/user'
  export default {
    data() {
      return {
        picHost,
        user: '',
        status: '',
        tonormal_pic: []
      }
    },
    onLoad() {
      this.user = uni.getStorageSync('userInfo')
      this.status = getIdentity(this.user.identity)
      console.log(this.user, this.status)
    },
    methods: {
      ChooseImage() {
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.tonormal_pic.length != 0) {
              this.tonormal_pic = this.tonormal_pic.concat(res.tempFilePaths)
            } else {
              this.tonormal_pic = res.tempFilePaths
            }
          }
        });
      },
      ViewImage(e) {
        uni.previewImage({
          urls: this.tonormal_pic,
          current: e.currentTarget.dataset.url
        });
      },
      DelImg(e) {
        uni.showModal({
          title: '删除图片',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.tonormal_pic.splice(e.currentTarget.dataset.index, 1)
            }
          }
        })
      },

      /*提交信息*/
      submitBtn() {
        let that = this;
        let tonormal_pic = this.tonormal_pic;
        tonormal_pic.forEach((item, index) => {
          uni.uploadFile({
            url: 'http://localhost:3000/user/tonormalpic',
            filePath: item,
            name: 'file',
            header: {
              "Authori-zation": uni.getStorageSync("openid"),
            },
          })
        })
        uni.showToast({
          title: '已提交',
          duration: 2000,
          success: function () {
            findUserByOid({ openid: uni.getStorageSync('openid') }).then(r => {
              let result = r.data.user;
              uni.setStorageSync('userInfo', result)
              that.user = result
              console.log("0------", uni.getStorageSync('userInfo'))
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .btn-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: center;
  }

  .cu-btn {
    width: 90%;
    background: rgb(197, 132, 126);
    color: #fff;
  }
</style>