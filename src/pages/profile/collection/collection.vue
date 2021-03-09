<template>
  <view>
    <view class="search-box margin-top-sm">
      <view class="cu-bar search bg-white">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input @blur="InputBlur" v-model="keyword" :adjust-position="false" type="text" placeholder="搜索通知、会议、公示"
            confirm-type="search" />
        </view>
        <view class="action" @click="searchWord">
          <text>搜索</text>
        </view>
      </view>
    </view>
    <view class="cu-list grid col-3">
      <view class="cu-item" @click="getTypeCollect(0)">
        <view class="cuIcon-voicefill text-red"></view>
        <text>通知</text>
      </view>
      <view class="cu-item" @click="getTypeCollect(1)">
        <view class="cuIcon-noticefill text-yellow"></view>
        <text>会议</text>
      </view>
      <view class="cu-item" @click="getTypeCollect(2)">
        <view class="cuIcon-roundleftfill-copy text-orange"></view>
        <text>公示</text>
      </view>
    </view>
    <view class="cu-list menu-avatar">
      <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in searchList"
        :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
        :data-target="'move-box-' + index">
        <view class="cu-avatar lg ">
          <img :src="item.avatar" class="avatar" alt="img">
        </view>
        <view class="content" @click="enterContent(item.otherid,item.type)">
          <view class="title">{{item.title}}</view>
          <view class="text-gray text-sm">
            <text>收藏于{{item.time}} </text>
          </view>
        </view>
        <view class="text-grey text-xs"></view>
        <view class="move">
          <view class="bg-red" @click="deleteRecords(index)">删除</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import { getFromatTime } from '../../../utils/constant'
  import { getAllByOpenid, deleteCollect, deleteCollectById, getSearchWordList, getCollectByType } from '../../../network/collect'
  export default {
    data() {
      return {
        modalName: null,
        listTouchStart: 0,
        listTouchDirection: null,
        searchList: [],
        keyword: ''
      }
    },
    onLoad() {
      this.getList()
    },

    methods: {
      getList() {
        let openid = uni.getStorageSync('userInfo').openid
        getAllByOpenid({ openid }).then(res => {
          this.searchList = res.data.data
        })
      },
      InputBlur() { },
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
      deleteRecords(index) {
        let id = this.searchList[index].id;
        deleteCollectById({ id }).then(res => {
          this.getList()
        })
      },
      //搜索
      searchWord() {
        console.log(this.keyword)
        let o = {
          keyword: this.keyword,
          openid: uni.getStorageSync('userInfo').openid
        }
        getSearchWordList(o).then(res => {
          let r = []
          res.data.data.forEach(item => {
            let o = {
              avatar: item.avatar,
              otherid: item.otherid,
              time: getFromatTime(item.time),
              title: item.title,
              type: item.type
            }
            r.push(o)
          })
          this.searchList = r
        })
      },
      //进入详情
      enterContent(id, type) {
        console.log(id + "=====" + type)
        uni.navigateTo({
          url: '/pages/index/content/content?id=' + id + '&type=' + type
        });
      },
      //根据type获取收藏列表
      getTypeCollect(type) {
        console.log(type)
        let o = {
          type: type,
          openid: uni.getStorageSync('userInfo').openid
        }
        getCollectByType(o).then(res => {
          let r = []
          res.data.data.forEach(item => {
            let o = {
              avatar: item.avatar,
              otherid: item.otherid,
              time: getFromatTime(item.time),
              title: item.title,
              type: item.type
            }
            r.push(o)
          })
          this.searchList = r
        })
      }
    },

  }
</script>
<style scoped>
  .search-box,
  .classify {
    margin: auto;
  }

  .search-box {
    background: #fff;
    padding-top: 10px;
    margin-top: 10px;
  }

  .classify {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10px;
  }

  .width {
    padding: 0 20px 0 20px;
  }

  .classify .nav-tab {
    padding: 10px;
    height: 50px;
    line-height: 30px;
    flex-direction: column;
    align-items: center;
  }

  .line {
    width: 1px;
    background: rgba(197, 132, 126, .2);
    height: 30px;
  }

  .margin-top {
    margin-top: 10px;
  }

  .title {
    font-weight: bold;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cu-item {
    margin-top: 5px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .cu-list+.cu-list {
    margin-top: 0px;
  }
</style>