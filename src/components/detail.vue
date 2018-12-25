<template>
    <div class="detail-box">
        <div class="detail-top">
            <p><img :src="getImg" alt="" ><img src="../assets/arrow-left.png" alt="返回上级" @click="goBack()"><span>{{getType}}</span></p>
        </div>
        <ul class="songs-list">
            <li class="play-all"><img :src="playAllImg" alt="播放全部" @click="changePlayStatus()"><span>播放全部(共{{songs.length}}首)</span></li>
            <router-link tag='li' :to="{path:'/play?index='+index}" v-for="(list,index) in songs" :key="index"><img :src="list.pic" alt="歌曲头像"><span>{{list.title}}</span> </router-link>
        </ul> 
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:"Detail",
    props:['songs'],
    data(){
        return{
            id:0,
            playAllImg:require('../assets/暂停.png')
            // songList:[]
        }
    },
    methods:{
        changePlayStatus(){
            if(this.playAllImg==require('../assets/暂停.png'))
            {
                this.playAllImg=require('../assets/播放.png');
            }
            else{
                this.playAllImg=require('../assets/暂停.png');
            }
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    computed:{
        ...mapState([
            "RecommendList"
        ]),
        getImg:function(){
            return this.RecommendList[this.id].imgUrl;
        },
        getType:function(){
            return this.RecommendList[this.id].type;
        }
    },
    mounted(){
        //  console.log("mounted");
        // 触发store中的action并传递数据  // 刷新页面后参数会消失
        this.id=this.$route.query.id;
    }
}
</script>

<style scoped>
.detail-top{
    width:100%;
    margin:0 auto;
}
.detail-top p{
    position: relative;
    width:100%; 
}
.detail-top p img:nth-child(1){
    width:100%;
    height:260px;
}
.detail-top p img:nth-child(2){
    position:absolute;
    left:5px;
    top:5px;
    width:20px;
    height:20px;
}
.detail-top>p>span{
    position:absolute;
    left:28px;
    top:2px;
    color:#fff;
    font-weight:700;
    font-size:18px;
}
.songs-list{
    width:100%; 
    height:420px;
    position: relative;
    z-index: 3;
    border:1px solid #ccc;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background:#fff;
    top:-20px;
    overflow-y: scroll;
}
.songs-list li{
    height:50px;
    border-bottom:1px solid #ccc;
    padding-left: 10px;
    display: flex;
    align-items: center;
}
.songs-list li:not(.play-all) img{
    width:40px;
    height:40px;
}
.songs-list li:not(.play-all) span{
    position:absolute;
    left:70px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
}
.play-all{
    width:100%;
    height:30px;
    position: relative;
}
.play-all>img{
    width:30px;
    height:30px;
}
.play-all>span{
    display: inline-block;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    margin-left:10px;
    font-size-adjust: initial;
}
</style>


