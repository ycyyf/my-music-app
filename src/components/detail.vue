<template>
    <div class="detail-box">
        <div class="detail-top">
            <p><img :src="getImg" alt="" ><img src="../assets/arrow-left.png" alt="返回上级" @click="goBack()"><span>{{getType}}</span></p>
        </div>
        <ul class="songs-list">
            <li class="play-all"><img :src="playAllImg" alt="播放全部" @click="changePlayStatus()"><span>播放全部(共{{songList.length}}首)</span></li>
            <router-link tag='li' :to="{path:'/play?index='+index}" v-for="(list,index) in songList" :key="index"><img :src="list.coverUrl" alt="歌曲头像"><span>{{list.title}}</span> </router-link>
        </ul> 
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:"Detail",
    data(){
        return{
            id:0,
            playAllImg:require('../assets/暂停.png'),
            songList:[]
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
        },
        getSongList:function(){
            this.$axios("/album/music/kugou?apikey=3pRQWtkgUvFVI4QOLsOAFHBT92gTbFOU4mmkZISSAH2XexcxnsEg3YiAhjVTjj6w&kw="+this.singerList[this.id].singer)
            .then((res)=>{
                console.log(this);
                var result=res.data.data;
                console.log(result);
                for(var i=0;i<result.length;i++)
                {
                    console.log(result[i].title);
                    this.songList.push({coverUrl:result[i].coverUrl,title:result[i].title,url:result[i].url,albumId:result[i].albumId,lyrics:result[i].lyrics});
                }

                // 把获得的歌曲信息存到store中，通过提交mutation的方式改变state中的状态，歌曲信息作为载荷传过去
                this.$store.commit({type:"addSongList",songs:this.songList});
                console.log(this.songList[0].title);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    computed:{
        ...mapState([
            "RecommendList","singerList"
        ]),
        getImg:function(){
            if(this.ConType=="R")
            {
                return this.RecommendList[this.id].imgUrl;
            }
            else
            {
                return this.singerList[this.id].avater;
            }
        },
        getType:function(){
            if(this.ConType=="R")
            {
                return this.RecommendList[this.id].type;
            }
            else
            {
                return this.singerList[this.id].singer;
            }
        }
    },
    mounted(){
        this.id=this.$route.query.id;
        this.ConType=this.$route.query.ConType;
        this.getSongList();
    }
}
</script>

<style scoped lang="scss">
.detail-top{
    width:100%;
    margin:0 auto;
    p{
        position: relative;
        width:100%; 
        img{
            &:nth-child(1)
            {
                width:100%;
                height:260px;
            }
            &:nth-child(2)
            {
                position:absolute;
                left:5px;
                top:5px;
                width:20px;
                height:20px;
            }
        }
        span{
            position:absolute;
            left:28px;
            top:2px;
            color:#fff;
            font-weight:700;
            font-size:18px;
        }
    }
}
.songs-list{
    width:100%; 
    height:auto;
    position: relative;
    z-index: 3;
    border:1px solid #ccc;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background:#fff;
    top:-20px;
    overflow-y: scroll;
    overflow-x:hidden;
    li{
        height:50px;
        border-bottom:1px solid #ccc;
        padding-left: 10px;
        display: flex;
        align-items: center;
        &:not(.play-all)
        {
            img{
                width:40px;
                height:40px;
            }
            span{
                position:absolute;
                left:70px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 20px;
            }
        }
    }
}
// .songs-list li:not(.play-all)
// {

// }
.play-all{
    width:100%;
    height:30px;
    position: relative;
    img{
        width:30px;
        height:30px;
    }
    span{
        display: inline-block;
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        margin-left:10px;
        font-size-adjust: initial;
    }
}
</style>


