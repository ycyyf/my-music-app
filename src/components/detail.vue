<template>
    <div class="detail-box">
        <div class="detail-top">
            <p><img v-lazy="getImg" alt="封面" ><img src="../assets/arrow-left.png" alt="返回上级" @click="goBack()"><span>{{getType}}</span></p>
        </div>
        <Scroll class="wrapper" :data="songList">
            <ul class="songs-list">
                <li class="play-all"><img v-lazy="playAllImg" alt="播放全部" @click="changePlayStatus()"><span>播放全部(共{{songList.length}}首)</span></li>
                <router-link tag='li' :to="{path:'/play?index='+index}" v-for="(list,index) in songList" :key="index"><img v-lazy="list.coverUrl" alt="歌曲头像"><span>{{list.title}}</span> </router-link>
            </ul> 
        </Scroll>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import Scroll from '../base/scroll/scroll'

export default {
    name:"Detail",
    data(){
        return{
            id:0,
            playAllImg:require('../assets/暂停.png'),
            songList:[],
            activeList:[],
            ConType:""
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
            this.$axios("/album/music/kugou?apikey=3pRQWtkgUvFVI4QOLsOAFHBT92gTbFOU4mmkZISSAH2XexcxnsEg3YiAhjVTjj6w&kw="+this.getList[this.id].name)
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
        ...mapState(["RecommendList","singerList","rankList"]),
        getImg:function(){
            if(this.ConType=="R")
            {
                return this.RecommendList[this.id].imgUrl;
            }
            else if(this.ConType=="S")
            {
                return this.singerList[this.id].avater;
            }
            else if(this.ConType=="K")
            {
                return this.rankList[this.id].icon;
            }

        },
        getType:function(){
            if(this.ConType=="R")
            {
                return this.RecommendList[this.id].name;
            }
            else if(this.ConType=="S")
            {
                return this.singerList[this.id].name;
            }
            else if(this.ConType=="K")
            {
                return this.rankList[this.id].name;
            }
        },
        getList:function(){
            if(this.ConType=="R")
            {
                this.activeList=this.RecommendList;
                return this.activeList;
            }
            else if(this.ConType=="S")
            {
                this.activeList=this.singerList;
                return this.activeList;
            }
            else if(this.ConType=="K")
            {
                this.activeList=this.rankList;
                return this.activeList;
            }
        }
    },
    components:{Scroll},
    mounted(){
        this.id=this.$route.query.id;
        this.ConType=this.$route.query.ConType;
        console.log(this.ConType);
        this.getSongList();
    }
}
</script>

<style scoped lang="scss">
.detail-top{
    width:100%;
    margin:0 auto;
    height:30vh;
    p{
        position: relative;
        width:100%; 
        img{
            
            &:nth-child(1)
            {
                width:100%;
                height:260px;
                background: rgb(97, 62, 62);
            }
            &:nth-child(2)
            {
                position:absolute;
                left:15px;
                top:15px;
                width:20px;
                height:20px;
            }
        }
        span{
            position:absolute;
            left:40px;
            top:12px;
            color:#fff;
            font-weight:700;
            font-size:18px;
        }
    }
}
.wrapper{
    width: 100%;
    height:70vh;
    overflow: hidden;
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
    overflow:hidden;
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


