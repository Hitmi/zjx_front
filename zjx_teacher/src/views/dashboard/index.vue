<template>
  <div class="app-container">
    <div class="user-container">
      <!--用户主要内容-->
      <div class="user-img">
        <img
          :src="teacher.avatar"
          alt=""
          width="100%"
          height="100%"
          style="border-radius: 14px"
        /><!--用户头像-->
      </div>
      <div class="user-username">教师号: {{ teacher.username }}</div>
      <div class="user-content">
        <!--用户资料-->
        <form class="user-form"><!--用户资料表单--></form>
        <table class="user-table">
          <tr class="user-tr">
            <td class="user-attribute">姓名:</td>
            <td class="user-value">{{ teacher.name }}</td>
            <td class="user-attribute">性别:</td>
            <td class="user-value">
              <span v-if="teacher.sex == 1">男</span>
              <span v-else>女</span>
            </td>
          </tr>
          <!--姓名与性别-->
          <tr class="user-tr">
            <td class="user-attribute">出生日期:</td>
            <td class="user-value">{{ teacher.birth }}</td>
            <td class="user-attribute">头衔:</td>
            <td class="user-value">
              <span v-if="teacher.level == 3">讲师</span>
              <span v-else-if="teacher.level == 1">教授</span>
              <span v-else-if="teacher.level == 2">副教授</span>
              <span v-else-if="teacher.level == 4">工程师</span>
              <span v-else-if="teacher.level == 5">高级工程师</span>
            </td>
          </tr>
          <!--手机号与所属部门-->
          <tr class="user-tr">
            <td class="user-attribute">所属部门:</td>
            <td class="user-value">{{ department }}</td>
            <td class="user-attribute">教师Id:</td>
            <td class="user-value">{{ teacher.id }}</td>
          </tr>
          <!--出生年月和毕业时间-->
          <tr class="user-tr">
            <td class="user-attribute">个人简介:</td>
            <td class="user-value" colspan="3">{{ teacher.intro }}</td>
          </tr>
          <!--个人简介-->
        </table>
      </div>
      <div class="user-change">
        <!-- <el-button
          type="text"
          @click="centerDialogVisible1 = true"
          class="btn01"
          >修改密码</el-button
        > -->

        <el-dialog
          title="修改密码"
          :visible.sync="centerDialogVisible1"
          width="30%"
          center
        >
          <!--修改密码-->
          <div>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="原密码" prop="oldpass">
                <el-input
                  type="password"
                  v-model="ruleForm.oldpass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit1">提 交</el-button>
          </span> -->
        </el-dialog>

        <!--改密码-->
        <!-- <el-button
          type="text"
          @click="centerDialogVisible2 = true"
          class="btn02"
          >修改资料</el-button
        > -->

        <el-dialog
          title="修改资料"
          :visible.sync="centerDialogVisible2"
          width="50%"
          center
        >
          <div>
            <el-form ref="form" :model="copychangemessage" label-width="80px">
              <!-- <el-form-item label="姓名 *">
                <el-input
                  v-model="form.name"
                  readonly="readonly"
                  id="unable"
                ></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="性别 *">
                <el-input
                  v-if="form.sex == 0"
                  v-model="this.male"
                  readonly="readonly"
                  id="unable"
                ></el-input>
                <el-input
                  v-else-if="form.sex == 1"
                  v-model="this.famale"
                  readonly="readonly"
                  id="unable"
                ></el-input> 
              </el-form-item> -->
              <el-form-item label="手机号">
                <el-input v-model="copychangemessage.mobile"></el-input>
              </el-form-item>
              <!-- <el-form-item label="所属班级 *">
                <el-input
                  v-model="form.department"
                  readonly="readonly"
                  id="unable"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="出生日期">
                <el-input v-model="copychangemessage.birth"></el-input>
              </el-form-item>
              <!-- <el-form-item label="毕业日期 *">
                <el-input
                  v-model="form.graduateDate"
                  readonly="readonly"
                  id="unable"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="个人简介">
                <el-input
                  type="textarea"
                  v-model="copychangemessage.sign"
                ></el-input>
              </el-form-item>
              <span style="font-weight: 700">上传新头像</span
              ><el-upload
                class="avatar-uploader"
                :action="ALIYUN_API + '/admin/aliyun/oss/upload?module=avatar'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!--用户照片-->
            </el-form>
            <!--这里放个人资料的input-->
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit2">修 改</el-button>
          </span>
          <!--这里提交修改-->
        </el-dialog>
        <!--改资料-->
      </div>
      <!--用户修改密码，修改资料-->
    </div>
  </div>
</template>

<script>
import studentApi from "@/api/person/student";
import departmentApi from "@/api/person/department";
import teacherApi from '@/api/person/teacher'
import InfoDetail from "@/views/person/info/InfoDetail";
export default {
  name: "Setting",
  data() {

    var validatePass0 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }; //修改密码的
    return {
      department:"",     //所属部门
      teacher: {},
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      male: "男",
      famle: "女",
      form: {
        name: "", //名字
        sex: "", //性别
        sign: "", //个人简介
        departmentId: "", //部门ID
        department: "", //部门名称
        graduateDate: "", //毕业时间
        username: "", //用户名
      },
      changemessage: {
        //后台的数据
        avatar: "", //头像
        birth: "", //生日
        id: "", //id
        mobile: "", //手机号
        sign: "", //个人简介
      },
      copychangemessage: {
        //拷贝后台数据，以防不必要的错误
        avatar: "", //头像
        birth: "", //生日
        id: "", //id
        mobile: "", //手机号
        sign: "", //个人简介
      },
      ruleForm: {
        oldpass: "", //用户输入旧密码
        pass: "", //编辑新密码
        checkpass: "", //确认编辑新密码
      },
      checkform: {
        oldPassword: "", //服务器传原密码
        newPassword: "", //传给服务器新密码
      },
      rules: {
        oldpass: [{ validator: validatePass0, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      imageUrl: "",
      BASE_API: process.env.BASE_API,
      ALIYUN_API: process.env.ALIYUN_API,
      flag: false, //修改密码的flag
      flag2: false, //修改资料的flag
    };
  },
    mounted() {
    this.getUserInfo()
  },
  methods: {

    staticdata() {
      //在修改资料失败时，确保原数据
      this.copychangemessage.avatar = this.changemessage.avatar;
      this.copychangemessage.birth = this.changemessage.birth;
      this.copychangemessage.id = this.changemessage.id;
      this.copychangemessage.mobile = this.changemessage.mobile;
      this.copychangemessage.sign = this.changemessage.sign;
    },
    showimg() {
      //回显照片
      this.imageUrl = this.changemessage.avatar;
    },
    submitForm(formName) {
      this.centerDialogVisible1 = false;
      this.checkform.oldPassword = this.ruleForm.oldpass;
      this.checkform.newPassword = this.ruleForm.pass;
      return studentApi
        .updatePassword(this.checkform.oldPassword, this.checkform.newPassword) //修改密码
        .then((res) => {
          this.flag = true;
          this.$message({
            message: "修改成功",
            type: "success",
          });
          console.log(res);
          // this.$router.go(0);
          this.resetForm(formName);
        })
        .catch((err) => {
          this.flag = false;
          console.log(err);
        });
      // if(this.flag){
      //   alert("修改成功");
      // }else{
      //   alert("原密码错误");
      // }
      // this.$refs[formName].validate((this.flag) => {
      //   if (this.flag) {
      //     alert("修改成功");
      //   } else {
      //     console.log("原密码错误");
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }, //修改密码的
    async getalldata() {
      //异步调用
      // await this.getData();
      await this.getUserInfo();
      await this.getdepartment();
      await this.staticdata();
      await this.showimg();
    },
    // getData() {
    //   return studentApi
    //     .getDetail()
    //     .then((res) => {
    //       console.log(res);
    //       this.changemessage.avatar = res.data.item.avatar;
    //       this.form.graduateDate = res.data.item.graduateDate;
    //       this.changemessage.birth = res.data.item.birth;
    //       this.changemessage.mobile = res.data.item.mobile;
    //       this.form.name = res.data.item.name;
    //       this.changemessage.id = res.data.item.id;
    //       this.form.sex = res.data.item.sex;
    //       this.changemessage.sign = res.data.item.sign;
    //       this.form.departmentId = res.data.item.departmentId;
    //       this.form.username = res.data.item.username;
    //       this.checkform.oldPassword = res.data.item.password;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
      getUserInfo() {
      return  teacherApi.getUserInfo().then(response => {
        this.teacher = response.data.item;
        console.log(response);
      })
    },
    getdepartment() {
      return departmentApi
        .getById(this.teacher.departmentId)
        .then((res) => {
          this.department = res.data.item.name;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit1() {
      this.centerDialogVisible1 = false; //关闭修改密码的弹框
    },
    onSubmit2() {
      //修改个人资料
      this.centerDialogVisible2 = false; //关闭修改资料的弹框
      return studentApi
        .updateInfo(this.copychangemessage) //注意这里传的是copy的数据
        .then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.go(0); //刷新一下页面
          console.log(res); //要把数据给changemessage 提交以后要把拷贝的数据给changemessage(异步调用已经实现)
          console.log(this.changemessage);
          console.log(this.copychangemessage);
        })
        .catch((err) => {
          this.$message({
            message: "修改失败",
            type: "error",
          });
          console.log(err);
        });
    },
    maleorfamale(sex) {
      if (sex == 0) {
        return this.male;
      } else {
        return this.famle;
      }
    },
    handleAvatarSuccess(res, file) {
      //头像
      this.imageUrl = URL.createObjectURL(file.raw);
      this.copychangemessage.avatar = res.data.url;
    },
    beforeAvatarUpload(file) {
      this.imageUrl = this.changemessage.avatar;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    this.getalldata();
  },
};
</script>

<style scoped>
.user-container {
  width: 100%;
  height: auto;
  padding: 50px 20px;
}
.user-img {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 14px;
  margin-left: 50%;
  transform: translate(-50%);
  margin-bottom: 20px;
}
.user-ID {
  font-size: 20px;
  margin-left: 50%;
  transform: translate(-50%);
  text-align: center;
  margin-bottom: 20px;
}
.user-username {
  font-size: 20px;
  margin-left: 50%;
  transform: translate(-50%);
  text-align: center;
  margin-bottom: 20px;
}
form {
  margin: 0;
  padding: 0;
}
td {
  height: 50px;
  border-bottom: 1px solid rgb(224, 224, 224);
  border-right: 1px solid rgb(224, 224, 224);
}
.user-table {
  width: 100%;
  border-top: 1px solid rgb(224, 224, 224);
  border-left: 1px solid rgb(224, 224, 224);
  border-collapse: collapse;
  border-radius: 4px;
  border-right: none;
  border-bottom: none;
  margin-bottom: 34px;
}
.user-attribute {
  background: rgb(243, 243, 243);
  width: 20%;
  color: rgb(68, 68, 68);
  font-size: 20px;
  text-align: right;
  padding-right: 22px;
}
.user-value {
  text-align: center;
  font-size: 15px;
  width: 30%;
  color: rgb(62, 62, 62);
}
.user-change {
  width: 100%;
  margin-top: 50px;
  padding: 20px;
  overflow: hidden;
}
button {
  color: white;
  font-size: 20px;
  background-color: rgba(64, 158, 255);
  width: 100px;
  height: 50px;
  border-radius: 10px;
  border: 0.1px solid #f5f5f579;
  outline: none;
}
button:hover {
  border-color: rgb(151, 168, 190);
}
.btn01 {
  background-color: red;
  float: left;
  margin-left: 30%;
  transform: translate(-50%);
}
.btn01:hover {
  color: red;
  background-color: white;
}
.btn02 {
  float: left;
  margin-left: 30%;
  transform: translate(-50%);
}
/**用户头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/**用户头像 */
</style>