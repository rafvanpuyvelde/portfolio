<template>
  <nuxt-link
    :to="tileUrl"
    class="wrapper-tile"
    @mouseover.native="MouseOver"
    @mouseleave.native="MouseLeave"
    :class="{
      focused: focusedElement === elementName,
      unfocused: focusedElement !== elementName && focusedElement !== null,
      noFocus: focusedElement === null
    }"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ""
    },
    elementName: {
      type: String,
      default: ""
    },
    focusedElement: {
      type: String,
      default: ""
    }
  },
  methods: {
    MouseOver() {
      this.$emit("setFocusedElement", this.elementName);
    },
    MouseLeave() {
      this.$emit("setFocusedElement", null);
    }
  },
  computed: {
    tileUrl() {
      return `/${this.to}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-tile {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  padding: 3rem 0 3rem 0;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  font-size: 18px;

  &:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }

  &.noFocus,
  &.focused {
    background: rgba(255, 255, 255, 1);
  }

  &.unfocused {
    background: rgba(255, 255, 255, 0.2);
    color: rgba(41, 40, 40, 0.6);
    transition: color cubic-bezier(0.075, 0.82, 0.165, 1) 1.2s;
  }
}
</style>
