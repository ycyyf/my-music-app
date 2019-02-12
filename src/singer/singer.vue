<template>
    <div class="singer-list">
        <my-header></my-header>
        <!-- <Scroll class="singer-content" ref="scroll" :data="singerList"> -->
            <TabContainer father-component="singer"></TabContainer>
        <!-- </Scroll> -->
    </div>
</template>

<script>
import myHeader from '../components/my-header'
import TabContainer from '../components/tabcontainer'
// import Scroll from '../base/scroll/scroll.vue'
// import {mapState} from "vuex"

export default {
    name:"Singer",
    data(){
        return{

        }
    },
    // computed:mapState(["singerList"]),
    components:{ myHeader,TabContainer}
    // mounted(){
    //     console.log(this.singerList);
    // }
}
</script>

<style scoped lang="scss">
</style>