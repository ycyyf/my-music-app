import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Vuex.Store()中的Store要大写
export default new Vuex.Store({
    state:{
        RecommendList:[
            {name:"纯音乐",count:10,imgUrl:require("../assets/song-icon-1.jpg")},
            {name:"经典",count:10,imgUrl:require("../assets/song-icon-2.jpg")},
            {name:"粤语",count:10,imgUrl:require("../assets/song-icon-3.jpg")},
            {name:"欧美",count:10,imgUrl:require("../assets/song-icon-4.jpg")},
            {name:"成名曲",count:10,imgUrl:require("../assets/song-icon-5.jpg")},
            {name:"流行",count:10,imgUrl:require("../assets/song-icon-6.jpg")}
        ],
        singerList:[
            {name:"朴树",avater:require("../assets/singer-pushu-icon.jpg")},
            {name:"毛不易",avater:require("../assets/singer-maobuyi-icon.jpg")},
            {name:"李健",avater:require("../assets/singer-lijian-icon.jpg")},
            {name:"邓紫棋",avater:require("../assets/singer-dzq-icon.jpg")},
            {name:"林志炫",avater:require("../assets/singer-linzhixuan-icon.jpg")},
            {name:"Celine Dion",avater:require("../assets/singer-CelineDion-icon.jpg")},
            {name:"Taylor Swift",avater:require("../assets/singer-TaylorSwift-icon.jpg")},
            {name:"薛之谦",avater:require("../assets/singer-xzq-icon.jpg")},
            {name:"张碧晨",avater:require("../assets/singer-zbc-icon.jpg")},
            {name:"王菲",avater:require("../assets/singer-wf-icon.jpg")},
            {name:"周杰伦",avater:require("../assets/singer-zjl-icon.jpg")},
            {name:"陈奕迅",avater:require("../assets/singer-cyx-icon.jpg")},
            {name:"张杰",avater:require("../assets/singer-zj-icon.jpg")},
            {name:"李荣浩",avater:require("../assets/singer-lrh-icon.jpg")},
            {name:"周传雄",avater:require("../assets/singer-zcx-icon.jpg")}
        ],
        songList:[],
        rankList:[
            {name:"网络红歌榜",icon:require("../assets/fire.jpg")},
            {name:"DJ热歌榜",icon:require("../assets/DJ.jpg")},
            {name:"华语新歌榜",icon:require("../assets/china.jpg")},
            {name:"欧美新歌榜",icon:require("../assets/ou.jpg")},
            {name:"影视金曲榜",icon:require("../assets/movie.jpg")}
        ]
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
 
