import Entry from './entry.vue'
import mixins from '../../utils/mixins'

// register global mixins.
Vue.mixin(mixins);

// create the app instance.
Entry.el = '#root';
new Vue(Entry);
