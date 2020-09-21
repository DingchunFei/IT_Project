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
    {
        path: '/Register',
        name: 'Register',
        component: () => import('../components/Register.vue')
    },
    {
        path: '/validate',
        name: 'validate',
        component: () => import('../components/validate.vue')
    },
    {
        path: '/Add',
        name: 'Add',
        component: () => import('../views/Add.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
