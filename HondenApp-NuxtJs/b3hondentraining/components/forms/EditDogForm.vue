<template>
  <b-form class="edit-dog-form" @submit="onSubmit">
    <div v-if="dog">
      <p class="wrapper-disabled-control">
        Id
        <span>{{ form.id }}</span>
      </p>

      <b-form-group label="Naam" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="form.name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ras" label-for="input-breed">
        <b-form-input
          id="input-breed"
          v-model="form.breed"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Verjaardag" label-for="input-birthday">
        <b-form-input
          id="input-birthday"
          v-model="form.birthday"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-list-group class="wrapper-scents">
        <p class="form-header">Geuren</p>
        <b-list-group-item>
          <b-form-group>
            <b-form-row v-for="scent in form.scents" :key="scent.id">
              <b-col cols="1">
                <b-form-group
                  label="Id"
                  :label-for="`input-scent-id-${scent.id}`"
                >
                  <b-form-input
                    :id="`input-scent-id-${scent.id}`"
                    v-model="scent.id"
                    type="number"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col>
                <b-form-group
                  label="Naam"
                  :label-for="`input-scent-name-${scent.id}`"
                >
                  <b-form-input
                    :id="`input-scent-name-${scent.id}`"
                    v-model="scent.name"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-form-row>
          </b-form-group>
        </b-list-group-item>
      </b-list-group>

      <b-list-group class="wrapper-trainings">
        <p id="header-trainingen" class="form-header">Trainingen</p>
        <b-list-group-item
          class="wrapper-training"
          v-for="training in form.trainings"
          :key="training.id"
        >
          <b-form-row>
            <b-col cols="1">
              <b-form-group
                label="Id"
                :label-for="`input-training-id-${training.id}`"
              >
                <b-form-input
                  :id="`input-training-id-${training.id}`"
                  v-model="training.id"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Datum"
                :label-for="`input-training-date-${training.id}`"
              >
                <b-form-input
                  :id="`input-training-date-${training.id}`"
                  v-model="training.date"
                  type="date"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col cols="1">
              <b-form-group
                label="Id"
                :label-for="`input-type-id-${training.id}`"
              >
                <b-form-input
                  :id="`input-type-id-${training.id}`"
                  v-model="training.type.id"
                  type="number"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Name"
                :label-for="`input-type-name-${training.id}`"
              >
                <b-form-input
                  :id="`input-type-name-${training.id}`"
                  v-model="training.type.name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-form-group
                label="Plaats"
                :label-for="`input-place-${training.id}`"
              >
                <b-form-input
                  :id="`input-place-${training.id}`"
                  v-model="training.place"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Beloning"
                :label-for="`input-reward-${training.id}`"
              >
                <b-form-input
                  :id="`input-reward-${training.id}`"
                  v-model="training.reward"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col>
              <b-form-group
                label="Opwinding"
                :label-for="`input-excitement-${training.id}`"
              >
                <b-form-input
                  v-model="training.excitementScale"
                  type="range"
                  min="0"
                  max="5"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Stress"
                :label-for="`input-stress-${training.id}`"
              >
                <b-form-input
                  v-model="training.stressScale"
                  type="range"
                  min="0"
                  max="5"
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group
                label="Succes"
                :label-for="`input-success-${training.id}`"
              >
                <b-form-input
                  v-model="training.successScale"
                  type="range"
                  min="0"
                  max="5"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-group
            label="Commentaar"
            :label-for="`input-comment-${training.id}`"
          >
            <b-form-textarea
              v-model="training.comment"
              rows="3"
              max-rows="6"
              required
            ></b-form-textarea>
          </b-form-group>
        </b-list-group-item>
      </b-list-group>

      <div class="wrapper-submit">
        <b-button
          id="btn-submit"
          @click="editDog(form)"
          type="submit"
          variant="outline-primary"
          >Opslaan</b-button
        >
        <nuxt-link
          :to="`/mijn-honden/${id}`"
          class="font-weight-light text-muted"
          >Terug naar overzicht</nuxt-link
        >
      </div>
    </div>
    <div v-else>
      <b-alert variant="danger" dismissible>
        Kon details hond niet opvragen
      </b-alert>
    </div>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: "authenticated",
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        id: 0,
        name: "",
        breed: "",
        birthday: "",
        scents: [
          {
            id: 0,
            name: ""
          }
        ],
        trainings: [
          {
            id: 0,
            type: {
              id: 0,
              name: ""
            },
            place: "",
            date: null,
            reward: "",
            excitementScale: 0,
            stressScale: 0,
            successScale: 0,
            comment: ""
          }
        ],
        user: {
          id: 0
        }
      }
    };
  },
  computed: {
    dog() {
      return this.$store.state.dog.dog;
    }
  },
  methods: {
    ...mapActions({
      getDog: "dog/getDog",
      editDog: "dog/editDog"
    }),
    onSubmit(evt) {
      evt.preventDefault();
    }
  },
  async mounted() {
    await this.getDog(this.id).then(res => {
      this.form = this.dog;
    });
  }
};
</script>

<style lang="scss" scoped>
.edit-dog-form {
  margin: 2rem 0 2rem 0;

  .form-header {
    font-weight: 500;
    margin-top: 0rem;

    &#header-trainingen {
      margin-top: 3rem;
    }
  }

  .wrapper-disabled-control {
    display: flex;
    flex-flow: column nowrap;

    span {
      padding-top: 5px;
      font-weight: 200;
    }
  }

  .wrapper-scents {
    margin-top: 3rem;
  }

  .wrapper-trainings {
    .wrapper-training {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }

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
