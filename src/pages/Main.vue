<template>
  <el-container>
    <el-header class="elhead">
      <el-menu
        default-active="/find-music"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
      >
        <el-menu-item index="/find-music">发现音乐</el-menu-item>
        <el-menu-item index="/my-music">我的音乐</el-menu-item>
        <el-menu-item index="/song-list">创建的歌单</el-menu-item>
        <el-menu-item index="/song-list">收藏的歌单</el-menu-item>
      </el-menu>
      <Login />
    </el-header>
    <el-container>
      <!-- <el-aside width="200px">Aside</el-aside> -->
      <el-container>
        <el-main class="maincontain">
          <button @click="test">test</button>
          <router-view
            :message="message"
            :curId="curId"
            @setSongListInfo="setSongListInfo"
          >
          </router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>
      <Audio />
    </el-footer>
  </el-container>
</template>

<script>
import FindMusic from "./findMusic/FindMusic";
import SongList from "../components/SongList";
import Login from "../pages/login/Login";
import Audio from "../pages/audio/Audio";

export default {
  data() {
    return {
      message: [],
      curId: ""
    };
  },
  created() {
    console.log(this.currentUser);
  },
  components: {
    children: FindMusic,
    SongList,
    Login,
    Audio
  },
  methods: {
    async setSongListInfo(songIds, curId) {
      console.log(songIds, curId);
      this.message = songIds;
      // console.log(this.message);
    },
    test() {}
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
</style>
