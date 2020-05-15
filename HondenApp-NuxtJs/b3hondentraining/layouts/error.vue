<template>
  <b-container class="error-wrapper">
    <div v-if="error.statusCode === 404">
      <h1>Oeps!</h1>
      <h2>Deze pagina bestaat niet ...</h2>
    </div>
    <h1 v-else>Er is iets misgegaan ...</h1>
    <nuxt-link to="/">Terug naar home</nuxt-link>
  </b-container>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blank'
}
</script>

<style lang="scss" scoped>
.error-wrapper {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  h1, h2 {
    text-align: center;
  }
}
</style>