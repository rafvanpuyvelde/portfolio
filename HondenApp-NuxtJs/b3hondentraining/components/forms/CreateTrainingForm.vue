<template>
  <b-form class="create-training-form" @submit="onSubmit" @reset="onReset">
    <b-form-group label="Hond" label-for="input-hond">
      <b-form-select id="input-hond" v-model="form.dogId">
        <option v-for="dog in dogs" :key="dog.id" :value="dog.id" type="number"
          >{{ dog.name }}
        </option>
      </b-form-select>
    </b-form-group>

    <b-form-group label="Datum" label-for="input-date">
      <b-form-input
        id="input-date"
        v-model="form.date"
        placeholder="De datum &amp; tijdstip van de training"
        type="datetime-local"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Locatie training" label-for="input-place">
      <b-form-input
        id="input-place"
        v-model="form.place"
        placeholder="De locatie van de training"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Geur" label-for="input-smell">
      <b-form-input
        v-model="selectedScent"
        list="input-list"
        id="input-with-list"
      ></b-form-input>
      <b-form-datalist id="input-list" :options="scents"></b-form-datalist>
    </b-form-group>

    <b-form-group label="Beloning" label-for="input-reward">
      <b-form-input
        id="input-reward"
        v-model="form.reward"
        placeholder="De gegeven beloning"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Stressniveau" label-for="input-stress">
      <b-form-input
        id="input-stress"
        v-model="form.stressScale"
        placeholder="Het stressniveau"
        type="range"
        min="0"
        max="5"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Succesniveau" label-for="input-success">
      <b-form-input
        id="input-success"
        v-model="form.succesScale"
        placeholder="Het succesniveau"
        type="range"
        min="0"
        max="5"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Enthousiasme" label-for="input-excitement">
      <b-form-input
        id="input-excitement"
        v-model="form.excitementScale"
        placeholder="Het enthousiasme"
        type="range"
        min="0"
        max="5"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Commentaar" label-for="input-comment">
      <b-form-input
        id="input-comment"
        v-model="form.comment"
        placeholder="Commentaar"
      ></b-form-input>
    </b-form-group>

    <div class="wrapper-submit">
      <b-button
        id="btn-submit"
        @click="createTraining(form)"
        type="submit"
        variant="outline-primary"
        >Training toevoegen</b-button
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
        typeId: 4,
        place: "",
        date: "",
        reward: "",
        excitementScale: 0,
        stressScale: 0,
        successScale: 0,
        comment: "",
        dogId: 0,
        lineups: null,
        fieldSearch: null,
        scentId: 23
      }
    };
  },
  computed: {
    dogs() {
      return this.$store.state.dog.dogs;
    },
    scents() {
      const scentsFromStore = this.$store.state.scent.scents;
      return scentsFromStore.map(s => s.name);
    }
  },
  methods: {
    ...mapActions({
      getScents: "scent/getScents",
      getDogs: "dog/getDogs",
      getUser: "user/getUser",
      createTrainingInStore: "training/createTraining",
      getDogScents: "dog/getDogScents"
    }),
    createTraining() {
      const scentsFromStore = this.$store.state.scent.scents;

      if (scentsFromStore) {
        this.form.scentId = 23;
        this.form.date = null;

        this.createTrainingInStore(this.form);
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
    await this.getDogs(this.$store.state.auth.id);
    await this.getScents();
  }
};
</script>

<style lang="scss" scoped>
.create-training-form {
  margin: 0 0 2rem 0;

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
