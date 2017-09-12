import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeQuestions from '@/components/HomeQuestions'
import SingleQuestion from '@/components/SingleQuestion'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/',
      name: 'Home',
      component: HomeQuestions
    }, {
      path: 'question/:id',
      name: 'SingleQuestion',
      component: SingleQuestion,
      props: true
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }]
})
