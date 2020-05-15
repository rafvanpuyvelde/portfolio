<template>
  <b-container class="wrapper-login">
    <b-row id="row-login" align-v="center">
      <b-col lg="6" md="8" offset-lg="3" offset-md="2">
        <login-form></login-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

import LoginForm from "~/components/forms/LoginForm.vue";

export default {
  middleware: "notAuthenticated",
  layout: "blank",
  components: {
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
.wrapper-login {
  #row-login {
    min-height: 100vh;
  }
}
</style>
