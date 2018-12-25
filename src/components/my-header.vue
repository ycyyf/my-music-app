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
    <!-- <router-view></router-view> -->
</div>
</template>

<script>
    export default {
        name:"myHeader",
        data(){
            return{
                title:"VMUSICJIN"
            }
        },
        methods:{
            SearchSong:function(){

            }
        }
    }
</script>

<style scoped>
    .header{
        width:100%;
        height:240px;
        background: #f00;
    }
    .header>.header-top{
        display:-webkit-flex; /*Safari*/
        display:flex;
        justify-content:center;
        margin:0;
    }
    .header>.header-top li{
        display:inline-block;
    }
    .header>.header-top li:nth-child(1),.header>.header-top li:nth-child(3){
        width:44px;
        height:44px;
        padding:10px;
    }
    .header>.header-top li:nth-child(1) img,.header>.header-top li:nth-child(3) img{
        width:22px;
        height:22px;
    }
    .header>.header-top li:nth-child(2){
        margin:0 auto;
        text-align: center;
        color:#fff;
        font-weight: 900;
        font-size: 30px;
    }

    /* 导航条 */
    .header-tab{
        display:-webkit-flex; /*Safari*/
        display:flex;
        justify-content:center;
        margin:0;
    }
    .header-tab>li{
        width:33.33%;
        height:44px; 
        line-height:44px;
        text-align: center;
        border:1px solid red;
        font-size: 18px;
        color:#fff;
        cursor: pointer;
    }
    .header-tab li.tab-active span{
        border-bottom: 2px solid #fff;
    }
</style>