import { createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Team from '@/views/Team.vue';
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
        name: 'profil',
        path: '/profile/:id',
        component: Profil,
        props:true,
        meta:{
            title: 'Profil | Groupomania'
        }
    }, {
        name: 'team',
        path: '/team',
        component: Team,
        meta:{
            title: 'Équipe | Groupomania'
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

router.afterEach((to, from) =>{
    document.title = from.meta.title;
})

export default router;