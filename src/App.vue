<template>
  <div id="app">
     <router-view ></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
      // songsList:[],
      // id:0
    }
  },
  methods:{
      // getRecommendList:function(){
      //     this.$axios.post("album/api/index/index/",
      //         {TransCode:"020111",OpenId:"Test",Body:{SongListId:"141998290"}
      //     }).
      //     then((res)=>{
      //       console.log(res);
      //         var songs=res.data.Body.songs; 
      //         var len=songs.length;
      //         console.log(songs);
      //         for(var i=0;i<len;i++)
      //         {
      //             this.songsList.push({id:songs[i].id,title:songs[i].title,author:songs[i].author,pic:songs[i].pic,url:songs[i].url,lrc:songs[i].lrc,time:songs[i].time})
      //         }
      //     }).catch((err)=>{
      //         console.log(err);
      //     })
      // }                                            
      // getSongList:function(){
      //     this.$axios("/album/music/kugou?apikey=3pRQWtkgUvFVI4QOLsOAFHBT92gTbFOU4mmkZISSAH2XexcxnsEg3YiAhjVTjj6w&kw=朴树")
      //     .then((res)=>{
      //         var result=res.data.data;
      //         console.log(result);
      //         console.log(1);
      //         // for(var i=0;i<result.length;i++)
      //         // {
      //         //     console.log(result[i].title);
      //         //     this.songsList.push({coverUrl:result[i].coverUrl,title:result[i].title,url:result[i].url,albumId:result[i].albumId,lyrics:result[i].lyrics});
      //         // }
      //         //  console.log(this.songsList[0].title);
      //     }).catch((err)=>{
      //       console.log(err);
      //     })
      // }
      // getPlayDetail:function(){

      //     this.$axios.get("/playSong/index.php?r=play/getdata&hash=79b5a1e39aad83a9a3b55921e307b3b7&album_id=2944963&_="+new Date().getTime()).then((res)=>{
      //         console.log(res);
      //         var result_arr=res.data.split("\n");
      //         var lyric_arr=[];
      //     }).catch((err)=>{
      //         console.log(err);
      //     })
      //     console.log(this.song[index].lyrics);
      // }
  },
  computed:{ 
    ...mapState([
        "singerList"
    ])
  },
  mounted(){
    // this.getRecommendList();
    // this.getSongList();
    
    // this.id=this.$route.query.id;
    // console.log(this.id);
    // console.log(this.singerList[this.id]);
    // this.getPlayDetail();
    // console.log(this.$route.query.id);
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
