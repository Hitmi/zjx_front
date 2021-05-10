<template>
  <div class="app-container">
    <div class="user-container">
      <!--用户主要内容-->
      <div class="user-img">
        <img
          :src="changemessage.imgsrc"
          alt=""
          width="100%"
          style="border-radius: 14px"
        /><!--用户头像-->
      </div>
      <div class="user-username">学号: {{ form.username }}</div>
      <div class="user-content">
        <!--用户资料-->
        <form class="user-form"><!--用户资料表单--></form>
        <table class="user-table">
          <tr class="user-tr">
            <td class="user-attribute">姓名:</td>
            <td class="user-value">{{ form.name }}</td>
            <td class="user-attribute">性别:</td>
            <td class="user-value">
              <span v-if="form.sex == 0">男</span
              ><span v-if="form.sex == 1">女</span>
            </td>
          </tr>
          <!--姓名与性别-->
          <tr class="user-tr">
            <td class="user-attribute">手机号:</td>
            <td class="user-value">{{ changemessage.mobile }}</td>
            <td class="user-attribute">所属班级:</td>
            <td class="user-value">{{ form.department }}</td>
          </tr>
          <!--手机号与所属部门-->
          <tr class="user-tr">
            <td class="user-attribute">出生日期:</td>
            <td class="user-value">{{ changemessage.birth }}</td>
            <td class="user-attribute">毕业日期:</td>
            <td class="user-value">{{ form.graduateDate }}</td>
          </tr>
          <!--出生年月和毕业时间-->
          <tr class="user-tr">
            <td class="user-attribute">个人简介:</td>
            <td class="user-value" colspan="3">{{ changemessage.sign }}</td>
          </tr>
          <!--个人简介-->
        </table>
      </div>
      <div class="user-change">
        <el-button
          type="text"
          @click="centerDialogVisible1 = true"
          class="btn01"
          >修改密码</el-button
        >

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
        <el-button
          type="text"
          @click="centerDialogVisible2 = true"
          class="btn02"
          >修改资料</el-button
        >

        <el-dialog
          title="个人资料"
          :visible.sync="centerDialogVisible2"
          width="50%"
          center
        >
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名 *">
                <el-input
                  v-model="form.name"
                  readonly="readonly"
                  id="unable"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别 *">
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
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="changemessage.mobile"></el-input>
              </el-form-item>
              <el-form-item label="所属班级 *">
                <el-input
                  v-model="form.department"
                  readonly="readonly"
                  id="unable"
                ></el-input>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-input v-model="changemessage.birth"></el-input>
              </el-form-item>
              <el-form-item label="毕业日期 *">
                <el-input
                  v-model="form.graduateDate"
                  readonly="readonly"
                  id="unable"
                ></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input
                  type="textarea"
                  v-model="changemessage.sign"
                ></el-input>
              </el-form-item>
              <span>上传新头像</span
              ><el-upload
                class="avatar-uploader"
                :action="BASE_API + '/admin/oss/file/upload?module=avatar'"
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
        imgsrc: "", //头像
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
      flag:false,
    };
  },
  methods: {
    submitForm(formName) {
      this.centerDialogVisible1 = false;
      this.checkform.oldPassword = this.ruleForm.oldpass;
      this.checkform.newPassword = this.ruleForm.pass;
      studentApi
        .updatePassword(this.checkform.oldPassword,this.checkform.newPassword)
        .then((res) => {
          this.flag=true;
          alert("修改成功");
          console.log(res);
        })
        .catch((err) => {
          this.flag=false;
          alert("原密码错误");
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
      await this.getData(); //异步调用
      await this.getdepartment();
    },
    getData() {
      return studentApi
        .getDetail()
        .then((res) => {
          console.log(res);
          this.changemessage.imgsrc = res.data.item.avatar;
          this.form.graduateDate = res.data.item.graduateDate;
          this.changemessage.birth = res.data.item.birth;
          this.changemessage.mobile = res.data.item.mobile;
          this.form.name = res.data.item.name;
          this.changemessage.id = res.data.item.id;
          this.form.sex = res.data.item.sex;
          this.changemessage.sign = res.data.item.sign;
          this.form.departmentId = res.data.item.departmentId;
          this.form.username = res.data.item.username;
          this.checkform.oldPassword = res.data.item.password;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getdepartment() {
      return departmentApi
        .getById(this.form.departmentId)
        .then((res) => {
          this.form.department = res.data.item.name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit1() {
      this.centerDialogVisible1 = false; //关闭修改密码的弹框
    },
    onSubmit2() {
      this.centerDialogVisible2 = false; //关闭修改资料的弹框
      return studentApi.updateInfo(this.changemessage).then((res) => {
        console.log(res);
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
    },
    beforeAvatarUpload(file) {
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