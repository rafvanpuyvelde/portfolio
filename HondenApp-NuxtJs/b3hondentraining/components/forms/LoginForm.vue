<template>
  <div class="wrapper-login-form">
    <h1>Login</h1>
    <b-form id="login-form" @submit="onSubmit" @reset="onReset">
      <b-form-group label="Username" label-for="input-username">
        <b-form-input
          id="input-username"
          v-model="form.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password" label-for="input-password">
        <b-form-input
          id="input-password"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button id="btn-submit" type="submit" variant="primary">Login</b-button>
    </b-form>

    <nuxt-link id="btn-register" to="/registreren">Registreren</nuxt-link>
    <div
      v-if="formError"
      id="form-error"
      class="alert alert-danger"
      role="alert"
    >
      {{ formError }}
    </div>
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
        password: ""
      },
      formError: ""
    };
  },
  methods: {
    ...mapActions({
      login: "login"
    }),
    async onSubmit(evt) {
      evt.preventDefault();

      try {
        await this.login(this.form)
          .then(token => {
            if (this.$store.state.auth.token) {
              Cookie.set("auth", this.$store.state.auth);
              this.$router.push("/");
            }
          })
          .catch(err => {
            this.formError = "Verkeerde email en/of wachtwoord ...";
          });
      } catch (ex) {}
    },
    onReset(evt) {
      evt.preventDefault();
      this.resetFormValues();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-login-form {
  h1 {
    margin: 0 auto 1.5rem auto;
    text-align: center;
  }

  #login-form {
    #btn-submit {
      min-width: 100%;
      margin-top: 3rem;
    }
  }

  #btn-register {
    margin-top: 1.5rem;
    display: block;
    text-align: center;
  }

  #form-error {
    margin-top: 5rem;
  }
}
</style>
