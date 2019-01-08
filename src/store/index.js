import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

Vue.use(Vuex)

// Vuex.Store()中的Store要大写
export default new Vuex.Store({
    state:{
        RecommendList:[
            {type:"纯音乐",count:10,imgUrl:require("../assets/song-icon-1.jpg")},
            {type:"经典",count:10,imgUrl:require("../assets/song-icon-2.jpg")},
            {type:"粤语",count:10,imgUrl:require("../assets/song-icon-3.jpg")},
            {type:"欧美",count:10,imgUrl:require("../assets/song-icon-4.jpg")},
            {type:"成名曲",count:10,imgUrl:require("../assets/song-icon-5.jpg")},
            {type:"流行",count:10,imgUrl:require("../assets/song-icon-6.jpg")}
        ],
        singerList:[
            {singer:"朴树",avater:require("../assets/song-icon-1.jpg")},
            {singer:"毛不易",avater:require("../assets/song-icon-1.jpg")},
            {singer:"李健",avater:require("../assets/song-icon-1.jpg")},
            {singer:"邓紫棋",avater:require("../assets/song-icon-1.jpg")},
            {singer:"林志炫",avater:require("../assets/song-icon-1.jpg")},
            {singer:"Celine Dion",avater:require("../assets/song-icon-1.jpg")},
            {singer:"Taylor Swift",avater:require("../assets/song-icon-1.jpg")}
        ],
        songList:[]
    },
    mutations:{
        addSongList(state,data){
            console.log(data.songs);
            state.songList=data.songs;
        }
    },
    actions:{
        
    }
})
 
