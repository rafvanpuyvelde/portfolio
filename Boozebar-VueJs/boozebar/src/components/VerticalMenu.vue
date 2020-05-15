<template>
  <div
    id="menu"
    class="is-hidden-touch menu"
    :class="{ 'extended-menu': showExtendedNav }"
    @mouseenter="showExtendedNav = true"
    @mouseleave="showExtendedNav = false"
  >
    <ul v-if="!showExtendedNav" key="menu-normal">
      <router-link tag="li" to="/" exact id="menu-vertical-logo"
        ><a href="#">BB</a></router-link
      >
      <router-link
        tag="li"
        to="/dashboard"
        id="first-menu-item"
        :class="{ active: isDashboard }"
        ><a href="#"><i class="fas fa-tachometer-alt fa-2x"></i></a
      ></router-link>
      <router-link tag="li" to="/order"
        ><a href="#"><i class="fas fa-tasks fa-2x"></i></a
      ></router-link>
      <router-link tag="li" to="/custom-mix"
        ><a href="#"><i class="fas fa-cocktail fa-2x"></i></a
      ></router-link>
      <router-link tag="li" to="/popular"
        ><a href="#"><i class="far fa-star fa-2x"></i></a
      ></router-link>
      <router-link tag="li" to="/help"
        ><a href="#"><i class="fas fa-question-circle fa-2x"></i></a
      ></router-link>
    </ul>
    <ul v-else key="menu-extended">
      <router-link tag="li" to="/" exact id="menu-vertical-logo"
        ><a href="#">BOOZEBAR</a></router-link
      >
      <router-link
        tag="li"
        to="/dashboard"
        id="first-menu-item"
        :class="{ active: isDashboard }"
        ><a href="#"
          ><i class="fas fa-tachometer-alt fa-2x"></i>
          <p>Dashboard</p></a
        ></router-link
      >
      <router-link tag="li" to="/order"
        ><a href="#"
          ><i class="fas fa-tasks fa-2x"></i>
          <p>Order</p></a
        ></router-link
      >
      <router-link tag="li" to="/custom-mix"
        ><a href="#"
          ><i class="fas fa-cocktail fa-2x"></i>
          <p>Mix drink</p></a
        ></router-link
      >
      <router-link tag="li" to="/popular"
        ><a href="#"
          ><i class="far fa-star fa-2x"></i>
          <p>Popular</p></a
        ></router-link
      >
      <router-link tag="li" to="/help"
        ><a href="#"
          ><i class="fas fa-question-circle fa-2x"></i>
          <p>Help</p></a
        ></router-link
      >
    </ul>
  </div>
</template>

<script>
export default {
  props: ["isDashboard"],
  data() {
    return {
      showExtendedNav: false
    };
  }
};
</script>

<style lang="scss" scoped>
#menu {
  min-width: 4.5rem;
  min-height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
}

#menu,
.extended-menu {
  background-color: $backgroundColorPrimary;
  border-right: 1px solid $borderColor;

  ul {
    text-align: center;
    font-family: $primaryFont;

    #menu-vertical-logo {
      border-bottom: 1px solid $borderColor;

      a {
        display: block;
        text-align: center;
        padding: 1rem 0 1rem 0;
        color: $secondaryColor;
        font-family: $primaryFont;
        font-weight: 900;
        font-size: 1.2rem;

        &:hover {
          color: $primaryFontColor;
        }
      }
    }

    #first-menu-item {
      margin-top: 4rem;
    }

    li:not(:first-of-type) {
      margin: 0 auto 2rem auto;
      padding: 0.7rem 0 0.7rem 0;

      i {
        color: $secondaryColor;
        font-size: 20px;
      }

      &.active,
      &.router-link-exact-active,
      &:hover {
        border-right: 2px solid $primaryColor;
        i,
        p {
          color: $primaryColor;
        }
      }
    }
  }
}

#menu.extended-menu {
  max-width: 20rem;

  li {
    a {
      padding-left: 1rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: baseline;

      p {
        margin-left: 1rem;
        margin-right: 1rem;
        color: $secondaryColor;
      }
    }

    &.active {
      a {
        p {
          color: $primaryColor;
        }
      }
    }
  }
}
</style>
