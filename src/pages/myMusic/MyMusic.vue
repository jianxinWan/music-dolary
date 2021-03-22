<template>
  <div>
    <p v-if="currentUser === null">请先登录</p>
    <!-- 我的音乐 -->
    <div v-else class="mymusic">
      <!-- 需要实现：
      我的歌手
      创建的歌单
      收藏的歌单-->
      <!-- 左边列表栏 -->
      <div class="mysonglist">
        <el-menu class="listofSonglist" :router="true">
          <el-menu-item-group>
            <template slot="title">创建的歌单</template>
            <el-menu-item
              v-for="(item, index) in userPrivateSonglist"
              :key="index"
              :index="'/songlist/' + item.id"
            >
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">创建的歌单</template>
            <el-menu-item
              v-for="(item, index) in userStarSonglist"
              :key="index"
              :index="'/songlist/' + item.id"
            >
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
          <!-- </el-submenu> -->
        </el-menu>
      </div>
      <!-- 右边内容栏 -->
      <div class="songlistdetail">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //存储当前用户的信息：包括uid等
      currentUser:
        window.localStorage.getItem("currentuser") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("currentuser")),
      userPrivateSonglist: [], //用户的私人歌单
      userStarSonglist: []
    };
  },
  created() {
    if (this.currentUser !== null) {
      this.getUserPrivateSonglist();
    }
  },
  methods: {
    getUserPrivateSonglist() {
      this.$axios
        .get("http://musicapi.leanapp.cn/user/playlist", {
          params: {
            uid: this.currentUser.userId
          }
        })
        .then(res => {
          // console.log(res);
          let resdata = res.data.playlist;
          for (let item in resdata) {
            console.log(resdata[item].subscribed);
            if (resdata[item].creator.nickname === this.currentUser.nickname) {
              resdata[item].subscribed;
              this.userPrivateSonglist.push(resdata[item]);
            } else {
              this.userStarSonglist.push(resdata[item]);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.mymusic {
  display: flex;
  width: 1300px;
  margin: 0 auto;
}
.listofSonglist {
  width: 300px;
}
/* .songlistdetail {
  width: 200px;
  height: 200px;
  background: olivedrab;
} */
</style>
