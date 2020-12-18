<template>
  <view class="container">
    <view class="info-title ">入党志愿书材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in applybook_pic" :key="index" @tap="ViewImage" :data-url="applybook_pic[index]">
          <image :src="applybook_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="applybook_pic.length<4">
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
        applybook_pic: []
      }
    },
    methods:{
      ChooseImage() {
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.applybook_pic.length != 0) {
              this.applybook_pic = this.applybook_pic.concat(res.tempFilePaths)
            } else {
              this.applybook_pic = res.tempFilePaths
            }
          }
        });
      },
      ViewImage(e) {
        uni.previewImage({
          urls: this.applybook_pic,
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
              this.applybook_pic.splice(e.currentTarget.dataset.index, 1)
            }
          }
        })
      },
            
      /*提交信息*/
      submitBtn(){
        
        console.log(this.info)
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