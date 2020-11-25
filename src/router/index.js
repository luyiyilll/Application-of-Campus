import Vue from 'vue';
import VueRouter from 'vue-router';
const Index = () => import('../pages/index/index.vue')
const Work = () => import('../pages/work/Work.vue')
const SignIn = () => import('../pages/signin/SignIn.vue')
const Profile = () => import('../pages/profile/Profile.vue')
'../pages/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: 'work', component: Work },
    { path: 'signin', component: SignIn },
    { path: 'profile', component: Profile },
  ]
})


export default router;