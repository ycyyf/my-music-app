<template>
    <div class="tab-container">
        <Scroll :data="singerList" class="wrapper">
            <div v-if="fatherComponent=='recommend'" class="container">
                <!-- 轮播 -->
                <LunBo></LunBo>
                <!-- 推荐列表 -->
                <div class="recommend-list-box">
                    <h5>推荐歌单</h5>
                    <ul class="recommend-list">
                        <router-link tag="li"  v-for="(list,index) in RecommendList" :key="index" :to="{path:'/detail?id='+index+'&ConType=R'}"><img v-lazy="list.imgUrl" alt=""><p>{{list.name}}</p></router-link>
                    </ul>
                </div>
            </div>
            <!-- 排行榜 -->
            <div v-if="fatherComponent=='rank'">
                <ul class="rank-list">
                    <router-link tag="li" :to="{path:'/detail?id='+index+'&ConType=K'}" v-for="(list,index) in rankList" :key="index"><img v-lazy="list.icon" alt=""><span>{{list.name}}</span></router-link>
                </ul>
            </div>
            <!-- 歌手 -->
            <div v-if="fatherComponent=='singer'" ref="slider" class="container">
                <ul class="singer-list">
                    <router-link tag="li"  :to="{path:'/detail?id='+index+'&ConType=S'}" v-for="(item,index) in singerList" :key="index"><img v-lazy="item.avater" alt="歌手头像"><span>{{item.name}}</span></router-link>
                </ul>
            </div>
        </Scroll>
        <!-- 底部播放 -->
        <div class="play-bottom">

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import LunBo from './lunbo.vue'
import Scroll from '../base/scroll/scroll.vue'

export default {
    name:"TabContainer",
    props:['fatherComponent'],
    data(){
        return{
            RankList:[]
        }
    },
    components:{
        LunBo,Scroll
    },
    computed:mapState([
        "RecommendList","singerList","rankList"
    ]),
    methods:{
    },
    mounted(){
    }                                                                                                                                                                                                                          
}
</script>

<style scoped lang="scss">
.tab-container{
    position: relative;
    z-index: 999;
    background: #fff;
    top:-10vh;
    overflow: hidden;
}
.wrapper{
    width:100%;
    height:80vh;
    overflow: hidden;
    // border:1px solid red;
    .container{
        width:100%;
    }
}
/* 推荐歌单部分 */
.recommend-list-box{
    // margin-top:150px;
    position: relative;
    z-index:998;
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
        line-height:106px;
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
        vertical-align: middle;
    }
    span{
        display:inline-block;
        width:60%;
        margin-left: 10px;
        vertical-align: middle;
        font-size: 18px;
    }
}

// 歌手
.singer-list{
    width:100%;
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
