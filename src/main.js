import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { Lazyload } from 'vant';
import {MyPlugin } from '@/utils/loginPlugin'

Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(MyPlugin)
Vue.filter('timeHanle',function(val){
  return dayjs().from(dayjs(val))
})
Vue.filter('timeFormats',function(val){
  return dayjs(val).format('YYYY年MM月DD日 HH:mm')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
