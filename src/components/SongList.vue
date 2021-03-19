<template>
  <div>
    <!-- <div>这是歌单详情页面</div> -->
    <!-- <p>{{currentSonglistId}}</p> -->
    <!-- 歌单头 -->
    <div class="playlisthead">
      <div class="playlistcov">
        <img :src="playlistDetail.coverImgUrl" />
      </div>
      <div class="playlistright">
        <div class="playdetail">
          <span>歌单</span>
          <h2>{{playlistDetail.name}}</h2>
        </div>
        <div class="userinfo">
          <a>
            <img :src="playlistDetail.creator.avatarUrl" class="headportrait" v-if="!loading" />
          </a>
          <span v-if="!loading">{{playlistDetail.creator.nickname}}</span>
          <span>{{playlistDetail.createTime|dateFormat}}</span>
        </div>
        <div class="headbtn">
          <a class="headbutton">播放</a>
          <a class="headbutton">收藏</a>
          <a class="headbutton">分享</a>
          <a class="headbutton">下载</a>
          <a class="headbutton">评论</a>
        </div>
      </div>
    </div>
    <!-- 歌曲内容列表 -->
    <div class="listdetailhead">
      <div class="songdetailinfo">
        <h3>歌曲列表</h3>
        <span>{{playlistDetail.trackCount}}首歌</span>
      </div>

      <span>播放：{{playlistDetail.playCount}}次</span>
    </div>
    <!-- 点击播放歌曲 -->
    <el-table :data="songslist" stripe style="width: 100%" @click="clickToPlay">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column prop="name" label="标题" width="200"></el-table-column>
      <el-table-column prop="dt" label="时长" width="180"></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="180"></el-table-column>
      <el-table-column prop="al.name" label="专辑"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSonglistId: this.$route.params.id
        ? this.$route.params.id
        : window.localStorage.getItem("currentId"),
      playlistDetail: {},
      loading: false,
      queryIds: "",
      songslist: [],
      //传给父组件的具体的行
      rowid: "",
      oneSong: {} //传给父组件具体的歌
    };
  },
  watch: {
    // 监听路由跳转
    $route(newRoute, oldRoute) {
      // console.log("watch", newRoute, oldRoute);
      this.currentSonglistId = this.$route.params.id;
      this.getSongList();
    }
  },
  created() {
    this.getSongList(); //获取歌单详细信息
    // this.getSongsDetail(); //获取完整的歌曲信息
  },
  methods: {
    getSongList() {
      this.loading = true;
      this.$axios
        .get("http://musicapi.leanapp.cn/playlist/detail", {
          params: {
            id: this.currentSonglistId
          }
        })
        .then(res => {
          // console.log(res);
          this.queryIds = "";
          this.playlistDetail = res.data.playlist;
          this.playlistDetail.trackIds.forEach(item => {
            this.queryIds += item.id + ",";
          });
          //去掉结尾的逗号
          this.queryIds = this.queryIds.substr(0, this.queryIds.length - 1);
          console.log(this.queryIds);
          this.getSongsDetail();
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSongsDetail() {
      this.$axios
        .get("https://autumnfish.cn/song/detail", {
          params: {
            ids: this.queryIds
          }
        })
        .then(res => {
          console.log(res);
          this.songslist = res.data.songs;
          this.songslist.forEach(item => {
            let dt = new Date(item.dt);
            let mm = (dt.getMinutes() + "").padStart(2, "0");
            let ss = (dt.getSeconds() + "").padStart(2, "0");
            item.dt = mm + ":" + ss;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击播放歌曲
    clickToPlay(row) {
      this.$emit("setSongListInfo", this.oneSong);
    }
  }
};
</script>
<style>
.playlisthead {
  width: 1000px;
  height: 300px;
  background: lightcoral;
  padding: 20px;
}
/* 歌单封面图片 */
.playlistcov {
  width: 210px;
  height: 210px;
  padding: 5px;
  border: 1px solid rgb(146, 143, 143);
  float: left;
}
.playlistright {
  float: left;
}
.playlistcov img {
  width: 210px;
  height: 210px;
}
/* 右边的一些内容 */
.playdetail,
.userinfo,
.headbtn {
  display: flex;
  align-items: flex-start;
  margin-left: 40px;
}
.playdetail span {
  display: block;
  width: 60px;
  height: 30px;
  background: rgb(194, 12, 12);
  border-radius: 5px;
  padding: 5px;
  line-height: 30px;
  font-size: 20px;
  color: white;
}
.playdetail h2 {
  margin: 0px;
  padding: 5px;
}
.headportrait {
  width: 40px;
}
/* .user-info {
  display: flex;
  text-align: left;
  margin-left: 40px;
} */
.userinfo {
  margin-top: 10px;
  align-items: center;
}
.userinfo a {
  display: block;
  margin-left: 10px;
}
.userinfo span {
  display: block;
  margin-left: 10px;
}
.headbtn {
  margin-top: 10px;
}
.headbutton {
  display: block;
  width: 70px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-left: 10px;
}
.listdetailhead {
  display: flex;
  justify-content: space-between;
}
.listdetailhead span {
  display: block;
  padding: 4px;
  font-size: 14px;
}
.songdetailinfo {
  display: flex;
  width: 300px;
}
.songdetailinfo h3 {
  padding: 0px;
  margin: 0px;
  margin-left: 20px;
}
.songdetailinfo span {
  margin-left: 40px;
}
</style>