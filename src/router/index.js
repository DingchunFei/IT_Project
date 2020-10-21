import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/Register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/validate',
        name: 'validate',
        component: () => import('../views/validate.vue')
    },
    {
        path: '/Add',
        name: 'Add',
        component: () => import('../views/Add.vue')
    },
    {
        path: '/AboutMe',
        name: 'AboutMe',
        component: () => import('../components/AboutMe.vue')
    },
    {
        path: '/AboutMeEditor',
        name: 'AboutMeEditor',
        component: () => import('../views/AboutMeEditor.vue')
    },
    {
        path: '/TabEditor',
        name: 'TabEditor',
        component: () => import('../views/TabEditor.vue')
    },
    {
        path: '/Profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
