<template>
  <div
    class="wrapper-ingredient"
    @click="ingredientClicked(ingredient)"
    :style="gradient"
  >
    <p>{{ ingredient.Name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: Object,
    ingredientClicked: Function
  },
  computed: {
    gradient() {
      return (
        "background-image: linear-gradient(to right, rgba(255,255,255,.25) 80%, " +
        this.ingredient.color +
        " 80%)"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-ingredient {
  min-width: 100%;
  padding: 1rem 0;
  border: 1px solid $borderColor;
  background-color: $backgroundColorSecondary;
  text-align: left;
  margin: 1rem 0;

  @include from($desktop) {
    min-width: calc((100% / 3) - 2%);
    margin: 1%;
  }

  p {
    font-weight: 300;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: $primaryFontColor;
    padding-left: 1rem;
  }
}
</style>
