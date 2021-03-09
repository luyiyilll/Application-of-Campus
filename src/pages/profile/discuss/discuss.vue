<template>
  <view class="border-top">
    <view class="block" v-for="(item,index) in disList" :key="index">
      <view class="banner-img"
        style="background:url('../../../static/banner_top.jpg'); background-size: 100% 100%; background-position:top">
      </view>
      <view class="top">
        <img :src="item.avatar" alt="头像" class="avatar">
        <view class="flex">
          <view class="nick-name">{{item.nick_name}}</view>
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
          <view @click="toComment(item.id)"><span class="text-sm cuIcon-comment text-green"></span></view>
        </view>
      </view>

      <!-- <view class="cu-bar uni-form-item input">

        <input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
          @focus="getKeyBoard" @blur="InputBlur" placeholder="评论"></input>
        <view class="action">
          <text class="cuIcon-emojifill text-grey"></text>
        </view>
        <text>评论</text>
      </view> -->
      <!-- <view class="uni-form-item uni-column">
        <input class="uni-input" @focus="getKeyBoard" />
      </view> -->
    </view>

    <view class="cu-modal" :class="isShow==true?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">请输入评论内容</view>
          <view class="action" @tap="cancelComment">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view class="padding-xl">
          <textarea maxlength="-1" class="text-left" v-model="comment" placeholder="请输入讨论内容..."></textarea>
        </view>
        <view class="cu-bar bg-white">
          <view class="action margin-0 flex-sub  solid-left" @tap="cancelComment">取消</view>
          <view class="action margin-0 flex-sub text-green  solid-left" @tap="confirmComment()">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import { getFromatTime } from '../../../utils/constant'
  import { discussInfo, discussAllInfo } from '../../../network/discuss';
  import { addComment } from '../../../network/comment'
  import { likeAction } from '../../../network/like'
  export default {
    data() {
      return {
        type: 0,
        user: '',
        flag: false,
        curIndex: 0,
        disList: [],
        comment: '',
        commentId: 0,
        isShow: false
      }
    },
    onLoad(e) {
      this.type = e.type
      this.user = uni.getStorageSync('userInfo')
      this.getDiscussInfo();
    },
    methods: {
      getDiscussId(id) {
        console.log(id)
      },
      getKeyBoard() {
        uni.getSelectedTextRange({
          success: res => {
            console.log('getSelectedTextRange res', res.start, res.end)
          }
        })
      },
      getDiscussInfo() {
        if (this.type == 0) {
          discussInfo({ openid: uni.getStorageSync('openid') }).then(res => {
            let r = []
            res.data.data.forEach(item => {
              let o = {
                avatar: item.avatar,
                nick_name: item.nick_name,
                id: item.id,
                title: item.title,
                content: item.content,
                views: item.num,
                postdate: getFromatTime(item.postdate),
                islike: item.islike
              }
              r.push(o)
            })
            this.disList = r
          })
        } else {
          discussAllInfo().then(res => {
            let n = res.data.data;
            let r = [];
            discussInfo({ openid: uni.getStorageSync('openid') }).then(response => {
              let m = response.data.data
              n.forEach(item => {
                let o;
                for (let i = 0; i < m.length; i++) {
                  if (item.id == m[i].id) {
                    o = {
                      avatar: item.avatar,
                      nick_name: item.nick_name,
                      id: item.id,
                      title: item.title,
                      content: item.content,
                      views: item.views,
                      postdate: getFromatTime(item.postdate),
                      islike: m[i].islike
                    }
                    break;
                  } else {
                    o = {
                      avatar: item.avatar,
                      nick_name: item.nick_name,
                      id: item.id,
                      title: item.title,
                      content: item.content,
                      views: item.views,
                      postdate: getFromatTime(item.postdate),
                      islike: 0
                    }
                  }
                }
                r.push(o)
              })
            })
            this.disList = r
          })
        }

      },
      like(id) {
        let o = {
          id,
          openid: uni.getStorageSync('openid')
        }
        likeAction(o).then(async res => {
          await this.getDiscussInfo();
        })
      },
      toComment(id) {
        this.commentId = id
        this.isShow = true;
      },
      cancelComment() {
        this.isShow = false;
      },
      confirmComment() {
        let o = {
          openid: this.user.openid,
          id: this.commentId,
          type: this.type,
          content: this.comment
        }
        addComment(o).then(res => {
        })
        this.isShow = false;
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
    margin-left: 5px;
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

  .uni-input {
    width: 90%;
    margin: 5px auto 10px auto;
    height: 32px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 3px;
    background: rgb(240, 240, 240);
    padding-left: 5px;
  }
</style>