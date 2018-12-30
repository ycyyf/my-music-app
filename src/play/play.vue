<template>
    <div class="play" :style="{background:'rgb(143, 140, 140)',height:screenHeight}">
        <div class="header">
            <img :src="backImg" alt="返回上一级" @click="goBack">
            <p><span>{{song[index].title}}</span><br><span>{{song[index].author}}</span></p>
        </div>
        <div class="lyric-area" @click="exchange">
            <img :src="song[index].coverUrl" alt="唱片图片" v-if="showLyric">
            <ul v-else>
                <li v-for="(item,index) in lyricArr" :key="index" >{{item}}</li>
            </ul>
        </div>
        <div class="play-control">
            <p>
                <!-- <span>{{activeLyricArr[0].time}}</span> -->
                <audio :src="playUrl" controls autoplay @click="controlPlay(this)"></audio>
                <!-- <span>{{activeLyricArr[activeLyricArr.length-1].time}}</span> -->
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Play',
    props:['song'],
    data(){
        return{
            backImg:require('../assets/arrow-down.png'),
            showLyric:true,
            screenHeight:'',
            index:0,
            lyricArr:[],
            activeLyricArr:[],
            currentTime:"",
            songurl:"",
            playUrl:""
        }
    },
    methods:{
        goBack(){
            this.backImg="require('../assets/arrow-left.png')";
            this.$router.go(-1);
        },
        exchange(){
            this.showLyric=!this.showLyric;
        },
        getPlayUrl:function(){
            var htmlUrl=this.song[this.index].url.split("#")[1]+new Date().getTime();
            console.log(htmlUrl);
            this.songurl="/playSong/index.php?r=play/getdata&"+htmlUrl;
        },
        getPlayDetail:function(){
            this.getPlayUrl();
            this.$axios.get(this.songurl).then((res)=>{
                var result=res.data.data;
                this.playUrl=result.play_url;
                this.lyricArr=result.lyrics.split("\r\n");
                console.log(this.lyricArr);
            }).catch((err)=>{
                console.log(err);
            })
        },
        controlPlay:function(obj){
            if(obj.paused)
            {
                obj.play();
            }
            else
            {
                obj.pause();
            }
        }
        
    },
    computed:{
        getScreenHeight:function(){
            this.screenHeight=screen.height+'px';
        }
    },
    watch:{
    },
    mounted(){
        this.getScreenHeight;
        this.index=this.$route.query.index;
        this.getPlayDetail();
    }
}
</script>

<style>
.play{
    width:100%;
}
.header{
    position: relative;
    width:100%;
    height:20%;
    border:1px solid rgb(143, 140, 140);
}
.header img{
    position:absolute;
    width:30px;
    height:30px;
    left:20px;
    top:20px;
}
.header p{
    margin-top:20px;
    text-align: center;
}
.header p>span:nth-child(1){
    font-family:"微软雅黑";
    font-size: 20px;
    font-weight: 700;
    color:#fff;
}
.header p>span:nth-child(3){
    font-family:"微软雅黑";
    font-size: 14px;
    color:#fff;
}
.lyric-area{
    width:100%;
    height:60%;
    position: relative;
    /* border:1px solid red; */
    margin:10px auto;
    text-align: center;
}
.lyric-area img{
    box-sizing: border-box;
    width:180px;
    height:180px;
    border:10px solid rgba(180, 175, 175,0.5); 
    border-radius:50%;
    position: absolute;
    left:50%;
    top:50%;
    margin-left: -90px;
    margin-top:-90px;
    animation: my-rotate  5s linear infinite;
}
.lyric-area ul{
    box-sizing: border-box;
    width:280px;
    height:300px;
    /* border:1px solid red; */
    margin:10px auto;
    overflow: auto;
    color:rgb(224, 206, 206);
    font-size: 16px;
    text-align: left;
}
@keyframes my-rotate {
    0% {transform: rotate(0)}
    100% {transform: rotate(360deg)}
}
.play-control{
    width:100%;
    height:20%;
    /* border:1px solid red; */
    text-align: center;
}
.play-control audio{
    margin-top: 15px;
}
.activeLyric{
    color:#fff;
}
audio{
    width:100%;
    /* height:60px; */
    /* border:1px solid red; */
}
</style>

