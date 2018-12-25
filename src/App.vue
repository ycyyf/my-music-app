<template>
  <div id="app">
     <router-view :songs="songsList"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      songsList:[]
    }
  },
  methods:{
      getRecommendList:function(){
          this.$axios.post("album/api/index/index/",
              {TransCode:"020111",OpenId:"Test",Body:{SongListId:"141998290"}
          }).
          then((res)=>{
            console.log(res);
              var songs=res.data.Body.songs; 
              var len=songs.length;
              console.log(songs);
              for(var i=0;i<len;i++)
              {
                  this.songsList.push({id:songs[i].id,title:songs[i].title,author:songs[i].author,pic:songs[i].pic,url:songs[i].url,lrc:songs[i].lrc,time:songs[i].time})
              }
          }).catch((err)=>{
              console.log(err);
          })
      }
  },
  mounted(){
    this.getRecommendList();
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
