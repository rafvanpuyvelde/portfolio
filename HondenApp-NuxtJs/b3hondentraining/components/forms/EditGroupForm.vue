<template>
  <b-form class="edit-group-form" @submit="onSubmit" @reset="onReset">
    <b-form-group label="Naam" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="form.name"
        required
        placeholder="De naam van uw groep"
      ></b-form-input>
    </b-form-group>

    <li class="list-group-item">
      <p class="font-weight-bold">Leden</p>
      <ul id="list-users" v-if="group.users.length > 0">
        <li v-for="member in group.users" :key="member.id">
          {{ member.firstName + " \"" + member.username + "\" " + member.lastName }}
        </li>
      </ul>
      <p v-else>Deze groep heeft nog geen leden ...</p>
    </li>

    <b-form-group label="Nieuw lid toevoegen" label-for="input-with-list">
      <b-form-input list="input-list" id="input-with-list"></b-form-input>
      <b-form-datalist id="input-list" :options="allUsers"></b-form-datalist>
      {{ allUsers }}
    </b-form-group>

    <div class="wrapper-submit">
      <b-button
        id="btn-submit"
        @click="editGroup(form)"
        type="submit"
        variant="outline-primary"
      >Opslaan</b-button
      >
      <nuxt-link
        :to="`/groepen/${id}`"
        class="font-weight-light text-muted back-to-overview"
      >Terug naar overzicht</nuxt-link
      >
    </div>
  </b-form>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    middleware: "authenticated",
    props: {
      id: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        form: {
          name: "",
          trainer: {
            id: null
          },
          users: [
            null
          ]
        },
        allUsers: [
          null
        ]
      };
    },
    computed: {
      group() {
        return this.$store.state.group.groupDetails;
      },
      users() {
        return this.$store.state.group.allUsers;
      }
    },
    methods: {
      ...mapActions({
        getGroupDetails: "group/getGroupDetails",
        editGroup: "group/editGroup",
        getAllUsers: "group/getAllUsers"
      }),
      onReset(evt) {
        evt.preventDefault();
        this.resetFormValues();
      },
      onSubmit(evt) {
        evt.preventDefault();
      }
    },
    async mounted() {
      await this.getGroupDetails(this.id).then(res => {
        this.form = { ... this.group };
      });
      await this.getAllUsers().then(res => {
        this.allUsers = { ... this.users };
      });
    }
  };
</script>

<style lang="scss" scoped>
  .edit-group-form {
    margin: 2rem 0 2rem 0;

    .wrapper-submit {
      width: 100%;

      #btn-submit {
        margin-top: 1rem;
        max-width: 200px;
      }

      .back-to-overview {
        margin-top: 1rem;
        float: right;
      }
    }
  }
</style>
