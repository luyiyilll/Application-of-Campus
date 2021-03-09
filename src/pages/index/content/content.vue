<template>
  <view class="container border-top">
    <view class="title margin-bottom">{{content.title}}</view>
    <view class="text-gray time">
      {{content.postdate}}
    </view>
    <view class="margin-top">
      <rich-text :nodes="content.desc"></rich-text>
    </view>
    <view class="icon-box margin-top">
      <view class="icon">
        <view class="collects" @click="toCollect">
          <span class="icon-item text-red" :class="isActive?'cuIcon-favorfill text-red':'cuIcon-favor'"></span>
          <span class="text-gray text-sm">{{content.collects}}</span>
        </view>
        <view class="likes">
          <span class="icon-item text-green cuIcon-attention"></span>
          <span class="text-gray text-sm">{{content.views}}</span>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
  import { getFromatTime } from '../../../utils/constant'
  import { getContById } from '../../../network/notice'
  import { addView } from '../../../network/view'
  import { addCollect, deleteCollect, isCollect } from '../../../network/collect'
  export default {
    data() {
      return {
        id: '',
        content: {},
        isActive: false
      }
    },
    onLoad(e) {
      this.id = e.id;
      this.type = e.type;
      this.getContent(this.id)
      this.getIsCollect(this.id, uni.getStorageSync('userInfo').openid)
      this.addViews(this.id)
    },
    methods: {
      toCollect() {
        let o = {
          id: this.id,
          openid: uni.getStorageSync('userInfo').openid
        }
        let like = !this.isActive
        if (like) {
          this.addCollection(o)
        } else {
          this.deleteCollection(o)
        }
      },
      getContent(id) {
        getContById({ id }).then(res => {
          this.content = res.data.data
          this.content.postdate = getFromatTime(res.data.data.postdate)
        }).catch(e => {
          console.log(e)
        })
      },
      getIsCollect(id, openid) {
        let o = {
          id,
          openid
        }
        isCollect(o).then(res => {
          if (res.data.code == 1) {
            this.isActive = true
          } else if (res.data.code == -1) {
            this.isActive = false
          }
        })
      },
      addViews(id) {
        let o = {
          id,
          openid: uni.getStorageSync('userInfo').openid,
          type: 0
        }
        addView(o).then(res => {
          console.log('浏览成功')
        })
      },
      addCollection(o) {
        addCollect(o).then(res => {
          this.isActive = !this.isActive
          this.content.collects = this.content.collects + 1
        })
      },
      deleteCollection(o) {
        deleteCollect(o).then(res => {
          this.content.collects = this.content.collects - 1
          this.isActive = !this.isActive
        })
      }
    },
  }
</script>
<style scoped>
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .time {
    text-align: center;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .icon-box {
    position: relative;
    flex: 1;
    width: 100%;
  }

  .icon {
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    width: 100%;

  }

  .collects,
  .likes {
    margin: 5px
  }

  .icon-item {
    font-size: 25px;
    margin: 0 5px;
  }
</style>