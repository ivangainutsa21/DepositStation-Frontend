import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import DepositStation from '@/components/DepositStation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DepositStation',
      component: DepositStation
    }
  ]
})
