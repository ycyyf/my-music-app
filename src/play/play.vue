<template>
    <div class="play" :style="{background:'rgb(143, 140, 140)',height:screenHeight}">
        <div class="header">
            <img :src="backImg" alt="返回上一级" @click="goBack">
            <p><span>{{songList[index].title}}</span><br><span>{{songList[index].author}}</span></p>
        </div>
        <div class="lyric-area" @click="exchange">
            <img :src="songList[index].coverUrl" alt="唱片图片" v-if="showLyric" :class="animationStyle">
            <ul v-else class="lyric-ul" ref="lyricList">
                <li ref="lyricLine" v-for="(item,index) in lyricArr[1]" :key="index">{{item}}</li>
            </ul>
        </div>
        <div class="play-control">
            <audio id="audio" :src="playUrl" controls preload ></audio>
        </div>
    </div>
</template>

<script>
import Lyric from 'lyric-parser'
import {mapState,mapActions} from 'vuex'

export default {
    name:'Play',
    data(){
        return{
            backImg:require('../assets/arrow-down.png'),
            showLyric:true,
            screenHeight:'',
            currentLyric:"",
            currentLineNum:"",
            index:0,
            lyricArr:[],
            currentTime:"",
            songurl:"",
            playUrl:"",
            highlight:"highlight",
            timer:null,
            playStatus:0,
            animationStyle:"animationStyle",
            lyricStr:""
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
            var htmlUrl=this.songList[this.index].url.split("#")[1]+new Date().getTime();
            this.songurl="/playSong/index.php?r=play/getdata&"+htmlUrl;
        },
        getPlayDetail:function(){
            this.getPlayUrl();
            this.$axios.get(this.songurl).then((res)=>{
                var result=res.data.data;
                var arr=[];
                var timeArr=[];
                var lyricArr=[];
                this.playUrl=result.play_url;
                this.lyricStr=result.lyrics;
                arr=result.lyrics.split("\r\n");
                for(let i=0;i<arr.length;i++)
                {
                    timeArr.push(arr[i].substr(1,8));
                    lyricArr.push(arr[i].substr(10));
                }
                this.lyricArr.push(timeArr);
                this.lyricArr.push(lyricArr);
                console.log(this.lyricArr);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getTime(){
            let curTime;
            let audio=document.getElementsByTagName("audio")[0];
            let ul=document.getElementsByClassName("lyric-ul")[0];
            if(!audio.paused)
            {
                // this.playStatus=1;
                curTime=audio.currentTime;
                curTime=((Math.floor(curTime/60)<10) ? ('0'+Math.floor(curTime/60)) : (Math.floor(curTime/60)))+":"+((curTime % 60)<10 ? ('0'+(curTime % 60).toFixed(2)) : (curTime % 60).toFixed(2));
                this.currentTime=curTime; 
                console.log(this.currentTime);

                let index=this.lyricArr[0].indexOf(curTime);
                var liEle=document.getElementsByTagName("li")[index];
                liEle.className="highlight";
                this.animationStyle="animationStyle";
                console.log(index);
                console.log(1);
            }
            else
            {
                console.log("播放处于暂停状态！");
                audio.play();
                this.animationStyle="";
            }
        },
        getLyric(){
           this.currentLyric=new Lyric(this.lyricStr,handlerLyric);
           console.log(this.currentLyric);
        },
        handlerLyric({lineNum,txt})
        {
            this.currentLineNum=lineNum;
            if(lineNum>5)
            {
                let lineEl=this.$ref.lyricLine[lineNum-5];
                this.$refs.lyricList.scrollToElement(lineEl,1000);
            }
            else
            {
                this.$refs.lyricList.scrollTo(0,0,1000);
            }
        }
    },
    computed:{
        getScreenHeight:function(){
            this.screenHeight=screen.height+'px';
        },
        ...mapState(["songList"])
    },
    watch:{
        currentTime(newVal,oldVal){
            this.getTime();
            console.log(1);
        }
    },
    mounted(){
        this.getScreenHeight;
        this.index=this.$route.query.index;
        this.getPlayDetail();
        this.getTime();
        this.getLyric();
    }
}
</script>

<style scoped lang="scss">
.play{
    width:100%;
    height:100%;
}
.header{
    position: relative;
    width:100%;
    height:20%;
    border:1px solid rgb(143, 140, 140);
    img{
        position:absolute;
        width:30px;
        height:30px;
        left:20px;
        top:20px;
    }
    p{
        margin-top:20px;
        text-align: center;
        span{
            &:nth-child(1){
                font-family:"微软雅黑";
                font-size: 20px;
                font-weight: 700;
                color:#fff;
            }
            &:nth-child(3){
                font-family:"微软雅黑";
                font-size: 14px;
                color:#fff;
            }
        }
    }
}
.lyric-area{
    width:100%;
    height:60%;
    position: relative;
    /* border:1px solid red; */
    margin:10px auto;
    text-align: center;
    img{
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
    }
    ul{
        box-sizing: border-box;
        width:280px;
        height:300px;
        /* border:1px solid red; */
        margin:10px auto;
        overflow: auto;
        color:rgb(224, 206, 206);
        font-size: 16px;
        text-align: center;
    }
}
.animationStyle{
    animation: my-rotate  5s linear infinite;
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
    audio{
        width:90%;
        margin-top: 15px;
    }
}
.activeLyric{
    color:#fff;
}
.highlight{
    color:rgb(22, 37, 119);
    font-size:18px;
}
</style>

