<template>
  <div>
    <el-menu
      class="findmusic-menu"
      mode="horizontal"
      background-color="#c20c0c"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item index="/findmusic" class="menuitem">推荐</el-menu-item>
      <el-menu-item index="/musicrank" class="menuitem">排行榜</el-menu-item>
      <!-- 此歌单和个人创建的歌单不同 -->
      <el-menu-item index="/songlistpage" class="menuitem">歌单</el-menu-item>
      <el-menu-item index="4" class="menuitem">主播电台</el-menu-item>
      <el-menu-item index="/singerlist" class="menuitem">歌手</el-menu-item>
      <el-menu-item index="/newdisk" class="menuitem">新碟上架</el-menu-item>
    </el-menu>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.findmusic-menu {
  height: 30px;
}
.el-menu--horizontal > .el-menu-item {
  height: 30px;
  line-height: 30px;
}
</style>