import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/Home',
        name: 'Home',
        component: () => import('../components/Home.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router