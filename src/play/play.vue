<template>
    <div class="play" :style="{background:'rgb(143, 140, 140)',height:screenHeight}">
        <div class="header">
            <img :src="backImg" alt="返回上一级" @click="goBack">
            <p><span>{{songList[index].title}}</span><br><span>{{songList[index].author}}</span></p>
        </div>
        <div class="lyric-area" @click="exchange">
            <img :src="songList[index].coverUrl" alt="唱片图片" v-show="showLyric" :class="animationStyle" id="albumImg">
            <Scroll class="wrapper" ref="wrapper" :data="lyricArr">
                <ul v-show="!showLyric" class="content lyric-ul" ref="lyricList">
                    <li ref="lyricLine" class="lyric-line" v-for="(item,index) in lyricArr[1]" :key="index">{{item}}</li>
                </ul>
            </Scroll>
        </div>
        <div class="play-control">
            <audio ref="player" id="audio" :src="playUrl" controls preload @canplaythrough="initPlayer"></audio>
        </div>
    </div>
</template>

<script>
// import Lyric from 'lyric-parser'
import {mapState,mapActions} from 'vuex'
import Scroll from '../base/scroll/scroll'

export default {
    name:'Play',
    data(){
        return{
            backImg:require('../assets/arrow-down.png'),
            //是否显示歌词
            showLyric:true,
            //屏幕高度
            screenHeight:'',
            // 歌曲索引
            index:0,
            // 歌词数组
            lyricArr:[],
            // 当前歌词时间
            currentTime:"",
            // 歌曲资源地址
            songurl:"",
            // 歌曲MP3地址
            playUrl:"",
            // 动画样式
            animationStyle:""
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
        initPlayer(){
        },
        addEventListeners:function(){
            const self=this;
            self.$refs.player.addEventListener('play',self.play);
            self.$refs.player.addEventListener('pause',self.stop);
            self.$refs.player.addEventListener('timeupdate',self.getCurrentTime);
        },
        removeEventListeners:function(){
            const self=this;
            self.$refs.player.removeEventListener('play',self.play);
            self.$refs.player.removeEventListener('pause',self.stop);
            self.$refs.player.removeEventListener('timeupdate',self.getCurrentTime);
        },
        play(){
            let audio=document.querySelector("#audio");
            let albumImg=document.querySelector("#albumImg");
            audio.play();
            this.animationStyle="animationStyle";
            this.getCurrentTime();
        },
        stop(){
            let audio=document.querySelector("#audio");
            let albumImg=document.querySelector("#albumImg");
            audio.pause();
            this.animationStyle="pause animationStyle";
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
                    timeArr.push(arr[i].substr(1,5));
                    lyricArr.push(arr[i].substr(10));
                }
                this.lyricArr.push(timeArr);
                this.lyricArr.push(lyricArr);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getCurrentTime:function(){
            const self=this;
            let ulEle=document.getElementsByClassName("lyric-ul")[0];
            //audio的currentTime属性的单位是秒
            let curTime=self.$refs.player.currentTime;
            let minute=Math.floor(curTime/60)<10?('0'+Math.floor(curTime/60)):Math.floor(curTime/60);
            let sec=null;

            if(curTime%60!=0)
            {
                sec=Math.floor(curTime%60)<10?('0'+Math.floor(curTime%60)):Math.floor(curTime%60);
                curTime=minute+":"+sec;
            }
            else
            {
                curTime=minute+":00";
            }
            
            self.currentTime=curTime;
            for(let i=0;i<self.lyricArr[0].length;i++)
            {
                let liEle=document.getElementsByClassName("lyric-line")[i];

                if(self.lyricArr[0][i]==self.currentTime)
                {
                    for(let j=0;j<self.lyricArr[0].length;j++)
                    {
                        let lis=document.getElementsByClassName("lyric-line")[j];
                        lis.className="lyric-line";
                    }
                    liEle.className="lyric-line highlight";

                    // console.log(ulEle.scrollTop);
                   
                    // console.log(liEle.clientHeight);
                    if(i>5)
                    {
                        ulEle.scrollTop+=6;
                    }
                }
            }
        },
        getDurationTime:function(){
            const self=this;
            self.timeDuration=parseInt(self.$refs.player.duration);
        }
    },
    computed:{
        getScreenHeight:function(){
            this.screenHeight=screen.height+'px';
        },
        ...mapState(["songList"])
    },
    components:{Scroll},
    watch:{
    },
    mounted(){
        this.getScreenHeight;
        this.index=this.$route.query.index;
        this.getPlayDetail();
        this.addEventListeners();
    },
    beforeDestroy(){     
        this.removeEventListeners();
    }
}
</script>

<style scoped lang="scss">
.play{
    width:100%;
    // height:100%;
    height:100vh;
}
.header{
    position: relative;
    width:100%;
    // height:20%;
    height:20vh;
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
    // height:60%;
    height: 60vh;
    position: relative;
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
    .wrapper{
        width:100%;
        height:300px;
        overflow: hidden;
        ul{
            box-sizing: border-box;
            width:280px;
            // height:300px;
            /* border:1px solid red; */
            margin:10px auto;
            overflow: auto;
            color:rgb(224, 206, 206);
            font-size: 16px;
            text-align: center;
        }
    }
}
.animationStyle{
    animation: my-rotate  5s linear infinite;
}
.pause{
    animation-play-state: paused;
}
@keyframes my-rotate {
    0% {transform: rotate(0)}
    25%{transform:rotate(90deg)}
    50%{transform:rotate(180deg)}
    75%{transform:rotate(270deg)}
    100% {transform: rotate(360deg)}
}
.play-control{
    width:100%;
    // height:20%;
    height:20vh;
    /* border:1px solid red; */
    text-align: center;
    audio{
        width:90%;
        margin-top: 15px;
    }
}
.highlight{
    color:rgb(22, 37, 119);
    font-size:18px;
}
</style>

