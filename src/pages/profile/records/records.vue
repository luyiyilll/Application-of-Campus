<template>
  <view>
    <view class="cu-list menu-avatar margin-top-xs">
      <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in lastList"
        :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
        :data-target="'move-box-' + index">
        <view class="cu-avatar lg ">
          <img :src="item.avatar" class="avatar" alt="img">
        </view>
        <view class="content">
          <view class="title">{{item.title}}</view>
          <view class="text-gray text-sm">
            <text class="margin-right">{{item.nick_name}} </text>
            <text>浏览于{{item.view_time}} </text>
          </view>
        </view>
        <view class="text-grey text-xs"></view>
        <view class="move">
          <view class="bg-red" @click="deleteRecords(item.id,item.type)">删除</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import { getViewListByOpenid } from '../../../network/view'
  import { getFromatTime } from '../../../utils/constant'
  export default {
    data() {
      return {
        lastList: [],
        modalName: null,
        listTouchStart: 0,
        listTouchDirection: null,
      }
    },
    onLoad() {
      this.getViewList()
    },
    methods: {
      getViewList() {
        let openid = uni.getStorageSync('userInfo').openid
        getViewListByOpenid({ openid }).then(res => {
          console.log(res.data)
          let r = []
          res.data.data.forEach(item => {
            let o = {
              id: item.otherid,
              nick_name: item.nick_name,
              avatar: item.avatar,
              title: item.title1 ? item.title1 : item.title2,
              type: item.type,
              view_time: getFromatTime(item.viewtime)
            }
            r.push(o)
          })
          this.lastList = r;
          console.log(r)
        })
      },
      // ListTouch触摸开始，获取触摸点距盒子左侧的距离
      ListTouchStart(e) {
        this.listTouchStart = e.touches[0].pageX
      },
      // ListTouch计算方向，
      ListTouchMove(e) {
        this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
      },
      // ListTouch计算滚动
      ListTouchEnd(e) {
        if (this.listTouchDirection == 'left') {
          this.modalName = e.currentTarget.dataset.target
        } else {
          this.modalName = null
        }
        this.listTouchDirection = null
      },
      //删除浏览记录
      deleteRecords(id, type) {

      }
    }
  }
</script>
<style scoped>
  .list-item {
    background: #fff;
    padding: 10px;
  }

  .info {
    display: flex;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .name-and-date {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }

  .name-and-date text {
    height: 25px;
    line-height: 25px;
  }

  .cu-list>.cu-item {
    margin-top: 5px;
  }

  .title {
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>