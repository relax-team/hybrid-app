
import Router from 'vue-router'
import ViewIndex from './index.vue'
import ViewCategory from './category.vue'
import ViewHot from './hot.vue'

Vue.use(Router)


export default new Router({
    mode: 'abstract',
    routes: [
        { path: '/index', component: ViewIndex },
        { path: '/category', component: ViewCategory },
        { path: '/hot', component: ViewHot },
        { path: '/', redirect: '/index' }
    ]
})
