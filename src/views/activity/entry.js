import Entry from './entry.vue'
import router from './router'
import {sync} from 'vuex-router-sync'
import mixins from '../../utils/mixins'

// register global mixins.
Vue.mixin(mixins);

// create the app instance.
new Vue(Vue.util.extend({el: '#root', router}, Entry));

router.push('/');
