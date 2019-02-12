<template>
    <div class="rank">
        <my-header></my-header>
        <TabContainer father-component="rank"></TabContainer>
        <!-- <div class="rank-list">
            <router-link tag="div" :to="{path:'/detail?id='+index+'&ConType=K'}" v-for="(item,index) in rankList" :key="index">
                <img v-lazy="item.icon" alt="图像">
                <span>{{item.name}}</span>
            </router-link>
        </div> -->
    </div>
</template>

<script>
import myHeader from '../components/my-header'
import TabContainer from '../components/tabcontainer'
import {mapState,mapActions} from 'vuex'

export default {
    name:"Rank",
    data(){
        return{

        }
    },
    components:{ myHeader,TabContainer },
    computed:mapState(["rankList"])
}
</script>

<style scoped lang="scss">
.rank{
    background:#e5e5e5;
}
.rank-list{
    position: relative;
    z-index: 999;
    top:-70px;
    width: 100%;
    height:auto;
    div{
        width:100%;
        height:100px;
        line-height: 100px;
        margin-bottom:10px;
        box-shadow: 0 2px 2px #999;
        background: #D4C9AB;
        img{
            width:80px;
            height:80px;
            vertical-align:middle;
        }
        span{
            font-size: 18px;
            vertical-align:middle;
        }
    }
}
</style>