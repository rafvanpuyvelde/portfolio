<template>
  <b-container class="wrapper-dog-detail">
    <h1>Details hond</h1>
    <div v-if="dog" class="card wrapper-details">
      <div class="card-body">
        <h5 v-if="dog.name" class="card-title">{{ dogName(dog.name) }}</h5>
        <p class="card-text">
          {{ dog.breed }}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li v-if="dog.user" class="list-group-item">
          Trainer {{ dog.user.username }}
        </li>
        <li class="list-group-item">Verjaardag {{ dog.birthday }}</li>
        <li class="list-group-item">
          <p class="font-weight-bold">Geuren</p>
          <ul id="list-scents" v-if="dog.scents.length > 0">
            <li v-for="scent in dog.scents" :key="scent.id">
              {{ scent.name }}
            </li>
          </ul>
          <p v-else>Geen geuren gevonden ...</p>
        </li>
        <li class="list-group-item">
          <p class="font-weight-bold">Trainingen</p>
          <ul
            id="list-trainings"
            v-if="dog.trainings.length > 0"
            class="list-group"
          >
            <li
              v-for="training in dog.trainings"
              :key="training.id"
              class="list-group-item training"
            >
              <p>{{ training.type.name }}</p>
              <p>{{ training.place }}</p>
              <p v-if="training.date">{{ training.date }}</p>
              <p>Opwinding {{ training.excitementScale }}</p>
              <p>Stress {{ training.stressScale }}</p>
              <p>Succes {{ training.successScale }}</p>
            </li>
          </ul>
          <p v-else>Geen trainingen gevonden ...</p>
        </li>
      </ul>
      <div class="card-body wrapper-controls">
        <nuxt-link :to="`${dog.id}/edit`">Aanpassen</nuxt-link>
        <b-button
          id="btn-delete-dog"
          @click="deleteDog"
          variant="outline-danger"
          >Hond verwijderen</b-button
        >
      </div>
    </div>
    <div v-else class="wrapper-no-dog">
      <b-alert show variant="danger"
        >Kan hondinfo niet opvragen, probeer opnieuw</b-alert
      >
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
      id: this.$route.params.id
    };
  },
  computed: {
    dog() {
      return this.$store.state.dog.dog;
    }
  },
  methods: {
    ...mapActions({
      getDog: "dog/getDog",
      deleteDogWithId: "dog/deleteDog"
    }),
    deleteDog() {
      this.deleteDogWithId(this.dog.id);
      this.$router.push("/mijn-honden");
    },
    dogName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  async mounted() {
    await this.getDog(this.id);
  }
};
</script>

<style lang="scss" scoped>
.wrapper-dog-detail {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  h1 {
    margin: 3rem 0 2rem 0;
  }

  .wrapper-details {
    margin-bottom: 3rem;

    .training {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;

      p {
        min-width: 20%;
      }
    }

    .wrapper-controls {
      #btn-delete-dog {
        margin-left: 1rem;
      }
    }

    #list-trainings {
      list-style: circle;

      li {
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
