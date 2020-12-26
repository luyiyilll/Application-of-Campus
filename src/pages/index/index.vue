<template>
  <view class="container">
    <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
      duration="500">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item.url" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <scroll-view scroll-x class="bg-white nav text-center">
      <view class="cu-item" :class="index == TabCur ? 'text-blue cur' : ''" v-for="(item, index) in navList"
        :key="index" @tap="tabSelect" :data-id="index">{{ item.title }}</view>
    </scroll-view>
    <view class="content-list">
      <view class="content-item" v-for="(item,index) in contentList" :key="index" @click="enterContent(item.id)">
        <view class="content-item-box">
          <view class="content-text">
            <view class="bold ">【<text class="title">{{item.title}}</text>】</view>
            <view class="text-cut content-des text-split text-gray">{{item.desc}}</view>
            <view class="time-box">
              <text class="text-sm text-gray">{{item.postdate}}</text>
            </view>
          </view>

        </view>
      </view>
    </view>
    <tab-bar></tab-bar>

  </view>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
  import { list } from '../../network/notice'
  export default {
    data() {
      return {
        TabCur: 0,
        swiperList: [
          {
            id: 0,
            url:
              "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"
          },
          {
            id: 1,
            url:
              "https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg"
          },
          {
            id: 2,
            url:
              "https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"
          },
        ],

        navList: [
          { title: "通知", icon: "" },
          { title: "会议", icon: "" },
          { title: "公示", icon: "" }
        ],
        contentList: [],
        noticeList: [],
        meetingList: [],
        announceList: []
      };
    },
    components: {
      TabBar
    },
    onLoad() {
      this.getNoticeList();
      this.getMeetingList();
      this.getAnnounceList();
    },
    methods: {
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        if (this.TabCur == 0) {
          this.contentList = this.noticeList;
        } else if (this.TabCur == 1) {
          this.contentList = this.meetingList;
        } else {
          this.contentList = this.announceList;
        }
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
      },
      enterContent(id) {
        uni.navigateTo({
          url: '/pages/index/content/content?id=' + id + '&type=' + this.TabCur
        });
      },

      /*通知列表*/
      getNoticeList() {
        console.log()
        list({ type: 0 }).then(res => {
          this.noticeList = res.data.data;
          this.contentList = this.noticeList;
          console.log(res.data.data)
        })
      },

      /*会议列表*/
      getMeetingList() {
        list({ type: 1 }).then(res => {
          this.meetingList = res.data.data
        })
      },

      /*公示名单列表*/
      getAnnounceList() {
        list({ type: 2 }).then(res => {
          this.announceList = res.data.data
        })
      }
    }
  };
</script>

<style scoped>
  .text-blue,
  .line-blue,
  .lines-blue {
    color: rgb(196, 127, 119);
  }

  .content-list {
    border-top: 1px solid rgb(240, 240, 240);
    background: #fff;
    margin-bottom: 60px;
  }

  .content-item {
    width: 95%;
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 8px;
  }

  .content-item-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .content-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: start;
    margin: 5px 8px;

  }

  .content-des {
    margin: 8px 0 4px 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>