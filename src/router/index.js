import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../recommend/recommend.vue'
import Rank from '../rank/rank.vue'
import Singer from '../singer/singer.vue'
import Detail from '../components/detail.vue'
import Play from '../play/play.vue'
import Search from '../search/search.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass:"tab-active",
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      meta:{index:0}  //meta对象的index用来定义当前路由的层级，由小到大，由低到高
    },
    {
      path: '/recommend',
      component: Recommend,
      meta:{index:1}
    },
    {
      path: '/rank',
      component: Rank,
      meta:{index:2}
    },
    {
      path: '/singer',
      component: Singer,
      meta:{index:3}
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail,
      meta:{index:4}
    },
    {
      path:'/play',
      name:'play',
      component:Play,
      meta:{index:5}
    },
    {
      path:'/search',
      name:'search',
      component:Search,
      meta:{index:6}
    }
  ]
})
