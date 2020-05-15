import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import { store } from './store/store';
import { routes } from './Routes';

Vue.use(VueRouter);

Vue.config.productionTip = false;

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!document.cookie.match(new RegExp('(^| )jwt=([^;]+)'))) {
      store.state.session.jwt = null;
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      store.state.session.loggedIn = false;

      next({ path: '' });
    } else
      next();
  } else
    next();
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app');
