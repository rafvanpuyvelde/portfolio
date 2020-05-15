<template>
  <b-container class="wrapper-edit-group">
    <edit-group-form :id="id"></edit-group-form>
  </b-container>
</template>

<script>
  import { mapActions } from "vuex";

  import EditGroupForm from "@/components/forms/EditGroupForm.vue";

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
      EditGroupForm
    },
    computed: {
      group() {
        return this.$store.state.group.groupDetails;
      }
    },
    methods: {
      ...mapActions({
        getGroupDetails: "group/getGroupDetails"
      })
    },
    async mounted() {
      await this.getGroupDetails(this.$route.params.id);
    }
  };
</script>

<style lang="scss" scoped></style>
