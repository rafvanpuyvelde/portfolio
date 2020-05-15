<template>
  <b-form class="create-dog-form" @submit="onSubmit" @reset="onReset">
    <b-form-group label="Naam" label-for="input-name">
      <b-form-input
        id="input-name"
        v-model="form.name"
        required
        placeholder="De naam van uw hond"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Ras" label-for="input-breed">
      <b-form-input
        id="input-breed"
        v-model="form.breed"
        required
        placeholder="Het ras van uw hond"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Geboortedatum" label-for="input-birthday">
      <input
        id="input-birthday"
        class="form-control"
        v-model="form.birthday"
        type="date"
      />
    </b-form-group>

    <b-form-group label="Geur" label-for="input-smell">
      <b-form-input
        v-model="selectedScent"
        list="input-list"
        id="input-with-list"
      ></b-form-input>
      <b-form-datalist id="input-list" :options="scents"></b-form-datalist>
    </b-form-group>

    <div class="wrapper-submit">
      <b-button
        id="btn-submit"
        @click="createDog(form)"
        type="submit"
        variant="outline-primary"
        >Hond toevoegen</b-button
      >
      <a class="font-weight-light text-muted" @click="backToOverview"
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
      selectedScent: "",
      form: {
        name: "",
        breed: "",
        birthday: "",
        scents: [
          {
            name: ""
          }
        ],
        user: {
          id: 0
        }
      }
    };
  },
  computed: {
    scents() {
      const scentsFromStore = this.$store.state.scent.scents;
      return scentsFromStore.map(s => s.name);
    }
  },
  methods: {
    ...mapActions({
      getScents: "scent/getScents",
      getUser: "user/getUser",
      addDog: "dog/createDog"
    }),
    createDog() {
      const scentsFromStore = this.$store.state.scent.scents;

      if (scentsFromStore) {
        this.form.scents[0].name = this.selectedScent;
        this.form.user.id = this.$store.state.auth.id;
        this.addDog(this.form);

        this.getUser(this.$store.state.auth.id);

        this.backToOverview();
      }
    },
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
    await this.getScents();
  }
};
</script>

<style lang="scss" scoped>
.create-dog-form {
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
