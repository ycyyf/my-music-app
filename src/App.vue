<template>
  <div id="app">
    <keep-alive>
      <transition :name="transitionName">
          <router-view ></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:""
    }
  },
  watch:{ //使用watch监听$router的变化
    $route(to,from){
        //如果to的索引大于from的索引，判断为前进状态，反之为后退状态
        if(to.meta.index>from.meta.index)
        {
           //设置动画名称
           this.transitionName='slide-left';
        }
        else if(to.meta.index<from.meta.index){
          this.transitionName="slide-right";
        }
        else{
          this.transitionName="";
        }
    }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
#app {
  width:100%;
  height:100vh;
  /* border:1px solid red; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
  overflow-y: hidden;
}

.slide-right-enter-active, 
.slide-right-leave-active, 
.slide-left-enter-active, 
.slide-left-leave-active 
{ 
  will-change: transform; 
  transition: all 500ms; 
  position: absolute;
} 
.slide-right-enter 
{ 
  opacity: 0; 
  transform: translate3d(-100%, 0, 0); 
} 
.slide-right-leave-active 
{ 
  opacity: 0; 
  transform: translate3d(0, 0, 0); 
} 
.slide-left-enter { 
  opacity: 0; 
  transform: translate3d(100%, 0, 0); 
} 
.slide-left-leave-active 
{ 
  opacity: 0; 
  transform: translate3d(0, 0, 0); 
}
</style>
