<template>
  <div id="wrapper-login">
    <h1 class="title">BoozeBar</h1>

    <form action="#">
      <div id="field-username" class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Username"
            v-model="user.username"
            @keyup.enter="login"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>

      <div id="field-password" class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="password"
            placeholder="Password"
            v-model="user.password"
            @keyup.enter="login"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>

      <div id="field-id" class="field">
        <label class="label">BoozeBar ID</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="ID"
            v-model="user.boozebarId"
            @keyup.enter="login"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-cocktail"></i>
          </span>
        </div>
      </div>

      <a id="btn-login" class="button is-fullwidth" @click="login">Log In</a>
    </form>

    <div class="notification-custom" :style="notificationStyle">
      <p v-if="hasApiError">
        <span class="icon"><i class="fas fa-exclamation-triangle"></i></span
        >Failed to connect to API
      </p>
      <p v-else-if="hasTriedToLogin">
        <span class="icon"><i class="far fa-times-circle"></i></span>Wrong
        username and/or password
      </p>
      <p v-else-if="isLoggedIn">
        <span class="icon"><i class="fas fa-check"></i></span>Successfully
        logged in
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        boozebarId: ""
      }
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    hasTriedToLogin() {
      return this.$store.getters.hasTriedToLogin;
    },
    hasApiError() {
      return this.$store.getters.hasApiError;
    },
    notificationStyle() {
      if (!this.hasTriedToLogin) return "display: none;";
      else {
        if (this.hasApiError) return "background-color: #E91E63;";
        else if (!this.isLoggedIn) return "background-color: #FFC107;";
        else if (this.isLoggedIn) return "background-color: #4CAF50;";
      }
    }
  },
  methods: {
    login() {
      try {
        this.$store.dispatch("login", {
          user: {
            username: this.user.username,
            password: this.user.password,
            boozebar: this.user.boozebarId
          }
        });
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
#wrapper-login {
  background-color: $backgroundColorPrimary;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-top: -2rem;

  h1 {
    text-align: center;
    font-weight: 300;
    letter-spacing: 5px;
  }

  .control {
    @include from($tablet) {
      min-width: 20.71875rem;
    }
  }

  .notification-custom {
    bottom: 0;
    min-width: 100%;
    position: absolute;
    padding: 1rem 0;
    background-color: #e91e63;

    p {
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
      color: $backgroundColorSecondary;

      i {
        margin-right: 1rem;
      }
    }
  }

  #btn-login {
    margin-top: 3rem;
    &:hover {
      border: none;
      background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
      font-weight: 800;
      color: $backgroundColorSecondary;
    }
  }
}
</style>
