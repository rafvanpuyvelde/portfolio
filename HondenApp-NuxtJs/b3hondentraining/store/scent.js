export const state = () => ({
  scents: []
});

export const mutations = {
  setScents(state, data) {
    state.scents = data;
  }
};

export const actions = {
  async getScents({ commit }) {
    await this.$axios
      .$get("/api/scents")
      .then(response => {
        return commit("setScents", response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
