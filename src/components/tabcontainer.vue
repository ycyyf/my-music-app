<template>
    <div>
        <div v-if="fatherComponent=='recommend'">
            <!-- 轮播 -->
            <div class="lunbo">
                <!-- 轮播内容 -->
                <img v-for="(item,index) in banner" :src="item" :key="index" v-show="index==num" alt="">
                <!-- 小圆点 -->
                <ul class="circles">
                    <li v-for="(item,index) in banner" :key="index" class="circle" :class="{'activeCircle':index==num}"></li>
                </ul>
            </div>
            <!-- 推荐列表 -->
            <div class="recommend-list-box">
                <h5>推荐歌单</h5>
                <ul class="recommend-list">
                    <router-link tag="li"  v-for="(list,index) in RecommendList" :key="index" :to="{path:'/detail?id='+index+'&ConType=R'}"><img :src="list.imgUrl" alt=""><p>{{list.type}}</p></router-link>
                </ul>
            </div>
        </div>
        <!-- 排行榜 -->
        <div v-if="fatherComponent=='rank'">
            <ul class="rank-list">
                <router-link tag="li" to="" v-for="(list,index) in RankList" :key="index"><img :src="list.pic" alt=""><span>{{list.name}}</span></router-link>
            </ul>
        </div>
        <!-- 歌手 -->
        <div v-if="fatherComponent=='singer'">
            <ul class="singer-list">
                <router-link tag="li"  :to="{path:'/detail?id='+index+'&ConType=S'}" v-for="(item,index) in singerList" :key="index"><img :src="item.avater" alt="歌手头像"><span>{{item.singer}}</span></router-link>
            </ul>
        </div>
        <!-- 底部播放 -->
        <div class="play-bottom">

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:"TabContainer",
    props:['fatherComponent'],
    data(){
        return{
            num:0,
            banner:[require("../assets/banner1.jpg"),require("../assets/banner2.jpg"),require("../assets/banner3.jpg"),require("../assets/banner4.jpg")],
            RankList:[]
        }
    },
    methods:{
        autoPlay(){
            this.num++;
            if(this.num==this.banner.length)
            {
                this.num=0;
            }
        },
        play:function(){
            setInterval(this.autoPlay,2000);
        }
    },
    computed:mapState([
        "RecommendList","singerList"
    ]),                                                                                                                                                                                                                           
    mounted(){
        // 播放轮播图
        this.play();
    }
}
</script>

<style scoped lang="scss">
/* 轮播 */
.lunbo{
    height:200px;
    width:98%;
    margin:-130px auto;
    overflow: hidden;
    border-radius:5px;
    position: relative;
    z-index:99;
    img{
        width:100%;
        height:100%;
    }
}
/* 小圆点 */
.circles{
    margin:-30px auto;
    text-align: center;
}
.circle{
    display:inline-block;
    width:8px;
    height:8px;
    border-radius: 50%;
    background:#f1f1f1;
    margin-right:10px;
}
.activeCircle{
    background: #f00;
}
/* 推荐歌单部分 */
.recommend-list-box{
    margin-top:150px;
    h5{
        width:100%;
        height:65px;
        line-height: 65px;
        padding-left:10px;
        margin:0;
        font-weight:900;
    }
    ul{
        li{
            display:inline-block;
            width:30%;
            height:173.75px;
            margin-left:2.5%;
            img{
                width:100%;
                height:116.25px;
                border-radius: 5px;
            }
            p{
                text-align: center;
                margin-top: 20px;
            }
        }
    } 
}
/* 排行榜 */
.rank{
    width:100%;
    margin:0 auto;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    z-index:999;
    top:-150px;
    padding-top:10px;
    li{
        width:94%;
        height:106px;
        margin:0 auto;
        margin-top: 10px;
        padding-bottom:3px;
        border-bottom:1px solid #666;
        border-radius: 5px;
    }
    img{
        width:100px;
        height:100px;
        border-radius: 5px;
    }
    span{
        display:inline-block;
        width:60%;
        margin-left: 10px;
    }
}

// 歌手
.singer-list{
    li{
        width:100%;
        height:50px;
        line-height: 50px;
        box-sizing: border-box;
        box-shadow: 0 2px 2px #aaa;
        font-size: 18px;
        font-family: 'Courier New', Courier, monospace;
        &+li{
            border-bottom:1px solid #999;
        }
        img{
            width:40px;
            height:40px;
            vertical-align: middle;
            margin-left:5px;
        }
        span{
            margin-left:30px;
            vertical-align:middle;
        }
    }
}
</style>
