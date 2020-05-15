const cookieparser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
const jwtDecode = require("jwt-decode");

export const state = () => ({
  auth: null,
  trainers: []
});

export const mutations = {
  setAuth(state, auth) {
    if (typeof auth !== "object") auth = JSON.parse(auth);
    state.auth = auth;
  },
  setTrainers(state, data) {
    state.trainers = data;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null;

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        auth = parsed.auth;
      } catch (err) {
        console.log("Jwt error: " + err);
      }
    }

    commit("setAuth", auth);
  },

  async login({ commit }, authData) {
    await this.$axios
      .$post("/api/authenticate", authData)
      .then(response => {
        return commit("setAuth", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  logout({ commit }) {
    Cookie.remove("auth");

    // Index
    commit("setAuth", null);
    commit("setTrainers", []);
    // Dog
    commit("dog/setDogs", [], { root: true });
    commit("dog/setDog", null, { root: true });
    commit("dog/setDogScents", [], { root: true });
    // Group
    commit("group/setGroups", [], { root: true });
    commit("group/setGroupDetails", null, { root: true });
    commit("group/setUserGroups", [], { root: true });
    commit("group/setAllUsers", [], { root: true });
    // Scent
    commit("scent/setScents", [], { root: true });
    // Training
    commit("training/setTrainings", [], { root: true });
    commit("training/setUserTrainings", [], { root: true });
    commit("training/setTraining", null, { root: true });
    // User
    commit("user/setUser", null, { root: true });
    commit("user/setTrainers", [], { root: true });
    commit("user/setHandlers", [], { root: true });

    this.$router.push("/login");
  },

  /*
  tokenExpiryCheck({ state }) {
    let isExpired = true;

    const tokenDate = jwtDecode(Cookie.get("auth"));

    if (tokenDate == null) this.logout();

    try {
      if (Date.now() >= tokenDate * 1000) {
        isExpired = false;
      }
    } catch (error) {
      isExpired = true;
    }

    if (isExpired) this.logout();
  },
  */

  getTrainers({ commit }) {
    this.$axios
      .$get("/api/trainers")
      .then(response => {
        return commit("setTrainers", response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
