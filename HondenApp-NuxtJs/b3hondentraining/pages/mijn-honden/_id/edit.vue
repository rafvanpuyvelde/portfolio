<template>
  <b-container class="wrapper-edit-dog">
    <edit-dog-form :id="id"></edit-dog-form>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

import EditDogForm from "@/components/forms/EditDogForm.vue";

export default {
  middleware: "authenticated",
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      id: parseInt(this.$route.params.id)
    };
  },
  components: {
    EditDogForm
  },
  computed: {
    dog() {
      return this.$store.state.dog.dog;
    }
  },
  methods: {
    ...mapActions({
      getDog: "dog/getDog"
    })
  },
  async mounted() {
    await this.getDog(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped></style>
