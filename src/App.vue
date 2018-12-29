<template>
  <div id="app">
     <router-view :song="songsList"></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  data(){
    return{
      songsList:[],
      id:0
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
      getSongList:function(){
          this.$axios("album/music/kugou?apikey=3pRQWtkgUvFVI4QOLsOAFHBT92gTbFOU4mmkZISSAH2XexcxnsEg3YiAhjVTjj6w&kw="+this.singerList[this.id].singer)
          .then((res)=>{
              var result=res.data.data;
              console.log(result);
              for(var i=0;i<result.length;i++)
              {
                  console.log(result[i].title);
                  this.songsList.push({coverUrl:result[i].coverUrl,title:result[i].title,url:result[i].url,lyrics:result[i].lyrics});
              }
               console.log(this.songsList[0].title);
          }).catch((err)=>{
            console.log(err);
          })
      }
  },
  computed:{
    ...mapState([
        "singerList"
    ])
  },
  mounted(){
    // this.getRecommendList();
    // this.getSongList();
    // console.log(this.songsList);
    this.id=this.$route.query.id;
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
