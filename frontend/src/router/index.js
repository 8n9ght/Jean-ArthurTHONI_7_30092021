import { createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Feed from '@/views/Feed.vue';
import Profil from '@/views/Profil.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
    {
        name:'home',
        path: '/',
        component: Home,
        meta:{
            title: 'Groupomania'
        }
    }, {
        name: 'feed',
        path: '/feed',
        component: Feed,
        meta:{
            title: 'Actualités | Groupomania'
        }
    }, {
        name: 'profil',
        path: '/user/profile/:id',
        component: Profil,
        props:true,
        meta:{
            title: 'Profil | Groupomania'
        }
    },{
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta:{
            title: '404 Not found'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) =>{
    document.title = to.meta.title;
})

export default router;