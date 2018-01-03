import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import apiUrl from '../common/commonurl';
// import wxShare from '../common/wxshare';

// Vue.prototype.wxShare=wxShare;
Vue.use(VueResource);
Vue.prototype.apiUrl = apiUrl;
new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    mounted(){
        // this.wxShare()
    }
});
