<template>
  <b-container class="wrapper-group-detail">
    <h1>Details Groep</h1>
    <div v-if="group" class="card wrapper-details">
      <div class="card-body">
        <h5 v-if="group.name" class="card-title">{{ capName(group.name) }}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li v-if="group.trainer" class="list-group-item">
          Trainer: {{ group.trainer.firstName + " \"" + group.trainer.username + "\" " + group.trainer.lastName }}
        </li>
        <li class="list-group-item">
          <p class="font-weight-bold">Leden</p>
          <ul id="list-users" v-if="group.users.length > 0">
            <li v-for="member in group.users" :key="member.id">
              {{ member.firstName + " \"" + member.username + "\" " + member.lastName }}
            </li>
          </ul>
          <p v-else>Deze groep heeft nog geen leden ...</p>
        </li>
      </ul>
      <div class="card-body wrapper-controls">
        <nuxt-link :to="`${group.id}/edit`">Aanpassen</nuxt-link>
        <b-button
          id="btn-delete-group"
          @click="deleteGroup"
          variant="outline-danger"
        >Groep verwijderen</b-button
        >
        <nuxt-link
          :to="`/groepen`"
          class="font-weight-light text-muted back-to-overview"
        >Terug naar overzicht</nuxt-link
        >
      </div>
    </div>
    <div v-else class="wrapper-error">
      <p>
        De details van de groepen konden niet worden opgevraagd, probeer opnieuw...
      </p>
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
    group() {
      return this.$store.state.group.groupDetails;
    }
  },
  methods: {
    ...mapActions({
      getGroupDetails: "group/getGroupDetails",
      deleteGroupWithId: "group/deleteGroup"
    }),
    deleteGroup() {
      this.deleteGroupWithId(this.group.id);
      this.$router.push("/groepen");
    },
    capName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  async mounted() {
    await this.getGroupDetails(this.id);
  }
};
</script>

<style lang="scss" scoped>
  .wrapper-group-detail {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    h1 {
      margin: 3rem 0 2rem 0;
    }

    .wrapper-details {
      margin-bottom: 3rem;

      .wrapper-controls {
        width: 100%;

        #btn-delete-dog {
          margin-left: 1rem;
        }

        .back-to-overview {
          float: right;
        }
      }

      #list-users {
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
