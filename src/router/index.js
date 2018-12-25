import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../recommend/recommend.vue'
import Rank from '../rank/rank.vue'
import Singer from '../singer/singer.vue'
import Detail from '../components/detail.vue'
import Play from '../play/play.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass:"tab-active",
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
      // children:[{
      //     path:":id",
      //     component:Detail
      // }]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail
    },
    {
      path:'/play',
      name:'play',
      component:Play
    }
  ]
})
