<template>
  <div class="logincontainer">
    <img
      v-if="currentUser === null"
      src="../../assets/images/userIcon.png"
      class="usericon"
    />
    <img v-else :src="currentUser.avatarUrl" class="usericon" />
    <span @click="loginPopup" v-if="currentUser === null">未登录</span>
    <span @click="exitLogin" v-else>退出登录</span>
    <el-dialog title="提示" :visible.sync="loginDialog">
      <el-form label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="loginInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginDialog: false,
      loginInfo: {
        phone: "",
        password: ""
      },
      currentUser:
        window.localStorage.getItem("currentuser") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("currentuser"))
    };
  },
  methods: {
    loginPopup() {
      this.loginDialog = true;
    },
    exitLogin() {
      window.localStorage.removeItem("currentuser");
      this.currentUser = null;
    },
    loginSubmit() {
      this.$axios
        .get(
          "http://musicapi.leanapp.cn/login/cellphone?phone=" +
            this.loginInfo.phone +
            "&password=" +
            this.loginInfo.password
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 250 || res.data.code == 502) {
            return this.$message(res.data.message);
          } else if (res.data.code == 200) {
            window.localStorage.setItem(
              "currentuser",
              JSON.stringify(res.data.profile)
            );
            this.currentUser = res.data.profile;
            console.log(this.currentUser);
            //隐藏弹窗
            this.loginDialog = false;
            return this.$message({
              message: "登录成功",
              type: "success"
            });
            //保存至localstorage
            //为什么要转换为json字符串
          }
        })
        .catch(err => {
          console.log(err);
          return this.$message("请求失败");
        });
    }
  }
};
</script>
<style scoped>
.logincontainer {
  display: flex;
  align-items: center;
}
.usericon {
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
}
</style>
