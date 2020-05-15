<template>
  <div id="app" v-if="loggedIn" key="app">
    <horizontal-nav :is-dashboard="isDashboard" @menuWasToggled="menuToggled = !menuToggled"></horizontal-nav>
    <main>
      <top-bar :pagetitle="pageTitle" :menuToggled="menuToggled"></top-bar>
      <vertical-menu :is-dashboard="isDashboard"></vertical-menu>
      <div id="content" class="column">
        <router-view></router-view>
      </div>
    </main>
  </div>
  <div id="app" v-else>
    <main>
      <log-in></log-in>
    </main>
  </div>
</template>

<script>
import HorizontalNav from "./components/HorizontalNav.vue";
import VerticalMenu from "./components/VerticalMenu.vue";
import TopBar from "./components/TopBar.vue";
import LogIn from "./components/LogIn.vue";

import { mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      menuToggled: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isLoggedIn'
    }),
    ...mapState({
      pageTitle: state => state.session.pageTitle
    }),
    isDashboard () {
      return (this.$route.path == '/') ? true : false;
    }
  },
  components: {
    HorizontalNav,
    VerticalMenu,
    TopBar,
    LogIn
  }
};
</script>

<style lang="scss">
// --- Reset ---
* {
  transition: all 0.5s ease-in-out;
}

html, body {
  min-height: 100% !important;
  height: 100%;
  overflow: auto;
}

html {
  overflow: scroll;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  background-color: $backgroundColorSecondary;

  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $backgroundColorPrimary;
    outline: 1px solid $borderColor;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
}

// --- App styles ---
#app {
  margin: 0;
  padding: 0;
  font-family: $primaryFont;
  color: $primaryFontColor;
  height: 100%;

  main {
    display: flex;
    flex-flow: row nowrap;
    min-height: 100%;

    #content {
      display: flex;
      flex-flow: column nowrap;
      min-height: 100%;
      margin-top: 7.154375rem;
      padding: 0;

      @include from($desktop) {
        border-top: none;
        margin-top: 3.779375rem;
      }
    }
  }
}
</style>
