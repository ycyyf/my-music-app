<template>
    <div class="play" :style="{background:'rgb(143, 140, 140)',height:screenHeight}">
        <div class="header">
            <img :src="backImg" alt="返回上一级" @click="goBack">
            <p><span>{{song[index].title}}</span><br><span>{{song[index].author}}</span></p>
        </div>
        <div class="lyric-area" @click="exchange">
            <img :src="song[index].coverUrl" alt="唱片图片" v-if="showLyric">
            <ul v-else>
                <li v-for="(item,index) in activeLyricArr" :key="index" :class="{'activeLyric':currentTime==item.time.substr(0,5)}">{{item.lyric}}</li>
            </ul>
        </div>
        <div class="play-control">
            <p>
                <!-- <span>{{activeLyricArr[0].time}}</span> -->
                <!-- <audio src="http://www.kugou.com/song/#hash=79b5a1e39aad83a9a3b55921e307b3b7&album_id=2944963" controls autoplay></audio> -->
                <!-- <span>{{activeLyricArr[activeLyricArr.length-1].time}}</span> -->
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="298" height="52" src="http://www.kugou.com/song/#hash=79b5a1e39aad83a9a3b55921e307b3b7&album_id=2944963"></iframe>
                <!-- <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=469699266&auto=1&height=66"></iframe> -->
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
            currentTime:this.getNextLyric
        }
    },
    methods:{
        goBack(){
            // this.backImg="require('../assets/arrow-left.png')";
            this.$router.go(-1);
        },
        exchange(){
            this.showLyric=!this.showLyric;
        },
        getLrc:function(){
            this.$axios("http://www.kugou.com/song/#hash=79b5a1e39aad83a9a3b55921e307b3b7&album_id=2944963").then((res)=>{
                console.log(res);
                // var result_arr=res.data.split("\n");
                // var lyric_arr=[];
                // // console.log(result_arr);
                // for(var i=0;i<result_arr.length;i++)
                // {
                //     lyric_arr=result_arr[i].split("]");
                //     this.lyricArr.push({time:lyric_arr[0].substr(1,lyric_arr[0].length-1),lyric:lyric_arr[1]});
                //     if(i<16)
                //     {
                //         this.activeLyricArr.push({time:lyric_arr[0].substr(1,lyric_arr[0].length-1),lyric:lyric_arr[1]});
                //     }
                // }
            }).catch((err)=>{
                console.log(err);
            })
            //console.log(this.song[index].lyrics);
        }
    },
    computed:{
        getScreenHeight:function(){
            this.screenHeight=screen.height+'px';
        },
        getNextLyric(){
            var curTime=document.getElementsByTagName("audio")[0].currentTime;
            return curTime;
        }
        
    },
    watch:{
        currentTime:function(newVal){
            console.log(newVal);
        }
    },
    mounted(){
        this.getScreenHeight;
        this.index=this.$route.query.index;
        console.log(this.song[index],url);
        this.getLrc();
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
    width:180px;
    height:300px;
    /* border:1px solid red; */
    margin:10px auto;
    overflow: auto;
    color:rgb(224, 206, 206)
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
</style>

