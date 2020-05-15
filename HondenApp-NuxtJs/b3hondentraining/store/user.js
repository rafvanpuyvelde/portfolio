export const state = () => ({
  roles: {
    1: "trainer",
    2: "begeleider"
  },
  user: null,
  trainers: [],
  handlers: []
});

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },

  setTrainers(state, data) {
    state.trainers = data;
  },

  setHandlers(state, data) {
    state.handlers = data;
  }
};

export const actions = {
  async createUser({ commit }, user) {
    await this.$axios
      .$post("/api/register", user)
      .then(response => {
        return commit("setAuth", response, { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  },

  async deleteUser({ commit }, id) {
    await this.$axios
      .$delete(`/api/users/${id}`)
      .then(() => {
        return commit("setAuth", null, { root: true });
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getUser({ commit }, id) {
    await this.$axios
      .$get(`/api/users/${id}`)
      .then(response => {
        return commit("setUser", response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
