<template>
  <view>
    <view class="cu-list menu-avatar margin-top-xs">
      <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in lastList" :key="index"
      @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
        <view class="cu-avatar lg ">
          <img :src="item.avatar" class="avatar" alt="img">
        </view>
        <view class="content">
          <view class="title">{{item.title}}</view>
          <view class="text-gray text-sm">
            <text class="margin-right">{{item.nick_name}} </text>
            <text>{{item.postdate}} </text>
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
export default {
  data() {
    return {
      lastList:[
        {avatar:'../../../static/head.jpg',nick_name:'luyiyi_lll',postdate:'2020-10-2',title:'第一次会议...'},
        {avatar:'../../../static/head.jpg',nick_name:'luyiyi_lll',postdate:'2020-12-1',title:'第一145364677次会议公示入单申请通过名单'}
      ],
      modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
    }
  },

  methods: {
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
      deleteRecords(index){

      }
		}
}
</script>
<style scoped>
  .list-item{
    background: #fff;
    padding:10px;
  }
  .info{
    display:flex;
  }
  .avatar{
    width:50px;
    height:50px;
    border-radius:5px;
  }
  .name-and-date{
    padding-left:10px;
    display:flex;
    flex-direction: column;
  }
  .name-and-date text{
    height:25px;
    line-height:25px;
  }
  .cu-list>.cu-item{
    margin-top:5px;
  }
  .title{
    font-size:20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>