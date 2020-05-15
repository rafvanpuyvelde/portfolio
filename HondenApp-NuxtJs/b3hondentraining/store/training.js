export const state = () => ({
  trainings: [],
  training: null,
  userTrainings: []
});

export const mutations = {
  setTrainings(state, data) {
    state.trainings = data;
  },

  addToUserTrainings(state, data) {
    if (data[0] === 1) {
      state.userTrainings = [];
    }
    state.userTrainings.push(data[1]);
  },

  setUserTrainings(state, data) {
    state.userTrainings = data;
  },

  setTraining(state, data) {
    state.training = data;
  }
};

export const actions = {
  async getTrainings({ commit }) {
    await this.$axios
      .$get("/api/trainings")
      .then(response => {
        return commit("setTrainings", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getUserTrainings({ commit }, id) {
    var dogs = [];
    await this.$axios
      .$get(`/api/users/${id}`)
      .then(response => {
        dogs = response.dogs;
        var runNr = 0;
        for (var dog of dogs) {
          this.$axios
            .$get(`/api/dogs/${dog.id}`)
            .then(response => {
              if (response.trainings.length) {
                for (var singleTraining of response.trainings) {
                  this.$axios
                    .$get(`/api/trainings/${singleTraining.id}`)
                    .then(response => {
                      runNr++;
                      commit("addToUserTrainings", [runNr, response]);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
        return null;
      })
      .catch(error => {
        console.log(error);
      });
  },

  async getTraining({ commit }, trainingId) {
    await this.$axios
      .$get(`/api/trainings/${trainingId}`)
      .then(response => {
        return commit("setTraining", response);
      })
      .catch(error => {
        console.log(error);
      });
  },

  async createTraining({ commit }, training) {
    await this.$axios
      .$post("/api/trainings", training)
      .then(response => {
        return commit("setTrainings", response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
