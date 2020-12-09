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
      <view class="content-item" v-for="(item,index) in contentList" :key="index">
        <view class="content-text">
          <view class="bold">{{item.title}}</view>
          <view class="text-cut content-des text-gray text-sm">{{item.description}}</view>

        </view>
        <view class="view-tag flex">
          <view class="text-xs time text-gray">发布于{{item.publishtime}}</view>
          <view class="flex text-item margin-right">
            <view class="text-orange text-xs cuIcon-attention"></view>
            <view class="text-grey  text-xs text-height">{{item.views}}</view>
          </view>
          <view class="flex text-item  margin-right">
            <view class="text-yellow text-xs cuIcon-favor"></view>
            <view class="text-grey text-xs text-height">{{item.views}}</view>
          </view>
          <view class="flex text-item">
            <view class="text-red text-xs cuIcon-like"></view>
            <view class="text-grey text-xs text-height">{{item.views}}</view>
          </view>
        </view>
      </view>
    </view>
    <tab-bar></tab-bar>

  </view>
</template>

<script>
  import TabBar from '../../components/TabBar.vue';
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
        contentList: [
          {
            title: "第一次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党内容为入党内容为入党申请的通知...",
            views: 26
          },
          {
            title: "第二次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一内容为入党内容为入党内容为入党内容为入党 次会议，具体内容为入党申请的通知...",
            views: 32
          },
          {
            title: "第三次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党申请的通知...",
            views: 21
          },
          {
            title: "第四次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党申请的通知...",
            views: 22
          },
          {
            title: "第五次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党申请的通知...",
            views: 34
          },
          {
            title: "第五次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党申请的通知...",
            views: 34
          }
        ]
      };
    },
    components: {
      TabBar
    },
    onLoad() { },
    methods: {

      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        if (this.TabCur == 0) {
          this.contentList = [
            {
              title: "第一次通知",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入党体内容为申请的通知...",
              views: 26
            },
            {
              title: "第二次通知",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入体内容为体内容为体内容为党申请的通知...",
              views: 32
            },
            {
              title: "第三次通知",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为体内容为体内容为体内容为体内容为入党申请的通知...",
              views: 21
            },
            {
              title: "第四次通知",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入体内容为体内容为体内容为体内容为体内容为体内容为体内容为体内容为v党申请的通知...",
              views: 22
            },
            {
              title: "第五次通知",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入党申请的通知...",
              views: 34
            }
          ];
        } else if (this.TabCur == 1) {
          this.contentList = [
            {
              title: "第一次会议",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入党申请的通知...",
              views: 26
            },
            {
              title: "第二次会议",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入党申请的通知...",
              views: 32
            },
            {
              title: "第三次会议",
              publishtime: "2020-11-25",
              description: "在10501展开第一次会议，具体内容为入党申请的通知...",
              views: 21
            }
          ];
        } else {
          this.contentList = [
            {
              title: "入党申请通过名单",
              publishtime: "2020-11-25",
              description: "以下同学的入党申请通过...",
              views: 26
            }
          ];
        }
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
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
    border-bottom: 1px solid rgb(240, 240, 240);
    padding: 8px;
  }

  .content-text {
    display: flex;
    flex-direction: column;
    align-self: start;
    margin: 5px 8px;
    text-overflow: ellipsis;
  }

  .content-des {
    margin: 8px 0 4px 0;
    width: 100%;
  }

  .time {
    flex: 1;
    align-items: flex-end;
  }

  .view-tag {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    line-height: 100%;
    margin: 5px;
  }

  .text-item {
    width: 25px;

  }

  .text-height {
    line-height: 16px;

  }
</style>