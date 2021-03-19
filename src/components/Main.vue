<template>
  <el-container>
    <el-header class="elhead">
      <el-menu default-active="/findmusic" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/findmusic">发现音乐</el-menu-item>
        <el-menu-item index="/mymusic">我的音乐</el-menu-item>
        <el-menu-item index="/songlist">创建的歌单</el-menu-item>
        <el-menu-item index="/songlist">收藏的歌单</el-menu-item>
      </el-menu>
      <!-- 登录区域 -->
      <div class="logincontainer">
        <img v-if="currentUser===null" src="../../static/img/userIcon.png" class="usericon" />
        <img v-else :src="currentUser.avatarUrl" class="usericon" />
        <span @click="loginPopup" v-if="currentUser===null">未登录</span>
        <span @click="exitLogin" v-else>退出登录</span>
      </div>
    </el-header>
    <el-container>
      <!-- <el-aside width="200px">Aside</el-aside> -->
      <el-container>
        <el-main class="maincontain">
          <button @click="test">test</button>
          <router-view :message="message" :curId="curId" @setSongListInfo="setSongListInfo"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <!-- audio -->
      <!-- <div>
        <audio controls="controls">
          <source
            src="https://cdn-px-hws-test.pxjy.com/audiozone/20200929/1601370183985.mp3"
            type="audio/mp3"
          />
        </audio>
      </div>-->
      <!-- 自定义audio -->
      <!-- <p>{{message}}</p> -->
      <PlayBar></PlayBar>
    </el-footer>

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
  </el-container>
</template>

<script>
import FindMusic from "./FindMusic";
import PlayBar from "./PlayBar";
import SongList from "./SongList";
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
          : JSON.parse(window.localStorage.getItem("currentuser")),
      message: [],
      curId: ""
    };
  },
  created() {
    console.log(this.currentUser);
  },
  components: {
    children: FindMusic,
    PlayBar,
    SongList
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
    },
    async setSongListInfo(songIds, curId) {
      console.log(songIds, curId);
      this.message = songIds;
      // console.log(this.message);
    },
    test() {
      alert(this.message);
    }
  }
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid rgb(224, 216, 216);
}
.el-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
}
.elhead {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-menu-demo {
  width: 500px;
  background: none;
}
.maincontain {
  padding: 0px;
}
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