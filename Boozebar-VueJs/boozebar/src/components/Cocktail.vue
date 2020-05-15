<template>
  <transition name="fade">
    <div class="wrapper-cocktail" :style="gradient" @click="order">
      <p>{{ cocktail.Name }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    cocktail: Object
  },
  data() {
    return {
      gradients: [
        "background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);",
        "background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);",
        "background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);",
        "background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);",
        "background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);"
      ]
    };
  },
  methods: {
    order() {
      this.$store.commit("addOrder", {
        id: this.cocktail.Id,
        name: this.cocktail.Name
      });

      this.$emit("cocktailWasClicked");
    }
  },
  computed: {
    gradient() {
      const index = Math.floor(Math.random() * this.gradients.length);
      return this.gradients[index];
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wrapper-cocktail {
  text-align: center;
  min-width: 100%;
  padding: 1rem 0 1rem 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
  background-color: $backgroundColorPrimary;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (min-width: 68.125rem) {
    min-width: 30%;
    padding: 5rem 0 5rem 0;
  }

  &:hover {
    border: none;
    box-shadow: 0 4px 12px 0px $shadow-color;
  }
}
</style>
