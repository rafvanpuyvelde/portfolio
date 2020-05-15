import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

// store.js
export const store = new Vuex.Store({
  state: {
    session: {
      loggedIn: false,
      loginAttempted: false,
      status: 'online',
      apiError: false,
      isAdmin: false,
      boozebarId: 1,
      pageTitle: '',
      user: '',
      jwt: (document.cookie.match(new RegExp('(^| )jwt=([^;]+)'))) ? document.cookie.match(new RegExp('(^| )jwt=([^;]+)'))[2] : null,
      notificationsVisible: false,
    },
    order: [],
    queue: [],
    cocktails: [],
    ingredients: [],
    notifications: [],
    latestFinishedInQueue: null
  },
  getters: {
    isLoggedIn: (state) => {
      return state.session.jwt != null;
    },
    hasTriedToLogin: state => {
      return (state.session.loggedIn == false) && state.session.loginAttempted;
    }
  },
  mutations: {
    setPageTitle(state, payload) {
      state.session.pageTitle = payload.title;
    },
    toggleNotifications(state) {
      state.session.notificationsVisible = !state.session.notificationsVisible;
    },
    addOrder(state, payload) {
      if (state.order.length > 0) {
        let isAdded = false;
        state.order.forEach(element => {
          if (element.id == payload.id) {
            element.amount++;
            isAdded = true;
          }
        });

        if (!isAdded) {
          state.order.push({
            id: payload.id,
            name: payload.name,
            amount: 1
          });
        }
      } else {
        state.order.push({
          id: payload.id,
          name: payload.name,
          amount: 1
        });
      }
    },
    decreaseOrder(state, payload) {
      state.order.forEach(element => {
        if (element.id == payload.id) {
          if (element.amount - 1 > 0)
            element.amount--;
          else {
            element.amount = 0;
            state.order.splice(state.order.indexOf(element), 1);
          }
        }
      });
    },
    fetchCocktails(state) {
      Vue.http.get('http://10.129.16.252/boozebar/api/cocktails/read.php', {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        state.cocktails = response.body['cocktails'];
      }, response => {
        if (response.status == '401')
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove cookie, jwt will clear itself
      });
    },
    fetchIngredients(state) {
      Vue.http.get('http://10.129.16.252/boozebar/api/ingredients/read.php', {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        state.ingredients = response.body['ingredients'];
      }, response => {
        if (response.status == '401')
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove cookie, jwt will clear itself
      });
    },
    fetchQueue(state) {
      Vue.http.get('http://10.129.16.252/boozebar/api/orders/readAll.php', {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        state.queue = response.body['queue'];
      }, response => {
        if (response.status == '401')
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove cookie, jwt will clear itself
      });
    },
    fetchLatestFinishedInQueue(state) {
      Vue.http.get('http://10.129.16.252/boozebar/api/orders/readLatestFinished.php', {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        state.latestFinishedInQueue = response.body['order'][0];
      }, response => {
        if (response.status == '401')
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove cookie, jwt will clear itself
      });
    },
    placeOrder(state) {
      let order_ = { 'order': [] };
      state.order.forEach(order => { order_['order'].push({'Name': order.name, 'Amount': order.amount})});

      Vue.http.post("http://10.129.16.252/boozebar/api/orders/write.php", JSON.stringify(order_), {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];

        data.forEach(result => {
          result.forEach(element => {
            resultArray.push(element);
          });
        });


        state.notifications.length = 0;
        state.notifications = resultArray;
        console.log(state.notifications);

      });
    },
    isJwtValid(state) {
      Vue.http.get('http://10.129.16.252/boozebar/api/checkAuth.php', {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {},
      response => {
          if (response.status == '401') {
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            state.session.jwt = null;
          }
        }
      );
    },
    setJWT(state, jwt) {
      state.session.jwt = jwt;
    },
    setUser(state, user) {
      state.session.user = user.toString();
    },
    setBoozebarID(state, boozebarId) {
      state.session.boozebarId = boozebarId;
    },
    addCustomMix(state, customMix) {
      Vue.http.post("http://10.129.16.252/boozebar/api/cocktails/write.php", JSON.stringify(customMix), {
        headers: {
          'Authorization': 'Basic ' + state.session.jwt,
          'Content-Type': 'application/json'
        }
      })
      .then(response => { console.log(response); }, response => {})
    }
  },
  actions: {
    login(context, payload) {
      Vue.http.post("http://10.129.16.252/boozebar/api/login.php", JSON.stringify(payload), { headers: { "Content-Type": "application/json" } }).then(response => {
        let received_jwt = response.body.jwt;
        if (received_jwt != '' && received_jwt.length > 0 && received_jwt != undefined) {
          document.cookie = 'jwt=' + received_jwt + ';expires=' + new Date(new Date().getTime() + 30 * 60 * 1000).toGMTString(); // 30min
          context.commit('setJWT', received_jwt);
          context.commit('setUser', payload.user.username);
          context.commit('setBoozebarID', payload.user.boozebar);
        }
      }, response => {
        console.log(response);
      });
    },
    fetchQueue(context) {
      context.commit('isJwtValid');
      context.commit('fetchQueue');
    },
    placeOrder(context) {
      context.commit('isJwtValid');
      context.commit('placeOrder');
    },
    fetchCocktails(context) {
      context.commit('isJwtValid');
      context.commit('fetchCocktails');
    },
    fetchIngredients(context) {
      context.commit('isJwtValid');
      context.commit('fetchIngredients');
    },
    fetchBoozeBarStatus(context) {
      context.commit('isJwtValid');
      context.commit('fetchBoozeBarStatus');
    },
    fetchLatestFinishedInQueue(context) {
      context.commit('isJwtValid');
      context.commit('fetchLatestFinishedInQueue');
    },
    addCustomMix(context, payload) {
      context.commit('isJwtValid');
      context.commit('addCustomMix', payload);
    }
  }
})
