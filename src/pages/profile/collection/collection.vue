<template>
  <view>
    <view class="search-box margin-top-sm">
      <view class="cu-bar search bg-white">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索会议、通知、公示、讨论"
          confirm-type="search"/>
        </view>
        <view class="action">
          <text>搜索</text>
        </view>
      </view>
    </view>
    <view class="classify bg-white">
      <view class="nav-tab">通知</view>
      <view class="line"></view>
      <view class="nav-tab">会议</view>
      <view class="line"></view>
      <view class="nav-tab">公示</view>
      <view class="line"></view>
      <view class="nav-tab">讨论</view>
    </view>

    <view class="cu-list menu-avatar">
      <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in searchList" :key="index"
      @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
        <view class="cu-avatar lg ">
          <img :src="item.avatar" class="avatar" alt="img">
        </view>
        <view class="content">
          <view class="title">{{item.title}}</view>
          <view class="text-gray text-sm">
            <text>收藏于{{item.collectTime}} </text>
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
      modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
      searchList:[
        {title:'入党申请公示名单', collectTime:'2020-10-2',likes:'23',views:'26',collect:'7'},
        {title:'第一次会议',collectTime:'2020-9-2',likes:'23',views:'26',collect:'7'}
      ]
    }
  },
  methods: {
    InputBlur(){

    },

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
  },

}
</script>
<style scoped>

  .search-box, .classify{
   margin:auto;
  }
  .search-box{
    background:#fff;
    padding-top:10px;
    margin-top:10px;
  }
  .classify{
    display:flex;
    justify-content:space-around;
    align-items: center;
    padding-bottom:10px;
  }
  .classify .nav-tab{
    padding:10px;
    height:50px;
    line-height:30px;
    flex-direction: column;
    align-items:center;
  }
  .line{
    width:1px;
    background:rgba(197, 132, 126,.2);
    height:30px;
  }
  .margin-top{
    margin-top:10px;
  }
  .title{
    font-weight:bold;
    margin-bottom:10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cu-item{
    margin-top:5px;
  }
</style>
