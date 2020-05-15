<template>
  <b-container class="wrapper-dogs">
    <h1>Mijn honden</h1>

    <div v-if="!createDogActive">
      <div class="wrapper-table">
        <div class="wrapper-dog-info">
          <ul v-if="dogs">
            <li v-for="dog in dogs" :key="dog.id">
              <div class="info dog-primary">
                <b-img
                  class="img-dog"
                  :src="dogPicture"
                  :alt="dogPictureAlt"
                  rounded="circle"
                ></b-img>
                <div>
                  <p v-if="dog.name">{{ dog.name }}</p>
                  <p v-else>-</p>
                  <p>
                    Verjaardag
                    <span v-if="dog.birthday">{{ dog.birthday }}</span
                    ><span v-else>-</span>
                  </p>
                </div>
              </div>

              <div class="info dog-breed">
                <p class="info-label">Ras</p>
                <p v-if="dog.breed">{{ dog.breed }}</p>
                <p v-else>-</p>
              </div>

              <nuxt-link class="btnDogDetails" :to="`mijn-honden/${dog.id}`">
                Details
              </nuxt-link>
            </li>
          </ul>
          <p v-else>
            Er zijn nog geen honden, voeg eentje toe om te beginnen ...
          </p>
        </div>
      </div>
      <div class="wrapper-add-dog">
        <b-button
          id="btn-add-dog"
          @click="createDogActive = !createDogActive"
          variant="outline-primary"
        >
          Hond toevoegen
        </b-button>
      </div>
    </div>

    <div v-else>
      <create-dog-form @toggleForm="toggleForm"></create-dog-form>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import CreateDogForm from "~/components/forms/CreateDogForm.vue";

export default {
  middleware: "authenticated",
  data() {
    return {
      createDogActive: false,
      dogPicture: "https://via.placeholder.com/150",
      dogPictureAlt: "Afbeelding hond"
    };
  },
  computed: {
    dogs() {
      return this.$store.state.dog.dogs;
    }
  },
  methods: {
    ...mapActions({
      getUserFromStore: "user/getUser",
      getDogs: "dog/getDogs"
    }),
    async getUser() {
      this.getUserFromStore(this.$store.state.auth.id);
    },
    async toggleForm() {
      this.createDogActive = !this.createDogActive;
      await this.getUser();
    }
  },
  components: {
    CreateDogForm
  },
  async mounted() {
    await this.getDogs(this.$store.state.auth.id);
  }
};
</script>

<style lang="scss" scoped>
.wrapper-dogs {
  display: flex;
  flex-flow: column nowrap;

  margin-top: 3.5rem;

  h1 {
    margin: 0 0 2.5rem 0;
  }

  .wrapper-dog-info {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        background-color: #ffffff;
        padding: 30px;
        margin-bottom: 20px;
        box-shadow: $primary-shadow;

        p {
          margin: 0;
          padding: 0;
          padding-right: 1rem;

          &.info-label {
            font-weight: 500;
          }
        }

        .img-dog {
          width: 45px;
          height: 45px;
          object-fit: cover;
          box-shadow: $primary-shadow;
        }

        .info {
          margin-bottom: 1rem;

          @media (min-width: 1440px) {
            margin-bottom: 0;
          }

          &.dog-breed {
            flex: 1 1 auto;
          }
        }

        .dog-primary {
          display: flex;
          flex-flow: row nowrap;
          margin-bottom: 1.2rem;
          min-width: 30%;

          @media (min-width: 1440px) {
            margin-bottom: 0;
          }

          div {
            margin: 0 1.5rem 0 1rem;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: flex-start;
          }

          p {
            &:first-of-type {
              font-weight: 500;
            }

            &:last-of-type {
              font-weight: 400;
            }
          }
        }
      }
    }
  }

  .wrapper-add-dog {
    #btn-add-dog {
      margin: 1.5rem 0 3rem 0;
    }
  }
}
</style>
