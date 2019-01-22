<template>
    <div class="search">
        <div class="header">
            <img src="../assets/arrow-left.png" alt="返回上一级" @click="goBack">
            <input type="text" name="" id="" placeholder="搜索歌曲、歌手" v-focus="isFocus" v-model="searchStr" @keyup.enter="getSong">
            <img src="../assets/icon-cancel.png" alt="取消" class="icon-cancel" v-show="lenOfSearchStr>0" @click="cancel">
        </div>
        <div class="hot-search">
            <p>热门搜索</p>
            <div>
                <span v-for="(item,index) in labelArr" :key="index" @click="addToInput(item)">{{item}}</span>
            </div>
        </div>
        <ul class="song-list">
            <router-link tag="li" :to="{path:'/play?index='+index}" v-for="(item,index) in songList" :key="index"><img :src="item.coverUrl" alt="封面"><span class="title">{{item.title}}</span><span class="singer">{{item.singer}}</span></router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name:"Search",
    data(){
        return{
            searchStr:"",
            isFocus:false,
            labelArr:["起风了","以团之名","陈奕迅","林俊杰","西城男孩","不染"],
            songList:[]
        }
    },
    computed:{
        lenOfSearchStr()
        {
            return this.searchStr.length;
        }
    },
    methods:{
        goBack:function()
        {
            this.$router.go(-1);
        },
        addToInput(text){
            this.searchStr=text;
        },
        cancel(){
            this.searchStr="";
        },
        getSong(){
            this.$axios.get("/album/music/kugou?apikey=3pRQWtkgUvFVI4QOLsOAFHBT92gTbFOU4mmkZISSAH2XexcxnsEg3YiAhjVTjj6w&kw="+this.searchStr)
            .then((res)=>{
                console.log(res.data.data);
                let result=res.data.data;
                for(let i=0;i<result.length;i++)
                {
                    this.songList.push({singer:this.searchStr,title:result[i].title,coverUrl:result[i].coverUrl,lyrics:result[i].lyrics,url:result[i].url});
                }
                console.log(this.songList);
                this.$store.commit({type:"addSongList",songs:this.songList});
            })
            .catch((err)=>{

            })
        }
    },
    // 自定义指令
    directives:{
        focus:{
            //根据isFocus的状态改变是否聚焦focus
            update:function(el,value)  //第二个参数传过来的是json
            {
                if(value)
                {
                    el.focus();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    width:100%;
    height:40px;
    line-height: 40px;
    background:rgb(83, 94, 83);
    img{
        width:20px;
        height:20px;
        vertical-align: middle;
        &.icon-cancel{
            margin-left:10px;
        }
    }
    input{
        width:80%;
        height:30px;
        margin-left:10px;
        background:transparent;
        vertical-align:middle;
        border:none;
        color:#fff;
        font-size:16px;
        font-family: 'Courier New', Courier, monospace;
    }
}
.hot-search{
    width:90%;
    height:auto;
    margin:0 auto;
    // border:1px solid red;
    p{
        line-height: 50px;
        color:#666;
    }
    div{
        span{
            display:inline-block;
            height:24px;
            line-height: 24px;
            border:1px solid #999;
            border-radius:4px;
            margin-right:10px;
            margin-bottom:10px;
            padding:4px;
            color:#000;
            font-size: 16px;
        }
    }
}
.song-list{
    width:100%;
    li{
        list-style:none;
        height:50px;
        line-height: 50px;
        // border:1px solid red;
        box-shadow: 0 2px 2px #999;
        margin-top:10px;
        cursor: pointer;
        img{
            width:40px;
            height:40px;
            vertical-align: middle;
            margin-left:10px;
        }
        span{
            margin-left:30px;
            vertical-align:middle;
            &.title{
                font-size:16px;
            }
            &.singer{
                font-size:14px;
                color:#666;
            }
        }
    }
}
</style>


