<template>
<div class="header">
    <ul class="header-top">
        <li><img src="../assets/icon-list.png" alt="列表"></li>
        <li>{{title}}</li>
        <li><img src="../assets/icon-search.png" alt="搜索" @click="SearchSong"></li>
    </ul>
    <ul class="header-tab" >
        <router-link to="/recommend" tag="li" ><span>推荐</span></router-link>
        <router-link to="/rank" tag="li"><span>排行</span></router-link>
        <router-link to="/singer" tag="li"><span>歌手</span></router-link>
    </ul>
</div>
</template>

<script>
    export default {
        name:"myHeader",
        data(){
            return{
                title:"MYMUSICAPP"
            }
        },
        methods:{
            SearchSong:function(){
                // 路由跳转
                this.$router.push({path:"/search"});
            }
        }
    }
</script>

<style lang="scss" scoped>
    $color:rgb(83, 94, 83);
    .header{
        width:100%;
        height:240px;
        background:$color;
        .header-top{
            display:-webkit-flex; /*Safari*/
            display:flex;
            justify-content:center;
            margin:0;
            li:nth-child(1),li:nth-child(3)
            {
                width:44px;
                height:44px;
                padding: 10px;
                img{
                    width:33px;
                    height:33px;
                }
            }
            li:nth-child(2){
                margin:0 auto;
                text-align: center;
                color:#fff;
                font-weight: 900;
                font-size: 30px;
            }
        }
        .header-top li{
            display:inline-block;
        }
    }
    /* 导航条 */
    .header-tab{
        display:-webkit-flex; /*Safari*/
        display:flex;
        justify-content:center;
        margin:0;
        li{
            width:33.33%;
            height:44px; 
            line-height:44px;
            text-align: center;
            font-size: 18px;
            color:#fff;
            cursor: pointer;
            &.tab-active{
                span{
                    border-bottom: 4px solid #D4C9AB;
                    color:#D4C9AB;
                    font-weight: bold;
                    font-size: 18px;
                }
            }
        }
    }
</style>