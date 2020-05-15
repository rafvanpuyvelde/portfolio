export const state = () => ({
  dog: null,
  dogs: [],
  dogScents: []
});

export const getters = {
  search: state => id => {
    return state.dogs.find(dog => dog.id === id);
  }
};

export const mutations = {
  setDogs(state, data) {
    state.dogs = data.dogs;
  },
  setDog(state, data) {
    state.dog = data;
  },
  setDogScents(state, data) {
    state.dogScents = data;
  }
};

export const actions = {
  async getDogs({ commit }, id) {
    await this.$axios
      .$get(`/api/users/${id}`)
      .then(response => {
        return commit("setDogs", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getDog({ commit }, id) {
    await this.$axios
      .$get(`/api/dogs/${id}`)
      .then(response => {
        return commit("setDog", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async deleteDog({ commit }, id) {
    await this.$axios
      .$delete(`/api/dogs/${id}`)
      .then(() => {
        return commit("setDog", null);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async editDog({ commit }, dog) {
    await this.$axios
      .$put(`/api/dogs/${dog.id}`, dog)
      .then(response => {
        return commit("setDog", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async createDog({ commit }, dog) {
    await this.$axios
      .$post("/api/dogs", dog)
      .then(response => {
        return commit("setDogs", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getDogScents({ commit }, dogId) {
    await this.$axios
      .$get(`/api/dogs/${dogId}/scents`)
      .then(response => {
        return response; //commit("setDogScents", response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
