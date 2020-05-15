<template>
  <div class="wrapper-register-form">
    <h1>Registreren</h1>
    <b-form id="register-form" @submit="onSubmit" @reset="onReset">
      <b-form-group label="Voornaam" label-for="input-firstname">
        <b-form-input
          id="input-firstname"
          v-model="form.firstName"
          required
          placeholder="Uw voornaam"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Achternaam" label-for="input-lastname">
        <b-form-input
          id="input-lastname"
          v-model="form.lastName"
          required
          placeholder="Uw achternaam"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Gebruikersnaam" label-for="input-username">
        <b-form-input
          id="input-username"
          v-model="form.username"
          required
          placeholder="Uw gebruikersnaam"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="E-mailadres" label-for="input-email">
        <b-form-input
          id="input-email"
          type="email"
          v-model="form.email"
          required
          placeholder="Uw e-mailadres"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Wachtwoord" label-for="input-password">
        <b-form-input
          id="input-password"
          type="password"
          v-model="form.password"
          required
          placeholder="Uw wachtwoord"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Rol" label-for="input-rol">
        <b-form-select id="input-rol" v-model="form.roleId">
          <option
            v-for="(role, key) in roles"
            :key="key"
            :value="key"
            type="string"
            >{{ role }}
          </option>
        </b-form-select>
      </b-form-group>

      <b-button
        id="btn-submit"
        @click="registerUser(form)"
        type="submit"
        variant="outline-primary"
      >
        Registreren
      </b-button>
    </b-form>

    <nuxt-link id="btn-login" to="/login">Login</nuxt-link>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        lastName: "",
        firstName: "",
        roleId: 1
      }
    };
  },
  computed: {
    roles() {
      return this.$store.state.user.roles;
    }
  },
  methods: {
    ...mapActions({
      register: "user/createUser"
    }),
    registerUser() {
      this.register(this.form).then(response => {
        Cookie.set("auth", this.$store.state.auth);
        this.$router.push("/");
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      this.resetFormValues();
    },
    resetFormValues() {
      Object.assign(this.form, this.$options.data.form.call(this));
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-register-form {
  padding: 3rem 0;

  h1 {
    margin: 0 auto 1.5rem auto;
    text-align: center;
  }

  #register-form {
    #btn-submit {
      min-width: 100%;
      margin-top: 3rem;
    }
  }

  #btn-login {
    margin-top: 1.5rem;
    display: block;
    text-align: center;
  }
}
</style>
