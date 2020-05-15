<template>
  <section id="nav" @mouseleave="toggleMenu">
    <nav
      class="navbar is-hidden-desktop"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <h1>BOOZE BAR</h1>
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="toggleMenu"
          :class="{ 'is-active': navShown }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" class="navbar-menu" :class="{ 'is-active': navShown }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/dashboard"
            >Dashboard</router-link
          >
          <router-link class="navbar-item" to="/order">Order</router-link>
          <router-link class="navbar-item" to="/custom-mix"
            >Custom mix</router-link
          >
          <router-link class="navbar-item" to="/popular">Popular</router-link>
          <router-link class="navbar-item" to="/help">Help</router-link>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  props: ["isDashboard"],
  data() {
    return {
      navShown: false
    };
  },
  methods: {
    toggleMenu() {
      this.navShown = !this.navShown;
      this.$emit("menuWasToggled");
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  position: fixed;
  z-index: 1;
  min-width: 100%;

  .navbar-brand {
    background-color: $backgroundColorPrimary;
    border-bottom: 1px solid $borderColor;
    font-family: $primaryFont;
    font-size: 1.5rem;

    h1 {
      color: $primaryFontColor;
      font-family: $primaryFont;
      font-weight: 900;
      margin-right: 3rem;
    }
  }

  .navbar-menu {
    background-color: $backgroundColorPrimary;
    box-shadow: none;
    border-bottom: 1px solid $borderColor;
    position: fixed;
    z-index: 1;
    min-width: 100%;

    a {
      color: $secondaryColor;
      font-family: $primaryFont;

      &.router-link-exact-active,
      &.active,
      &:hover {
        color: $primaryColor;
      }
    }
  }
}
</style>
