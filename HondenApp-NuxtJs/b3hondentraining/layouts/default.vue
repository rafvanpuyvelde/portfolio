<template>
  <div class="wrapper-app">
    <navbar></navbar>
    <nuxt id="wrapper-content" />
  </div>
</template>

<script>
import Navbar from "~/components/nav/Navbar.vue";

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>
.wrapper-app {
  min-height: 100%;
  min-width: 320px;
  display: flex;
  flex-flow: column;
  background: linear-gradient(
    to bottom,
    #f5fafc,
    #f8fbfd,
    #fbfcfe,
    #fdfefe,
    #ffffff
  );

  #wrapper-content {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column nowrap;
  }
}
</style>
