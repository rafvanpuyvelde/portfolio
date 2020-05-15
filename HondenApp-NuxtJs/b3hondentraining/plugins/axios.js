export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.auth) {
      //store.dispatch("tokenExpiryCheck");
      //let auth = JSON.parse(store.state.auth);
      let auth = store.state.auth;
      config.headers.common["Authorization"] = `Bearer ${auth.token}`;
    }
  });
}
