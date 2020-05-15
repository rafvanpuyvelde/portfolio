<template>
  <b-form class="create-group-form" @submit="onSubmit" @reset="onReset">
    <b-form-group label="Naam" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="form.name"
        required
        placeholder="De naam van uw groep"
      ></b-form-input>
    </b-form-group>

    <div class="wrapper-submit">
      <b-button
        id="btn-submit"
        @click="createGroup(form)"
        type="submit"
        variant="outline-primary"
        >Groep toevoegen</b-button
      >
      <a href="" class="font-weight-light text-muted" @click="backToOverview"
        >Terug naar overzicht</a
      >
    </div>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        trainer: {
          id: null
        }
      }
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      createGroup: "group/createGroup"
    }),
    backToOverview() {
      this.$emit("toggleForm");
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      this.resetFormValues();
    },
    resetFormValues() {
      Object.assign(this.form, this.$options.data.form.call(this));
    }
  },
  async mounted() {
    this.form.trainer.id = this.$store.state.auth.id;
  }
};
</script>

<style lang="scss" scoped>
.create-group-form {
  margin: 2rem 0 2rem 0;

  .wrapper-submit {
    display: flex;
    flex-flow: column nowrap;

    #btn-submit {
      margin-top: 1rem;
      max-width: 200px;
    }

    a {
      margin-top: 1rem;
    }
  }
}
</style>
