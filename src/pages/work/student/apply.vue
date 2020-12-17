<template>
  <view class="border-top">
    <view class="info-title padding">填写基本信息</view>
    <view class="cu-form-group ">
      <view class="title">姓名</view>
      <input class="text-right"  placeholder="请输入真实姓名" v-model="info.realname" required/>
    </view>
    <view class="cu-form-group">
      <view class="title">出生日期</view>
      <picker mode="date" v-model="info.birthday" start="1990-01-01" end="2020-09-01" @change="DateChange">
        <view class="picker">
          {{info.date?info.date:'请选择出生日期'}}
        </view>
      </picker>
    </view>
    <view class="cu-form-group">
      <view class="title">身份证号码</view>
      <input class="text-right"  placeholder="请输入身份证号码" v-model="info.IDcode" @blur="testIDcode" required/>
    </view>
    <view class="text-right text-red" v-if="idflag">身份证号码格式不正确</view>
    <view class="cu-form-group">
      <view class="title">手机号码</view>
      <input class="text-right" placeholder="请输入手机号码" v-model="info.tel" @blur="testTel" required/>
    </view>
    <view class="text-right text-red" v-if="telflag">手机号码格式不正确</view>
    <view class="cu-form-group">
      <view class="title">性别</view>
      <radio-group name='sex' @change="sexChange">
        <label for="female">
          <radio name="female" class='red radio' :class="radio=='female'?'checked':''" checked value="female" />女
        </label>
        <label for="male">
          <radio class='red radio' :class="radio=='male'?'checked':''" value="male" />男
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

    <view class="info-title ">入党申请书材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
          <image :src="imgList[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">家庭成员及主要社会关系</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
          <image :src="imgList[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">个人履历材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
          <image :src="imgList[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">个人自传材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
          <image :src="imgList[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
    <view class="btn-box padding-bottom-sm padding-top-sm">
      <button class="cu-btn shadow-blur lg" @click="submitBtn">提交</button>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        user:{},
        info: {
          realname: '',
          gender: 'female',
          birthday: '',
          IDcode: '',
          tel: '',
          grade: '',
          academic: '',
          major: '',
          department: ''

        },
        gradeList: ['2017', '2018', '2019', '2020'],
        indexg: -1,
        academicList: [
          '计算机与信息科学',
          '汉语言文学',
          '商务英语'
        ],
        indexa: -1,
        majorList: [
          '计算机科学与技术',
          '电子商务',
          '软件工程'
        ],
        indexm: -1,
        departmentList: [
          '计信第一支部',
          '计信第二支部'
        ],
        indexd: -1,

        indeximg: -1,
        imgList: []
      }
    },
    onLoad() {
      this.user=uni.getStorageSync('userInfo')
    },
    methods: {
      DateChange(e) {
        let birth=new Date(e.detail.value)
        let now=new Date()
        let years=Math.floor((now-birth) / 1000 / 60 / 60 / 24/ 365)
        if(years>=18){
          this.info.date = e.detail.value;
        }else{
          uni.showToast({
            title: '未满18周岁!',
            icon:'none',
            duration: 2000
          })
        }
      },
      gradeListChange(e) {
        console.log(e.detail.value)
        this.indexg = e.detail.value
        this.info.grade = this.gradeList[this.indexg];
      },
      academicListChange(e) {
        this.indexa = e.detail.value;
        this.info.academic = this.academicList[this.indexa];
      },
      majorListChange(e) {
        this.indexm = e.detail.value;
        this.info.major = this.majorList[this.indexm];
      },
      departmentListChange(e) {
        this.indexd = e.detail.value;
        this.info.department = this.departmentList[this.indexd]
      },
      sexChange(e) {
        this.info.sex = e.detail.value
      },
      testIDcode() {
        console.log(this.info.IDcode)
        let parren = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!parren.test(this.info.IDcode)) {
           uni.showToast({
            title: '格式不正确!',
            icon:'none',
            duration: 2000
          })
          this.info.IDcode=''
        }
      
      },
      testTel() {
        console.log(this.info.tel);
        let parren = /^1[3|4|5|8][0-9]\d{8}$/
        if (!parren.test(this.info.tel)) {
           uni.showToast({
            title: '格式不正确!',
            icon:'none',
            duration: 2000
          })
          this.info.tel=''
        } 
      },
      ChooseImage() {
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.imgList.length != 0) {
              this.imgList = this.imgList.concat(res.tempFilePaths)
            } else {
              this.imgList = res.tempFilePaths
            }
          }
        });
      },
      ViewImage(e) {
        uni.previewImage({
          urls: this.imgList,
          current: e.currentTarget.dataset.url
        });
      },
      DelImg(e) {
        uni.showModal({
          title: '删除图片',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.imgList.splice(e.currentTarget.dataset.index, 1)
            }
          }
        })
      },
      submitBtn(){
        
        console.log(this.info)
      }
    },
  }
</script>
<style scoped>
  radio {
    margin: 0 3px;
  }

  .padding {
    padding-top: 10px;
    padding-bottom: 10px;
  }


  .btn-box {
    background: #fff;
    display: flex;
    justify-content: center;
  }

  .cu-btn {
    width: 90%;
    background: rgb(197, 132, 126);
    color: #fff;
  }
</style>