import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
// 这种方法是直接绑定在vue实例上，所以在项目中任何页面，直接 this.$echarts 即可
new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
