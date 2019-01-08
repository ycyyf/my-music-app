<template>
    <div class="play" :style="{background:'rgb(143, 140, 140)',height:screenHeight}">
        <div class="header">
            <img :src="backImg" alt="返回上一级" @click="goBack">
            <p><span>{{songList[index].title}}</span><br><span>{{songList[index].author}}</span></p>
        </div>
        <div class="lyric-area" @click="exchange">
            <img :src="songList[index].coverUrl" alt="唱片图片" v-if="showLyric">
            <ul v-else class="lyric-ul">
                <li v-for="(item,index) in lyricArr" :key="index" >{{item.substr(10)}}</li>
            </ul>
        </div>
        <div class="play-control">
            <audio id="audio" :src="playUrl" controls preload ></audio>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'Play',
    // props:['song'],
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
            playUrl:"",
            highlight:"highlight",
            count:0
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
            // console.log(htmlUrl);
            this.songurl="/playSong/index.php?r=play/getdata&"+htmlUrl;
        },
        getPlayDetail:function(){
            this.getPlayUrl();
            this.$axios.get(this.songurl).then((res)=>{
                var result=res.data.data;
                this.playUrl=result.play_url;
                this.lyricArr=result.lyrics.split("\r\n");
                // console.log(this.lyricArr);
                //this.getNextLyric();
            }).catch((err)=>{
                console.log(err);
            })
        },
        getTime(){
            let curTime;
            let audio=document.getElementsByTagName("audio")[0];
            let ul=document.getElementsByClassName("lyric-ul")[0];
            if(audio.played)
            {
                curTime=audio.currentTime;
                curTime=((Math.floor(curTime/60)<10) ? ('0'+Math.floor(curTime/60)) : (Math.floor(curTime/60)))+":"+((curTime % 60)<10 ? ('0'+(curTime % 60).toFixed(2)) : (curTime % 60).toFixed(2));
            }
            this.currentTime=curTime;
            console.log(this.currentTime);
            for(let i=0;i<this.lyricArr.length;i++)
			{
				if(this.lyricArr[i].substring(1,9)==curTime)
				{
					let lis=document.getElementsByTagName("li");
					for(li of lis)
					{
						li.className="";
					}
					lis[i].className="highlight";

					// 控制滚动条向上
					if(i>5)
					{
						ul.scrollTop+=10;
					}
				}
			}
		}

    },
    computed:{
        getScreenHeight:function(){
            this.screenHeight=screen.height+'px';
        },
        ...mapState(["songList"])
    },
    mounted(){
        this.getScreenHeight;
        this.index=this.$route.query.index;
        this.getPlayDetail();
        // setInterval(this.getTime(),3000);
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
    text-align: center;
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
    width:90%;
    /* height:60px; */
    /* border:1px solid red; */
}
.highlight{
    color:rgb(22, 37, 119);
    font-size:18px;
}
</style>

