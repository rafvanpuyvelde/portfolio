export const state = () => ({
  groupDetails: null,
  groups: [],
  userGroups: [],
  allUsers: []
});

export const getters = {
  search: state => id => {
    return state.groups.find(group => group.id === id);
  }
};

export const mutations = {
  setGroups(state, data) {
    state.groups = data;
  },

  setGroupDetails(state, data) {
    state.groupDetails = data;
  },

  setUserGroups(state, data) {
    state.userGroups = data.groups;
  },

  setAllUsers(state, data) {
    state.allUsers = data;
  }

};

export const actions = {
  async getGroups({ commit }, id) {
    await this.$axios
      .$get("/api/groups")
      .then(response => {
        return commit("setGroups", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getGroupDetails({ commit }, id) {
    await this.$axios
      .$get(`/api/groups/${id}`)
      .then(response => {
        return commit("setGroupDetails", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getUserGroups({ commit }, id) {
    await this.$axios
      .$get(`/api/users/${id}`)
      .then(response => {
        return commit("setUserGroups", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async createGroup({ commit }, group) {
    if (group== null || group.trainer.id == null) {
      return false;
    }
    await this.$axios
      .$post("/api/groups", group)
      .then(response => {
        return commit("setGroups", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getAllUsers({ commit }) {
    await this.$axios
      .$put(`/api/users`)
      .then(response => {
        return commit("setAllUsers", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async editGroup({ commit }, group) {
    await this.$axios
      .$put(`/api/groups/${group.id}`, group)
      .then(response => {
        return commit("setGroupDetails", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async deleteGroup({ commit }, id) {
    await this.$axios
      .$delete(`/api/groups/${id}`)
      .then(() => {
        return commit("setGroupDetails", null);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
