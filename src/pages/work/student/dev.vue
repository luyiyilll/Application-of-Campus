<template>
  <view class="container border-top">
    <view class="info-title ">入党积极分子党课结业证书材料</view>
    <view v-if="(user.is_apply==1 && status>=2)||(status>2)">
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in user.certifate_pic" :key="index" @tap="ViewImage(0,$event)"
            :data-url="picHost+user.certifate_pic[index]">
            <image :src="picHost+user.certifate_pic[index]" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-form-group" v-else>
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in certifate_pic" :key="index" @tap="ViewImage(0,$event)"
          :data-url="certifate_pic[index]">
          <image :src="certifate_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg(0,$event)" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage(0)" v-if="certifate_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">两位正式党员介绍人材料</view>
    <view v-if="(user.is_apply==1 && status>=1)||(user.is_apply==0 && status>1)">
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in user.normal_pic" :key="index" @tap="ViewImage(1,$event)"
            :data-url="picHost+user.normal_pic[index]">
            <image :src="picHost+user.normal_pic[index]" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-form-group" v-else>
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in normal_pic" :key="index" @tap="ViewImage(1,$event)"
          :data-url="normal_pic[index]">
          <image :src="normal_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg(1,$event)" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage(1)" v-if="normal_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
    <view class="btn-box padding-bottom-sm padding-top-sm"
      v-if="(user.is_apply==1 && status>=2)||(user.is_apply==0 && status>2)">
    </view>
    <view class="btn-box padding-bottom-sm padding-top-sm" v-else>
      <button class="cu-btn shadow-blur lg" @click="submitBtn">提交</button>
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
        certifate_pic: [],
        normal_pic: []
      }
    },
    onLoad() {
      this.user = uni.getStorageSync('userInfo')
      this.status = getIdentity(this.user.identity)
      console.log(this.user, this.status)
    },
    methods: {
      ChooseImage(index) {
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (index == 0) {
              if (this.certifate_pic.length != 0) {
                this.certifate_pic = this.certifate_pic.concat(res.tempFilePaths)
              } else {
                this.certifate_pic = res.tempFilePaths
              }
            } else {
              if (this.normal_pic.length != 0) {
                this.normal_pic = this.normal_pic.concat(res.tempFilePaths)
              } else {
                this.normal_pic = res.tempFilePaths
              }
            }

          }
        });
      },
      ViewImage(index, e) {
        console.log(e.currentTarget.dataset)
        if (index == 0) {
          uni.previewImage({
            urls: this.certifate_pic ? this.certifate_pic : this.user.certifate_pic,
            current: e.currentTarget.dataset.url
          });
        } else {
          uni.previewImage({
            urls: this.normal_pic ? this.normal_pic : this.user.normal_pic,
            current: e.currentTarget.dataset.url
          });
        }

      },
      DelImg(index, e) {
        uni.showModal({
          title: '删除图片',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              if (index == 0) {
                this.certifate_pic.splice(e.currentTarget.dataset.index, 1)
              } else {
                this.normal_pic.splice(e.currentTarget.dataset.index, 1)
              }

            }
          }
        })
      },

      /*提交信息*/
      submitBtn() {

        let that = this;
        let certifate_pic = this.certifate_pic;
        let normal_pic = this.normal_pic;
        certifate_pic.forEach((item, index) => {
          uni.uploadFile({
            url: 'http://localhost:3000/user/certifatepic',
            filePath: item,
            name: 'file',
            header: {
              "Authori-zation": uni.getStorageSync("openid"),
            },
          })
        })
        normal_pic.forEach((item, index) => {
          uni.uploadFile({
            url: 'http://localhost:3000/user/normalpic',
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
              result.certifate_pic = r.data.user.certifate_pic.split(';')
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