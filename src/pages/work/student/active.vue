<template>
  <view class="container border-top">
    <view class="info-title ">团员推优及民主评议材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in excellent_pic" :key="index" @tap="ViewImage"
          :data-url="excellent_pic[index]">
          <image :src="excellent_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="excellent_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
    <view class="btn-box padding-bottom-sm padding-top-sm">
      <button class="cu-btn shadow-blur lg" @click="submitBtn">提交</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        excellent_pic: []
      }
    },
    methods: {
      ChooseImage() {
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.excellent_pic.length != 0) {
              this.excellent_pic = this.excellent_pic.concat(res.tempFilePaths)
            } else {
              this.excellent_pic = res.tempFilePaths
            }
          }
        });
      },
      ViewImage(e) {
        uni.previewImage({
          urls: this.excellent_pic,
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
              this.excellent_pic.splice(e.currentTarget.dataset.index, 1)
            }
          }
        })
      },
      /*提交信息*/
      submitBtn() {

      }
    },
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