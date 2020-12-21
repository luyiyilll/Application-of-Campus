<template>
  <view>
    <!-- style="background:url('../../static/bg.jpg'); background-size: 100% 100%;" -->
    <view class="banner" style="background:url('../../static/profile_banner.png'); background-size: 100% 100%;" @click="toUserInfo">
      <view>
        <img :src="user.avatar" alt="" class="head-img">
      </view>
      <view>
        <view class="name">{{user.nick_name}}</view>
        <view class="identity">{{user.identity?user.identity:'群众'}}</view>
      </view>
    </view>
    <view class="nav-tab">
      <view class="nav-tab-content">
        <view class="cu-list grid col-4 no-border">
          <view class="cu-item" v-for="(item,index) in navList" :key="index" @click="navigateTo(index)">
            <view>
              <img :src="item.icon" alt="" class="nav-icon">
            </view>
            <text>{{item.title}}</text>
          </view>
        </view>
      </view>
    </view>
     <!-- <view class="nav-tab">
      <view class="nav-tab-content">
        <view class="cu-list grid col-4 no-border">
          <view class="cu-item" v-for="(item,index) in navListB" :key="index" @click="navigateTo(index)">
            <view>
              <img :src="item.icon" alt="" class="nav-icon">
            </view>
            <text>{{item.title}}</text>
          </view>
        </view>
      </view>
    </view> -->

    <view class="divider"></view>
    <tab-bar></tab-bar>
  </view>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  export default {
    data() {
      return {
        navList: [        
          { title: '我的申请', icon: '../../static/apply.png' },
          { title: '我的讨论', icon: '../../static/article.png' },
          { title: '我的收藏', icon: '../../static/colection.png' },
          { title: '最近浏览', icon: '../../static/records.png' },
        ],
        // navListB:[
        //   { title: '基本信息', icon: '../../static/article.png' },
        //   { title: '最近浏览', icon: '../../static/records.png' },

        // ],
        user:{}
      };
    },
    onShow(){
      this.user=uni.getStorageSync('userInfo')
      console.log('show',this.user)
    },
    onLoad() { 
      this.user=uni.getStorageSync('userInfo')
      console.log(this.user)
    },
    components: {
      TabBar
    },
    methods: {
      navigateTo(index) {
        if (index == 0) {
          uni.navigateTo({
            url: '/pages/profile/myapply/myapply'
          });

        } else if (index == 1) {
          uni.navigateTo({
            url: '/pages/profile/discuss/discuss'
          });

        } else if (index == 2) {
          uni.navigateTo({
            url: '/pages/profile/collection/collection'
          });
        } else {
          uni.navigateTo({
            url: '/pages/profile/records/records'
          });
        }
      },
      toUserInfo(){
        uni.navigateTo({
          url: '/pages/profile/info/info'
        });
      }
    },
  };
</script>

<style scoped>
  .banner {
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(197, 132, 126);
  }

  .head-img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    border: 3px solid #fff;
  }

  .identity,
  .name {
    color: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
  }
  .nav-tab{
    position: relative;
    top:-20px;
  }
  .nav-tab-content{
    padding:10px 5px 5px 5px;
    background:#fff;
    width:95%;
    margin:0 auto;
    border-radius:10px 10px 0 0;
  }
  .nav-icon {
    width: 25px;
    height: 25px;
  }

  .divider {
    height: 60px;
    width: 100%；
  }
</style>