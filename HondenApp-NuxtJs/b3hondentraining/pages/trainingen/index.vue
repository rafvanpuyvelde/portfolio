<template>
  <b-container class="wrapper-trainings">
    <h1>Mijn trainingen</h1>

    <div v-if="!createTrainingActive">
      <div v-if="trainings && trainings.length" class="wrapper-table">
        <table>
          <tr>
            <th>INFO</th>
            <th>DATUM</th>
            <th>PLAATS</th>
            <th>TYPE</th>
            <th>SCORE</th>
          </tr>
          <nuxt-link tag="tr" v-for="training in trainings" :key="training.id" :to="`trainingen/${training.id}`">
            <td>
              {{ training.dog.name }}
            </td>
            <td>
              {{ new Date(training.date).toDateString() }}
            </td>
            <td>
              {{ training.place }}
            </td>
            <td>
              {{ training.type.name }}
            </td>
            <td>
              {{ training.successScale }}
            </td>
          </nuxt-link>
        </table>
      </div>

      <div v-else class="wrapper-no-trainings">
        <p>Er zijn nog geen trainingen, voeg eentje toe om te beginnen ...</p>
      </div>
    </div>


    <create-training-form
      v-if="createTrainingActive"
      @toggleForm="createTrainingActive = !createTrainingActive"
    ></create-training-form>

    <div v-if="!createTrainingActive" class="wrapper-add-training">
      <b-button
        id="btn-add-training"
        @click="createTrainingActive = !createTrainingActive"
        variant="outline-primary"
      >
        Training toevoegen
      </b-button>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

import CreateTrainingForm from "@/components/forms/CreateTrainingForm.vue";

export default {
  middleware: "authenticated",
  data() {
    return {
      createTrainingActive: false
    };
  },
  computed: {
    trainings() {
      return this.$store.state.training.userTrainings;
    }
  },
  methods: {
    ...mapActions({
      getUserTrainings: "training/getUserTrainings"
    }),
    ...mapGetters({
      searchDogById: "dog/search"
    })
  },
  components: {
    CreateTrainingForm
  },
  async mounted() {
    await this.getUserTrainings(this.$store.state.auth.id);
  }
};
</script>

<style lang="scss" scoped>
$table-primary-color: #fffdff;
$table-secondary-color: #f5f5fb;

.wrapper-trainings {
  margin-top: 3.5rem;

  h1 {
    margin: 0 0 2.5rem 0;
  }

  .wrapper-table {
    table {
      min-width: 100%;
      border: none;
      box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);

      th {
        background-color: $table-secondary-color;
        padding: 1rem 1.5rem;
        text-align: center;
      }

      tr {
        height: 2rem;

        td {
          padding-left: 0.5rem;
          text-align: center;
        }

        &:hover {
          cursor: pointer;
        }

        &:nth-of-type(even) {
          background-color: $table-primary-color;
        }

        &:nth-of-type(odd) {
          background-color: $table-secondary-color;
        }
      }
    }
  }

  .wrapper-add-training {
    margin: 1.5rem 0 3rem 0;
  }
}
</style>
