export const defocusOnHover = {
  data() {
    return {
      focusedElement: null
    };
  },
  methods: {
    setFocusedElement(element) {
      this.focusedElement = element;
    }
  }
};
