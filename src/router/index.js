import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '../components/Main';
import FindMusic from '../components/FindMusic';
import MyCloudMusic from '../components/MyCloudMusic';
import SongList from '../components/SongList';
import MusicRank from "../components/MusicRank";
import NewDisk from "../components/NewDisk";
import SonglistPage from "../components/SonglistPage";
import SingerList from "../components/SingerList";
import Recommend from "../components/Recommend";

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Main,
    redirect: '/findmusic',
    children: [{
        path: '/findmusic',
        component: FindMusic,
        redirect: '/recommend',
        children: [{
            path: '/recommend',
            component: Recommend
          },
          {
            path: '/musicrank',
            component: MusicRank
          },
          {
            path: '/songlistpage',
            component: SonglistPage
          },
          {
            path: '/singerlist',
            component: SingerList
          },
          {
            path: '/newdisk',
            component: NewDisk
          }
        ]

      },
      {
        //我的
        path: '/mymusic',
        component: MyCloudMusic,
        children: [{
          path: '/songlist/:id',
          component: SongList
        }]
      },
      {
        //歌单详情
        path: '/songlist',
        component: SongList,
      },


    ]
  }]
})
