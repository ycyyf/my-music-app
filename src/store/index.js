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
        ]
    },
    actions:{
        
    }
})
 
