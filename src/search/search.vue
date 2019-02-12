<template>
    <div class="search">
        <div class="header">
            <img src="../assets/arrow-left.png" alt="返回上一级" @click="goBack">
            <input type="text" name="" id="" placeholder="搜索歌曲、歌手" v-focus="isFocus" v-model="searchStr" @keyup.enter="getSong">
            <img src="../assets/icon-cancel.png" alt="取消" class="icon-cancel" v-show="lenOfSearchStr>0" @click="cancel">
        </div>
        <div class="search-history" ref="searchHistory">
            <p>搜索历史</p><img src="../assets/icon-delete-all.png" alt="清空图标" @click="clearAll" class="clear-all">
            <div>
                <span v-for="(item,index) in labelArr" :key="index" @click="addToInput(item)">{{item}}<img src="../assets/icon-delete.png" alt="删除图标"  @click.stop="deleteHis(index)"></span>
            </div>
        </div>
        <Scroll :data="songList" class="wrapper">
            <ul class="song-list">
                <router-link tag="li" :to="{path:'/play?index='+index}" v-for="(item,index) in songList" :key="index"><img v-lazy="item.coverUrl" alt="封面"><span class="title">{{item.title}}</span><span class="singer">{{item.singer}}</span></router-link>
            </ul>
        </Scroll>
    </div>
</template>

<script>
import Scroll from '../base/scroll/scroll.vue'
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
            this.searchStr="";
            this.songList=[];
            this.$router.go(-1);
        },
        addToInput(text){
            this.searchStr=text;
        },
        cancel(){
            this.searchStr="";
        },
        getSong(){
            // 判断labelArr中是否已有该记录
            if(this.labelArr.indexOf(this.searchStr)==-1)
            {
                this.labelArr.push(this.searchStr);
            }
            if(this.labelArr.length>8)
            {
                this.labelArr.shift();
            }
            this.$axios.get("/album/music/kugou?apikey=3pRQWtkgUvFVI4QOLsOAFHBT92gTbFOU4mmkZISSAH2XexcxnsEg3YiAhjVTjj6w&kw="+this.searchStr)
            .then((res)=>{
                console.log(res.data.data);
                let result=res.data.data;
                this.songList=[];
                for(let i=0;i<result.length;i++)
                {
                    this.songList.push({singer:this.searchStr,title:result[i].title,coverUrl:result[i].coverUrl,lyrics:result[i].lyrics,url:result[i].url});
                }
                console.log(this.songList);
                this.$store.commit({type:"addSongList",songs:this.songList});
            })
            .catch((err)=>{

            })
        },
        deleteHis(index){
            this.labelArr.splice(index,1);
        },
        clearAll(){
            this.labelArr=[];
        }
    },
    components:{Scroll},
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
    height:6vh;
    line-height:6vh;
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
.search-history{
    position: relative;
    width:90%;
    height:24vh;
    margin:0 auto;
    p{
        display:inline-block;
        line-height: 50px;
        color:#666;
    }
    .clear-all{
        position: absolute;
        width:30px;
        height:30px;
        top:5px;
        right:-10px;
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
            img{
                width:15px;
                height:15px;
                vertical-align: middle;
            }
        }
    }
}
.wrapper{
    width:100%;
    height:70vh;
    overflow: hidden;
}
.song-list{
    width:100%;
    li{
        list-style:none;
        height:50px;
        line-height: 50px;
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


