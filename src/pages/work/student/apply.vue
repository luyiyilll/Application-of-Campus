<template>
  <view>
      <view class="info-title margin-top">填写基本信息</view>
      <view class="cu-form-group ">
				<view class="title">姓名</view>
				<input class="text-right" placeholder="请输入真实姓名" v-model="info.name"/>
			</view>
      <view class="cu-form-group">
        <view class="title">出生日期</view>
        <picker mode="date" v-model="info.date" start="1990-01-01" end="2020-09-01" @input="DateChange">
          <view class="picker">
            {{info.date?info.date:'请选择出生日期'}}
           </view>
        </picker>
      </view>
			<view class="cu-form-group">
				<view class="title">身份证号码</view>
				<input class="text-right" placeholder="请输入身份证号码" v-model="info.IDcode" @input="testIDcode"/>
			</view>
      <view class="text-right text-red" v-if="idflag">身份证号码格式不正确</view>
      <view class="cu-form-group">
				<view class="title">手机号码</view>
				<input class="text-right" placeholder="请输入手机号码" v-model="info.tel" @input="testTel"/>
			</view>
      <view class="text-right text-red" v-if="telflag">手机号码格式不正确</view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <radio-group name='sex' @change="sexChange">
          <label for="female">
            <radio  name="female" class='red radio' :class="radio=='female'?'checked':''" checked value="female"/>女
          </label>
					<label for="male">
            <radio class='red radio' :class="radio=='male'?'checked':''"  value="male"/>男
			  	</label>
        </radio-group>
			</view>
			<view class="cu-form-group">
				<view class="title">年级</view>
				<picker @change="gradeListChange" :value="indexg" :range="gradeList">
          <view class="picker">
              {{indexg>-1?gradeList[indexg]:'请选择年级'}}
          </view>
        </picker>
			</view>
      <view class="cu-form-group">
      <view class="title">学院</view>
        <picker @change="academicListChange" :value="indexa" :range="academicList">
          <view class="picker">
              {{indexa>-1?academicList[indexa]:'请选择学院'}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
				<view class="title">专业</view>
				<picker @change="majorListChange" :value="indexm" :range="majorList">
          <view class="picker">
            {{indexm>-1?majorList[indexm]:'请选择专业'}}
          </view>
        </picker>
			</view>
      <view class="cu-form-group">
				<view class="title">所属支部</view>
        <picker @change="departmentListChange" :value="indexd" :range="departmentList">
          <view class="picker">
            {{indexd>-1?departmentList[indexd]:'请选择所属支部'}}
          </view>
        </picker>
			</view>
      <view class="info-title margin-top">上传入党申请书</view>
      <view class="cu-form-group">
        <view>
          <l-file ref="lFile" @up-success="onSuccess"></l-file>
          <view class="padding text-center">
            <view class="padding">
              <button @tap="onUpload">上传</button>
            </view>
          </view>
        </view>
      </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      info:{
        name:'',
        sex:'female',
        date:'',
        IDcode:'',
        tel:'',
        grade:'',
        academic:'',
        major:'',
        department:''

      },
      idflag:false,
      telflag:false,
      gradeList:['2017','2018','2019','2020'],
      indexg:-1,
      academicList:[
        '计算机与信息科学',
        '汉语言文学',
        '商务英语'
      ],
      indexa:-1,
      majorList:[
        '计算机科学与技术',
        '电子商务',
        '软件工程'
      ],
      indexm:-1,
      departmentList:[
        '计信第一支部',
        '计信第二支部'
      ],
      indexd:-1,

      indeximg: -1,
			imgList: []
    }
  },
  onLoad(){
    
  },
  methods: {
    DateChange(e){
      this.info.date=e.detail.value;
      console.log(e.detail.value)
    },
    gradeListChange(e){
      this.indexg=e.detail.value
      this.info.grade=this.gradeList[this.indexg];
    },
    academicListChange(e){
      this.indexa = e.detail.value;
      this.info.academic=this.academicList[this.indexa];
    },
    majorListChange(e){
      this.indexm=e.detail.value;
      this.info.major=this.majorList[this.indexm];
    },
    departmentListChange(e){
      this.indexd=e.detail.value;
      this.info.department=this.departmentList[this.indexd]
    },
    sexChange(e){
      this.info.sex=e.detail.value
    },
    testIDcode(){
      console.log(this.info.IDcode)
      let parren=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(!parren.test(this.info.IDcode)){
        this.idflag=true;
      }else{
        this.idflag=false;
      }
    },
    testTel(){
       console.log(this.info.tel);
      let parren=/^1[3|4|5|8][0-9]\d{8}$/
      if(!parren.test(this.info.tel)){
        this.telflag=true;
      }else{
        this.telflag=false;
      }
    }
  },
}
</script>
<style scoped>
  radio{
    margin:0 3px;
  }
  .info-title{
    padding:10px 0px 10px 15px;;
    font-weight: bold;
    font-size: 16px;
    background: #fff;
    border-top:1px solid rgb(240, 240, 240);
    border-bottom:1px solid rgb(240, 240, 240);
  }
</style>