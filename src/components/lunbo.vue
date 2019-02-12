<template>
    <div class="lunbo">
        <!-- 轮播内容 -->
        <img v-for="(item,index) in banner" :src="item" :key="index" v-show="index==num" alt="">
        <!-- 小圆点 -->
        <ul class="circles">
            <li v-for="(item,index) in banner" :key="index" class="circle" :class="{'activeCircle':index==num}"></li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"LunBo",
    data(){
        return{
            num:0,
            banner:[require("../assets/banner1.jpg"),require("../assets/banner2.jpg"),require("../assets/banner3.jpg"),require("../assets/banner4.jpg")]
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
            this.timer=setInterval(this.autoPlay,2000);
        }
    },
    mounted(){
        // 播放轮播图
        this.play();
    }
}
</script>

<style lang="scss" scoped>
/* 轮播 */
.lunbo{
    height:200px;
    width:98%;
    margin:0px auto;
    // overflow: hidden;
    border-radius:5px;
    // position: absolute;
    // position: relative;;
    // z-index:998;
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
</style>


