<template>
  <div class="footdiv">
    <!-- 按钮 -->
    <div class="btns">
      <a class="previous"></a>
      <a class="playstop"></a>
      <a class="nextsong"></a>
    </div>
    <!-- <div class="myaudio"></div> -->
    <!-- 播放进度条 -->
    <span>00:00/00:00</span>
    <div style="width:700px;height:60px;margin-left:30px;">
      <el-slider style="margin-top:10px;"></el-slider>
    </div>
    <!-- 音量 -->
    <div class="volume">
      <!-- <img src="../../static/img/star.png" /> -->
      <a class="star"></a>
      <el-slider style="width:120px;"></el-slider>
    </div>
    <audio :src="musicUrl" autoplay id="playMusicAudio"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: ""
    };
  },
  methods: {}
};
</script>
<style>
/* 底部auto */
.footdiv {
  display: flex;
  justify-content: space-between;
  /* position: fixed;
  bottom: 0; */
}
.btns {
  display: flex;
  width: 160px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}
.previous,
.playstop,
.nextsong,
.star {
  width: 30px;
  height: 30px;
  display: block;
  /* background: hotpink; */
}
.previous {
  background-image: url(../../static/img/previous.png);
  background-size: 100%;
}
.playstop {
  background-image: url(../../static/img/stop.png);
  background-size: 100%;
}
.nextsong {
  background-image: url(../../static/img/next.png);
  background-size: 100%;
}
.star {
  background-image: url(../../static/img/star.png);
  background-size: 100%;
}
.volume {
  width: 250px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>