<template>
  <view class="border-top">
    <view class="block" v-for="(item,index) in disList" :key="index">
      <view class="banner-img"
        style="background:url('../../../static/banner_top.jpg'); background-size: 100% 100%; background-position:top">
      </view>
      <view class="top">
        <img :src="user.avatar" alt="头像" class="avatar">
        <view class="flex">
          <view class="nick-name">{{user.nick_name}}</view>
          <view class="text-gray">{{item.postdate}}</view>
        </view>
      </view>
      <view class="mid">
        <view class="title">【{{item.title}}】</view>
        <view class="margin-top">{{item.content}}</view>
      </view>
      <view class="bottom">
        <view class="text-red left"><span class="text-orange text-xs cuIcon-hotfill"></span>热度{{item.views}}℃</view>
        <view class="right">
          <view class="like-margin text-red" @click="like(item.id)" :data-cur="index"> <span class="text-sm"
              :class="item.islike==1?'cuIcon-likefill':'cuIcon-like'"></span></view>
          <!-- <view><span class="text-sm cuIcon-comment text-green"></span></view> -->
        </view>
      </view>
      <view class="uni-form-item uni-column">
          <input class="uni-input" @focus="getKeyBoard"  placeholder="评论" />
      </view>
    </view>
  </view>
</template>
<script>
  import { discussInfo } from '../../../network/discuss';
  import  {likeAction} from '../../../network/like'
  export default {
    data() {
      return {
        user: '',
        flag: false,
        curIndex:0,
        disList: [],
        comment:''
      }
    },
    onLoad() {
      this.user = uni.getStorageSync('userInfo')
      this.getDiscussInfo();
    },
    methods: {
      getDiscussId(id){
        console.log(id)
      },
      getKeyBoard(){
        uni.getSelectedTextRange({
          success: res => {
            console.log('getSelectedTextRange res', res.start, res.end)
          }
        })
      },
      getDiscussInfo(){
        discussInfo({ openid: uni.getStorageSync('openid') }).then(res => {
          this.disList = res.data.data
        })
      },
      like(id) {
        
        let o={
          id,
          openid: uni.getStorageSync('openid')
        }
        console.log(o)
        likeAction(o).then(async res=>{
          console.log(res)
          await this.getDiscussInfo();
        })
      }
    }
  }
</script>
<style scoped>
  .block,
  .top {
    display: flex;
  }

  .block {
    flex-direction: column;
    background: #fff;
    margin-bottom: 10px;
  }

  .banner-img {
    width: 100%;
    height: 20px;
  }

  .top,
  .mid,
  .bottom {
    padding: 0 10px 10px 10px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .flex {
    margin-left:5px;
    flex-direction: column;
    justify-content: center;

  }

  .nick-name {
    margin-bottom: 6px;
  }

  .bottom {
    display: flex;
    justify-content: space-around;
  }

  .left {
    flex: 1;
  }

  .right {
    width: 60px;
    display: flex;
    justify-content: center;
  }

  .like-margin {
    margin-right: 10px;
  }

  .text-sm {
    font-size: 20px;
  }

  .uni-input{
    width: 90%;
    margin: 5px auto 10px auto;
    height: 32px;
    border: 1px solid rgb(240,240,240);
    border-radius: 3px;
    background: rgb(240,240,240);
    padding-left:5px;
  }
</style>