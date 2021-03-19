<template>
  <div>
    <!-- <div>这是歌曲推荐页面</div> -->
    <el-carousel :interval="3000" type="card" height="300px">
      <el-carousel-item v-for="(item,index) in songlistArr" :key="index">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <el-image :src="item.picUrl"></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐的歌单 -->
    <p class="recomTitle">推荐歌单</p>
    <el-row :gutter="10">
      <el-col :span="3" v-for="(item,index) in songlistArr" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.picUrl" class="image" />
          <div>
            <div class="bottom">
              <a class="iconcount"></a>
              <span class="playspan">{{item.playCount}}</span>
              <a class="iconplay"></a>
              <!-- <el-button type="text" class="button">操作按钮</el-button> -->
            </div>
          </div>
        </el-card>
        <p>{{item.name}}</p>
      </el-col>
    </el-row>

    <!-- 新碟上架 -->
    <p class="recomTitle">新碟上架</p>
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="(item,index) in newdisk" :key="index">
        <!-- <h3>{{ item }}</h3> -->
        <ul v-for="(citem,cindex) in newdisk[index]" :key="cindex" class="newsongul">
          <li class="newsongli">
            <div>
              <img :src="citem.picUrl" />
              <p>{{citem.name}}</p>
              <p>{{citem.artist.name}}</p>
            </div>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>

    <!-- 榜单 -->
    <p class="recomTitle">榜单</p>
    <div class="n-blist clearfix">
      <dl class="blk">
        <dt class="clearfix">
          <div class="dtfloat">
            <a class="bdimg">
              <img
                src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100"
              />
            </a>
          </div>
          <div class="dtfloat">
            <h4>飙升榜</h4>
            <div>
              <a class="bangdanplay"></a>
              <a class="bangdanstar"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol v-for="(item,index) in soaringlist" :key="index">
            <li>
              <span class="listnumber">{{index+1}}</span>
              <a class="listname">{{item.first}}</a>
            </li>
          </ol>
        </dd>
      </dl>
      <dl class="blk">
        <dt>
          <div class="dtfloat">
            <a class="bdimg">
              <img
                src="http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100"
              />
            </a>
          </div>
          <div class="dtfloat">
            <h4>新歌榜</h4>
            <div>
              <a class="bangdanplay"></a>
              <a class="bangdanstar"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol v-for="(item,index) in newsongs" :key="index">
            <li>
              <span class="listnumber">{{index+1}}</span>
              <a class="listname">{{item.first}}</a>
            </li>
          </ol>
        </dd>
      </dl>
      <dl class="blk">
        <dt>
          <div class="dtfloat">
            <a class="bdimg">
              <img
                src="http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100"
              />
            </a>
          </div>
          <div class="dtfloat">
            <h4>原创榜</h4>
            <div>
              <a class="bangdanplay"></a>
              <a class="bangdanstar"></a>
            </div>
          </div>
        </dt>
        <dd>
          <ol v-for="(item,index) in originallist" :key="index">
            <li>
              <span class="listnumber">{{index+1}}</span>
              <a class="listname">{{item.first}}</a>
            </li>
          </ol>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      bannerArr: [], //轮播图数据
      songlistArr: [], //歌单数据
      newdisk: [], //新碟上架数据
      //榜单数据
      soaringlist: [],
      //新歌榜
      newsongs: [],
      //原创榜
      originallist: []
    };
  },
  created() {
    // this.getBannerArr();
    this.getSongList(); //获取推荐歌单的信息
    this.getNewDisk();
    this.getTopList();
  },
  methods: {
    // getBannerArr() {
    //   // 为给定 ID 的 user 创建请求
    //   this.$axios
    //     .get("http://musicapi.leanapp.cn/banner")
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },
    getSongList() {
      this.$axios
        .get("http://musicapi.leanapp.cn/personalized?limit=8")
        .then(response => {
          this.songlistArr = response.data.result;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    sliceArr(res) {
      let len = res.length;
      let n = 5;
      let linenum = len % n == 0 ? len / n : Math.floor(len / n) + 1;
      for (let i = 0; i < linenum; i++) {
        let temp = res.slice(i * n, i * n + n);
        this.newdisk.push(JSON.parse(JSON.stringify(temp)));
      }
    },
    getNewDisk() {
      this.$axios
        .get("http://musicapi.leanapp.cn/top/album?limit=10")
        .then(response => {
          var res = response.data.albums;
          this.sliceArr(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTopList() {
      this.$axios
        .get("http://musicapi.leanapp.cn/toplist/detail")
        .then(response => {
          // console.log(response.data,list);
          this.soaringlist = response.data.list[0].tracks;
          this.newsongs = response.data.list[1].tracks;
          this.originallist = response.data.list[2].tracks;
        });
    }
  }
};
</script>
<style scoped>
/* 轮播图 */
ol,
li {
  padding: 0px;
  margin: 0px;
}
li {
  list-style: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 歌单推荐卡片 */
.recomTitle {
  font-size: 22px;
  border-bottom: 2px solid #c10d0c;
}
.time {
  font-size: 13px;
  color: #999;
}

/* .el-col {
  margin-left: 30px;
} */
.bottom {
  display: flex;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
.playspan {
  display: block;
  font-size: 0.8em;
  margin-top: 2px;
}
.iconcount {
  display: block;
  width: 20px;
  height: 20px;
  background: url(../assets/playcount.png);
  background-size: 20px;
}
.iconplay {
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  background: url(../assets/play.png);
  background-size: 20px;
}

/* 新歌上架 */
.newsongul {
  padding-left: 30px;
  margin: 0px;
}
.newsongli {
  list-style: none;
  float: left;
  margin-left: 70px;
}
.newsongli img {
  width: 200px;
}
.newsongli p {
  width: 200px;
  padding: 0px;
  margin: 0px;
}

/* 榜单 */
.n-blist {
  width: 690px;
  background: url("https://s2.music.126.net/style/web2/img/index/index_bill.png?a1a678ec902f836399f6a30c8b684e7d")
    no-repeat;
  margin: 0 auto;
}
.blk {
  width: 230px;
  float: left;
}
.blk dt {
  height: 104px;
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.bdimg {
  width: 80px;
  height: 80px;
  display: block;
}
.bdimg img {
  width: 100%;
  margin-top: 4px;
}
.dtfloat {
  float: left;
  margin-left: 20px;
}
.dtfloat h4 {
  padding: 5px 0px;
  margin: 0px;
}
/* 按钮 */
.bangdanplay {
  width: 20px;
  height: 20px;
  display: block;
  float: left;
  margin-left: 10px;
  background: url("../assets/bangplay.png") no-repeat;
  background-size: 20px;
}
.bangdanstar {
  width: 20px;
  height: 20px;
  display: block;
  float: left;
  margin-left: 10px;
  background: url("../assets/star.png") no-repeat;
  background-size: 18px;
}
.n-blist ol li {
  height: 32px;
  line-height: 32px;
  text-align: left;
}
.listname {
  margin-left: 15px;
}
</style>