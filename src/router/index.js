import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
import Main from "../pages/Main";
import FindMusic from "../pages/findMusic/FindMusic";
import MyMusic from "../pages/myMusic/MyMusic";
import SongList from "../components/SongList";

import MusicRank from "../components/MusicRank";
import NewDisk from "../components/NewDisk";
import SongListPage from "../components/SongListPage";
import SingerList from "../components/SingerList";
import Recommend from "../components/Recommend";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Main,
      redirect: "/find-music",
      children: [
        {
          path: "/find-music",
          component: FindMusic,
          redirect: "/recommend",
          children: [
            {
              path: "/recommend",
              component: Recommend
            },
            {
              path: "/music-rank",
              component: MusicRank
            },
            {
              path: "/song-list-page",
              component: SongListPage
            },
            {
              path: "/singer-list",
              component: SingerList
            },
            {
              path: "/new-disk",
              component: NewDisk
            }
          ]
        },
        {
          //我的
          path: "/my-music",
          component: MyMusic,
          children: [
            {
              path: "/song-list/:id",
              component: SongList
            }
          ]
        },
        {
          //歌单详情
          path: "/song-list",
          component: SongList
        }
      ]
    }
  ]
});
