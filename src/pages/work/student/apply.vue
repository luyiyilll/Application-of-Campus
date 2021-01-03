<template>
  <view class="border-top" v-if="!!user.is_apply || user.is_apply==0">
    <view class="info-title padding">填写基本信息</view>
    <view class="cu-form-group ">
      <view class="title">姓名</view>
      <input class="text-right" placeholder="请输入真实姓名" v-model="info.realname" required />
    </view>
    <view class="cu-form-group">
      <view class="title">出生日期</view>
      <picker mode="date" v-model="info.date" start="1990-01-01" end="2020-09-01" @change="DateChange">
        <view class="picker">
          {{info.date?info.date:'请选择出生日期'}}
        </view>
      </picker>
    </view>
    <view class="cu-form-group">
      <view class="title">身份证号码</view>
      <input class="text-right" placeholder="请输入身份证号码" v-model="info.IDcode" @blur="testIDcode" required />
    </view>
    <view class="text-right text-red" v-if="idflag">身份证号码格式不正确</view>
    <view class="cu-form-group">
      <view class="title">手机号码</view>
      <input class="text-right" placeholder="请输入手机号码" v-model="info.tel" @blur="testTel" required />
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
        <view class="bg-img" v-for="(item,index) in info.petition_pic" :key="index" @tap="ViewImage(0,$event)"
          :data-url="info.petition_pic[index]">
          <image :src="info.petition_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg(0,$event)" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage(0)" v-if="info.petition_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">家庭成员及主要社会关系</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in info.family_pic" :key="index" @tap="ViewImage(1,$event)"
          :data-url="info.family_pic[index]">
          <image :src="info.family_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg(1,$event)" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage(1)" v-if="info.family_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">个人履历材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in info.resume_pic" :key="index" @tap="ViewImage(2,$event)"
          :data-url="info.resume_pic[index]">
          <image :src="info.resume_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg(2,$event)" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage(2)" v-if="info.resume_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>

    <view class="info-title ">个人自传材料</view>
    <view class="cu-form-group">
      <view class="grid margin-top-sm col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in info.statement_pic" :key="index" @tap="ViewImage(3,$event)"
          :data-url="info.statement_pic[index]">
          <image :src="info.statement_pic[index]" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="DelImg(3,$event)" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="ChooseImage(3)" v-if="info.statement_pic.length<4">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
    <view class="btn-box padding-bottom-sm padding-top-sm">
      <button class="cu-btn shadow-blur lg" @click="submitBtn">提交</button>
    </view>
  </view>
  <!--没有提交信息-->
  <view v-else>
    <view class="form">
      <view class="cu-form-group margin-top-sm">
        <view class="title">姓名</view>
        <input name="name" class="text-right" :value="user.realname" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">出生日期</view>
        <input name="ID" class="text-right" :value="user.birthday" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <input name="sex" class="text-right" :value="user.gender" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">身份证号码</view>
        <input name="ID" class="text-right" :value="user.IDcode" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">手机号码</view>
        <input name="tel" class="text-right" :value="user.tel" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">年级</view>
        <input name="grade" class="text-right" :value="user.grade" disabled />
        <!-- <text class='cuIcon-locationfill text-orange'></text> -->
      </view>
      <view class="cu-form-group">
        <view class="title">学院</view>
        <input name="acdemic" class="text-right" :value="user.academic" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">专业</view>
        <input name="major" class="text-right" :value="user.major" disabled />
      </view>
      <view class="cu-form-group">
        <view class="title">所属支部</view>
        <input name="major" class="text-right" :value="user.department" disabled />
      </view>

      <view class="info-title ">入党申请书材料</view>
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in info.petition_pic" :key="index" @tap="ViewImage(0,$event)"
            :data-url="info.petition_pic[index]">
            <image :src="info.petition_pic[index]" mode="aspectFill"></image>
          </view>
        </view>
      </view>

      <view class="info-title ">家庭成员及主要社会关系</view>
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in info.family_pic" :key="index" @tap="ViewImage(1,$event)"
            :data-url="info.family_pic[index]">
            <image :src="info.family_pic[index]" mode="aspectFill"></image>
          </view>
        </view>
      </view>

      <view class="info-title ">个人履历材料</view>
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in info.resume_pic" :key="index" @tap="ViewImage(2,$event)"
            :data-url="info.resume_pic[index]">
            <image :src="info.resume_pic[index]" mode="aspectFill"></image>
          </view>
        </view>
      </view>

      <view class="info-title ">个人自传材料</view>
      <view class="cu-form-group">
        <view class="grid margin-top-sm col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in info.statement_pic" :key="index" @tap="ViewImage(3,$event)"
            :data-url="info.statement_pic[index]">
            <image :src="info.statement_pic[index]" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import { getGrade, info, findUserByOid } from '../../../network/student/user'
  import { getAcademic, getMajor, getDepartment } from "../../../network/academic"
  export default {
    data() {
      return {
        user: {},
        info: {
          realname: '',
          gender: 'female',
          date: '',
          IDcode: '',
          tel: '',
          grade: '',
          academic: '',
          major: '',
          department: '',
          petition_pic: [],
          family_pic: [],
          resume_pic: [],
          statement_pic: []

        },
        gradeList: [],
        indexg: -1,
        academicList: [],
        indexa: -1,
        majorList: [],
        indexm: -1,
        departmentList: [
          '计信第一支部',
          '计信第二支部'
        ],
        indexd: -1,
        indeximg: -1,

      }
    },
    onShow() {
      this.user = uni.getStorageSync('userInfo')
      console.log(this.user)
      this.getAllGrade()
      this.getAllAcademic()
    },
    onLoad() {
      // this.user = uni.getStorageSync('userInfo')
      // console.log(this.user)
      // this.getAllGrade()
      // this.getAllAcademic()
    },
    methods: {
      getAllGrade() {
        getGrade().then(res => {
          let { data } = res.data;
          this.gradeList = data
        })
      },
      getAllAcademic() {
        getAcademic().then(res => {
          let { academic } = res.data;
          this.academicList = academic
        })
      },
      DateChange(e) {
        let birth = new Date(e.detail.value)
        let now = new Date()
        let years = Math.floor((now - birth) / 1000 / 60 / 60 / 24 / 365)
        if (years >= 18) {
          this.info.date = e.detail.value;
        } else {
          uni.showToast({
            title: '未满18周岁!',
            icon: 'none',
            duration: 2000
          })
        }
      },
      gradeListChange(e) {
        this.indexg = e.detail.value
        this.info.grade = this.gradeList[this.indexg];
      },
      academicListChange(e) {
        this.indexa = e.detail.value;
        this.info.academic = this.academicList[this.indexa];
        getMajor({ academic: this.info.academic }).then(res => {
          this.majorList = res.data.major
        }).catch(e => {
          this.info.academic = ''
        })
        getDepartment({ academic: this.info.academic }).then(res => {
          this.departmentList = res.data.depart
        })
      },
      majorListChange(e) {
        if (this.info.academic == '') {
          uni.showToast({
            title: '请先选择学院',
            icon: 'none'
          })
        } else {
          this.indexm = e.detail.value;
          this.info.major = this.majorList[this.indexm];
        }
      },
      departmentListChange(e) {
        this.indexd = e.detail.value;
        this.info.department = this.departmentList[this.indexd]
      },
      sexChange(e) {
        this.info.sex = e.detail.value
      },
      testIDcode() {
        let parren = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!parren.test(this.info.IDcode)) {
          uni.showToast({
            title: '格式不正确!',
            icon: 'none',
            duration: 2000
          })
          this.info.IDcode = ''
        }

      },
      testTel() {
        let parren = /^1[3|4|5|8][0-9]\d{8}$/
        if (!parren.test(this.info.tel)) {
          uni.showToast({
            title: '格式不正确!',
            icon: 'none',
            duration: 2000
          })
          this.info.tel = ''
        }
      },
      ChooseImage(index) {
        let _that = this;
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            console.log("-----000", res);
            this.aaa = res.tempFiles;
            if (index == 0) {
              if (this.info.petition_pic.length != 0) {
                this.info.petition_pic = this.info.petition_pic.concat(res.tempFilePaths)
              } else {
                this.info.petition_pic = res.tempFilePaths
              }
            } else if (index == 1) {
              if (this.info.family_pic.length != 0) {
                this.info.family_pic = this.info.family_pic.concat(res.tempFilePaths)
              } else {
                this.info.family_pic = res.tempFilePaths
              }
            } else if (index == 2) {
              if (this.info.resume_pic.length != 0) {
                this.info.resume_pic = this.info.resume_pic.concat(res.tempFilePaths)
              } else {
                this.info.resume_pic = res.tempFilePaths
              }
            } else if (index == 3) {
              if (this.info.resume_pic.length != 0) {
                this.info.statement_pic = this.info.statement_pic.concat(res.tempFilePaths)
              } else {
                this.info.statement_pic = res.tempFilePaths
              }
            }

          }
        });
      },
      ViewImage(index, e) {
        if (index == 0) {
          uni.previewImage({
            urls: this.info.petition_pic,
            current: e.currentTarget.dataset.url
          });
        } else if (index == 1) {
          uni.previewImage({
            urls: this.info.family_pic,
            current: e.currentTarget.dataset.url
          });
        } else if (index == 2) {
          uni.previewImage({
            urls: this.info.resume_pic,
            current: e.currentTarget.dataset.url
          });
        } else if (index == 3) {
          uni.previewImage({
            urls: this.info.statement_pic,
            current: e.currentTarget.dataset.url
          });
        }

      },
      DelImg(index, e) {
        uni.showModal({
          title: '删除图片',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              if (index == 0) {
                this.info.petition_pic.splice(e.currentTarget.dataset.index, 1)
              } else if (index == 1) {
                this.info.family_pic.splice(e.currentTarget.dataset.index, 1)
              } else if (index == 2) {
                this.info.resume_pic.splice(e.currentTarget.dataset.index, 1)
              } else if (index == 3) {
                this.info.statement_pic.splice(e.currentTarget.dataset.index, 1)
              }

            }
          }
        })
      },

      /*提交信息*/
      submitBtn() {
        let realname = this.info.realname;
        let gender = (this.info.gender == 'female' ? '女' : '男')
        let birthday = this.info.date;
        let IDcode = this.info.IDcode;
        let tel = this.info.tel;
        let grade = this.info.grade;
        let academic = this.info.academic;
        let major = this.info.major;
        let department = this.info.department;
        let petition_pic = this.info.petition_pic;
        let family_pic = this.info.family_pic;
        let resume_pic = this.info.resume_pic;
        let statement_pic = this.info.statement_pic;

        // if (realname && gender && birthday && IDcode && tel && grade && academic && major && department && petition_pic.length != 0 && family_pic.length != 0 && resume_pic.length != 0 && statement_pic.length != 0) {
        console.log(petition_pic);

        petition_pic.forEach((item, index) => {
          console.log(item)
          uni.uploadFile({
            url: 'http://localhost:3000/user/petitionpic',
            filePath: item,
            name: 'file',
            header: {
              "Authori-zation": uni.getStorageSync("openid"),
            },
            success: function (res) {
              console.log(res)
            }
          })
        })

        family_pic.forEach((item, index) => {
          console.log(item)
          uni.uploadFile({
            url: 'http://localhost:3000/user/familypic',
            filePath: item,
            name: 'file',
            header: {
              "Authori-zation": uni.getStorageSync("openid"),
            },
            success: function (res) {
              console.log(res)
            }
          })
        })

        let user = {
          openid: uni.getStorageSync('openid'),
          realname, gender, birthday, IDcode, tel, grade, academic, major, department
        }
        info({ user }).then(res => {
          findUserByOid({ openid: uni.getStorageSync('openid') }).then(r => {
            uni.setStorageSync('userInfo', r.data.user)
            uni.showToast({
              title: '已提交',
              duration: 2000,
              success: function () {

              }
            })
          })
        })
        // } else {
        //   uni.showToast({
        //     title: '信息填写不完整！!',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
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