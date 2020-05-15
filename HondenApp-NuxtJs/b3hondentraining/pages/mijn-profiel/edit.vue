<template>
  <b-container class="wrapper-edit-profile">
    <h1>Profiel aanpassen</h1>
    <b-form v-if="user" class="edit-profile-form" @submit="onSubmit">
      <div>
        <p class="wrapper-disabled-control">
          Id
          <span>{{ form.id }}</span>
        </p>

        <b-form-group label="Gebruikersnaam" label-for="input-username">
          <b-form-input v-model="form.username" required></b-form-input>
        </b-form-group>

        <b-form-group label="E-mail" label-for="input-email">
          <b-form-input
            v-model="form.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Achternaam" label-for="input-lastname">
          <b-form-input v-model="form.lastName" required></b-form-input>
        </b-form-group>

        <b-form-group label="Voornaam" label-for="input-firstname">
          <b-form-input v-model="form.firstName" required></b-form-input>
        </b-form-group>

        <p class="wrapper-disabled-control">
          Rol
          <span>{{ form.role.name }}</span>
        </p>

        <div class="wrapper-submit">
          <b-button
            id="btn-submit"
            @click="editDog(form)"
            type="submit"
            variant="outline-primary"
            >Opslaan</b-button
          >
          <nuxt-link to="/mijn-profiel" class="font-weight-light text-muted"
            >Terug naar overzicht</nuxt-link
          >
        </div>
      </div>
    </b-form>
    <div v-else class="alert alert-danger" role="alert">
      Kon profiel niet opvragen
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: "authenticated",
  data() {
    return {
      form: {
        id: 0,
        username: "",
        email: "",
        lastName: "",
        firstName: "",
        role: {
          id: 0
        }
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    ...mapActions({
      getUser: "user/getUser"
    }),
    onSubmit(evt) {
      evt.preventDefault();
    }
  },
  async mounted() {
    //let { id } = JSON.parse(this.$store.state.auth);
    await this.getUser(this.$store.state.auth.id).then(() => {
      this.form = { ...this.user };
    });
  }
};
</script>

<style lang="scss" scoped>
.wrapper-edit-profile {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  h1 {
    margin: 3rem 0 2rem 0;
  }

  .wrapper-disabled-control {
    display: flex;
    flex-flow: column nowrap;

    span {
      padding-top: 5px;
      font-weight: 200;
    }
  }

  .wrapper-submit {
    display: flex;
    flex-flow: column nowrap;

    #btn-submit {
      margin-top: 1rem;
      max-width: 200px;
    }

    a {
      margin-top: 1rem;
    }
  }
}
</style>
