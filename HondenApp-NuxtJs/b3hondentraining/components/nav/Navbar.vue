<template>
  <b-container class="navbar-wrapper" fluid>
    <b-container class="navbar-inner-wrapper">
      <b-navbar sticky toggleable="lg" variant="faded" type="light">
        <b-navbar-brand id="nav-brand" to="/" class="h1"
          >EcoDogs</b-navbar-brand
        >

        <b-navbar-toggle
          id="nav-toggler"
          target="nav-collapse"
        ></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/groepen">Groepen</b-nav-item>
            <b-nav-item to="/trainingen">Trainingen</b-nav-item>
            <b-nav-item to="/mijn-honden">Mijn honden</b-nav-item>
            <b-nav-item to="/mijn-profiel">Mijn profiel</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown id="btn-dropdown-user" right>
              <template id="dropdown-user-content" v-slot:button-content>
                {{ fullname }}
                <font-awesome-icon id="icon-user" :icon="['fas', 'user']" />
              </template>
              <b-dropdown-item to="/mijn-profiel">Mijn profiel</b-dropdown-item>
              <b-dropdown-item @click="logout">Afmelden</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    fullname() {
      return this.$store.getters["user/username"];
    }
  },
  methods: {
    ...mapActions({
      logout: "logout"
    })
  }
};
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  padding: 2rem 0 2rem 0;
  background-color: #ffffff;

  .navbar-inner-wrapper {
    padding: 0;

    #nav-brand {
      padding-top: 10.5px;
    }

    #nav-toggler {
      border: none;
    }

    #nav-collapse {
      .nuxt-link-active {
        font-weight: 500;
        color: #000000;
      }

      #icon-user {
        margin: 0 8px 0 8px;
      }

      #icon-sign-out {
        color: $negative-color;
      }
    }
  }
}
</style>
