<template name="TabBar">
  <view class="cu-bar tabbar bg-white footer">
    <view class="action" @click="NavChange" data-cur="index">
      <view class='cuIcon-cu-image'>
        <image :src="'../static/tabbarIcon/' + [PageCur=='index'?'index':'un-index'] + '.png'"></image>
      </view>
      <view :class="PageCur=='index'?'tab-text-color':'text-gray'">首页</view>
    </view>
    <view class="action" @click="NavChange" data-cur="signin">
      <view class='cuIcon-cu-image'>
        <image :src="'../static/tabbarIcon/' + [PageCur == 'signin'?'signin':'un-signin'] + '.png'"></image>
      </view>
      <view :class="PageCur=='signin'?'tab-text-color':'text-gray'">签到</view>
    </view>

    <view class="action text-gray add-action">
      <button class="cu-btn cuIcon-add bg-green shadow" @click="addArticle"></button>
      发布
    </view>

    <view class="action" @click="NavChange" data-cur="work">
      <view class='cuIcon-cu-image'>
        <image :src="'../static/tabbarIcon/' + [PageCur == 'work'?'work':'un-work'] + '.png'"></image>
      </view>
      <view :class="PageCur=='work'?'tab-text-color':'text-gray'">工作</view>
    </view>

    <view class="action" @click="NavChange" data-cur="profile">
      <view class='cuIcon-cu-image'>
        <image :src="'../static/tabbarIcon/' + [PageCur == 'profile'?'profile':'un-profile'] + '.png'"></image>
      </view>
      <view :class="PageCur=='profile'?'tab-text-color':'text-gray'">我的</view>
    </view>

    <!-- 发布讨论弹出框 -->
    <view class="cu-modal" :class="modal?'show':''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white ">
          <view class="content">发布讨论</view>
        </view>
        <view class="border-top border-bottom">
           <view class="cu-form-group">
            <input class="text-left title bold" v-model="discuss.title" placeholder="标题" name="input"/>
          </view>
        </view>
         <view class="border-bottom">
           <view class="cu-form-group">
              <textarea maxlength="-1" class="text-left" v-model="discuss.content" placeholder="请输入讨论内容..."></textarea>
            </view>
         </view>
        <view class="cu-bar bg-white">
          <view class="action margin-0 flex-sub text-green solid-left" @tap="cancel">取消</view>
          <view class="action margin-0 flex-sub  solid-left" @tap="confirm">确定</view>
        </view>
      </view>
    </view>

  </view>

  
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: "TabBar",
    data() {
      return {
        modal:false,
        discuss:{
          title:'',
          content:''
        }
      };
    },
    onLoad() { },
    computed: {
      ...mapState(['PageCur'])
    },
    methods: {
      ...mapMutations(['changePageCur']),
      NavChange(e) {
        if (this.PageCur != e.currentTarget.dataset.cur) {
          this.changePageCur(e.currentTarget.dataset.cur);
          uni.redirectTo({
            url: '../' + this.PageCur + "/" + this.PageCur
          })
        }
        console.log(e)
      },
      addArticle(){
        this.modal=true;
      },
      textareaAInput(e){

      },
      cancel(){
        console.log(this.discuss)
        this.modal=false;
      },
      confirm(){
        this.modal=false;
        this.discuss.title="";
        this.discuss.content="";
         console.log(this.discuss)
      }
    },
  };
</script>

<style>
  .footer {
    background: #fff !important;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid rgb(240, 240, 240);
    z-index: 999;
  }

  .tab-text-color {
    color: #000;
  }

  .bg-green {
    background: #c37667;
    color: #fff;
  }

  .title{
    font-size:16px;
  }
  .cu-bar{
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>