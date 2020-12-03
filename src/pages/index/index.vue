<template>
  <view>
    <swiper
      class="screen-swiper square-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
    >
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item.url" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <scroll-view scroll-x class="bg-white nav text-center">
      <view
        class="cu-item"
        :class="index == TabCur ? 'text-blue cur' : ''"
        v-for="(item, index) in navList"
        :key="index"
        @tap="tabSelect"
        :data-id="index"
      >{{ item.title }}</view>
    </scroll-view>
    <view class="content-list">
      <view class="content-item" v-for="(item,index) in contentList" :key="index">
        <view class="content-text">
          <view>{{item.title}}</view>
          <view class="text-gray text-sm flex">
            <view class="text-xs time">{{item.publishtime}}</view>
            <view class="text-cut content-des">{{item.description}}</view>
          </view>
        </view>
        <view class="view-tag flex">
          <view class="text-grey text-xs cuIcon-attention"></view>
          <view class="text-grey text-xs">{{item.views}}</view>
        </view>
      </view>
    </view>
    <view class="cu-bar tabbar bg-white footer">
      
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">签到</view>
			</view>
      
      <view class="action text-gray add-action">
        <button class="cu-btn cuIcon-add bg-green shadow"></button>
        发布
      </view>

			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">工作</view>
			</view>

      <view class="action text-gray">
        <view class="cuIcon-my">
          <view class="cu-tag badge"></view>
        </view>
        我的
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
        {
          id: 3,
          url:
            "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
        }
      ],
      TabCur: 0,
      navList: [
        { title: "通知", icon: "" },
        { title: "会议", icon: "" },
        { title: "公式", icon: "" }
      ],
      contentList: [
        {
          title: "第一次通知",
          publishtime: "2020-11-25",
          description: "在10501展开第一次会议，具体内容为入党申请的通知...",
          views: 26
        },
        {
          title: "第二次通知",
          publishtime: "2020-11-25",
          description: "在10501展开第一次会议，具体内容为入党申请的通知...",
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
        }
      ]
    };
  },
  components: {},
  onLoad() {},
  methods: {
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      if (this.TabCur == 0) {
        this.contentList = [
          {
            title: "第一次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党申请的通知...",
            views: 26
          },
          {
            title: "第二次通知",
            publishtime: "2020-11-25",
            description: "在10501展开第一次会议，具体内容为入党申请的通知...",
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
}
.content-item {
  border-bottom: 1px solid rgb(240, 240, 240);
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

.content-text {
  display: flex;
  flex-direction: column;
  align-self: start;
}
.time {
  display: flex;
  align-items: flex-end;
}
.content-text {
  text-overflow: ellipsis;
}
.view-tag {
  display: flex;
  align-items: flex-end;
  line-height: 100%;
}
.content-des {
  padding-left: 10px;
  width: 70%;
}
.footer{
  width:100%;
  position:fixed;
  bottom:0;
}
</style>
