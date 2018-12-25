<template>
    <div>
        <my-header></my-header>
        <TabContainer father-component="recommend"></TabContainer>
    </div>
</template>

<script>
import myHeader from '../components/my-header'
import TabContainer from '../components/tabcontainer'
export default {
    name:"Recommend",
    data(){
        return{

        }
    },
    components:{ myHeader,TabContainer }
}
</script>

<style scoped>

</style>