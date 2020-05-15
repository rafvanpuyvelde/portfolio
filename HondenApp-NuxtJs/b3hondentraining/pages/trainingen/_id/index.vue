<template>
  <b-container class="wrapper-training">
    <h2>
      Training detailinformatie
    </h2>

    <div v-if="training" class="wrapper-content">
      <b-row>
        <b-col class="training-info detail">
          <p>{{ trainingType }}</p>
          <p v-if="training.date">{{ trainingDate }}</p>
        </b-col>
        <b-col class="training-info detail">
          <p>{{ training.place }}</p>
          <p v-if="training.fieldSearch">
            {{ training.fieldSearch.searchTime }}
          </p>
        </b-col>
      </b-row>

      <div v-if="training.fieldSearch" class="wrapper-field-search">
        <b-row>
          <b-col class="training-info detail">
            <p>Omgeving</p>
            <p>{{ training.fieldSearch.surroundings }}</p>
          </b-col>
          <b-col class="training-info detail">
            <p>Geur</p>
            <p>{{ training.scent.name }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="training-info detail">
            <p>Verstopplaats</p>
            <p>{{ training.fieldSearch.hideSpot }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="training-info detail">
            <p>Externe factoren</p>
            <p>{{ training.fieldSearch.externalFactors }}</p>
          </b-col>
        </b-row>
      </div>

      <div class="wrapper-stats">
        <h3>Statistieken</h3>
        <b-row>
          <b-col class="training-info">
            <p>Stressniveau</p>
            <b-progress
              :value="training.stressScale"
              :max="scale"
              show-value
              class="w-100 mb-2"
              height="25px"
              striped
              :variant="getVariantForScale(training.stressScale)"
            ></b-progress>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="training-info">
            <p>Succesniveau</p>
            <b-progress
              :value="training.successScale"
              :max="scale"
              show-value
              class="w-100 mb-2"
              height="25px"
              striped
              :variant="getVariantForScale(training.successScale)"
            ></b-progress>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="training-info">
            <p>Enthousiasme</p>
            <b-progress
              :value="training.excitementScale"
              :max="scale"
              show-value
              class="w-100 mb-2"
              height="25px"
              striped
              :variant="getVariantForScale(training.excitementScale)"
            ></b-progress>
          </b-col>
        </b-row>
      </div>

      <div class="wrapper-comments">
        <b-card bg-variant="light" header="Commentaar" class="text-center">
          <b-card-text>
            {{ training.comment }}
          </b-card-text>
        </b-card>
      </div>

      <b-button id="btn-edit-training" variant="outline-secondary"
        >Training aanpassen</b-button
      >
    </div>
    <div v-else class="wrapper-error">
      <p>De details van de training konden niet worden opgevraagd, probeer opnieuw ...</p>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: "authenticated",
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      trainingId: this.$route.params.id,
      scale: 5
    };
  },
  computed: {
    training() {
      return this.$store.state.training.training;
    },
    trainingType() {
      return this.training.type.name === "FIELD_SEARCH"
        ? "Field Search"
        : this.training.type.name;
    },
    trainingDate() {
      return this.training.date.split("T")[0];
    }
  },
  methods: {
    ...mapActions({
      getTraining: "training/getTraining"
    }),
    getVariantForScale(valueOnScale) {
      let variant = "succes";

      if (valueOnScale == 0 || valueOnScale == 1) variant = "danger";
      else if (valueOnScale == 2 || valueOnScale == 3) variant = "warning";

      return variant;
    }
  },
  async mounted() {
    await this.getTraining(this.trainingId);
  }
};
</script>

<style lang="scss" scoped>
.wrapper-training {
  display: flex;
  flex-flow: column nowrap;

  h2 {
    margin: 3rem 0 1.5rem 0;
  }

  .wrapper-content {
    .training-info {
      margin: 0 0 1rem 0;

      p {
        margin: 0;
        padding: 0;
        font-size: 17px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.678);

        &:first-of-type {
          font-weight: 500;
          font-size: 16px;
          color: gray;
        }
      }

      &.detail {
        p:last-of-type {
          line-height: 15px;
        }
      }
    }

    .wrapper-stats {
      margin: 1rem 0 1rem 0;
    }

    .wrapper-comments {
      margin: 1rem 0 2rem 0;
    }

    #btn-edit-training {
      margin: 0 0 2rem 0;
    }
  }
}
</style>
