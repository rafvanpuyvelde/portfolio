<template>
  <b-container class="wrapper-profile">
    <div v-if="user" class="wrapper-profile-details">
      <b-img
        id="img-profile-picture"
        :src="profilepicture"
        rounded="circle"
        alt="Profiel afbeelding"
      ></b-img>

      <h1 id="profile-name">{{ user.firstName }} {{ user.lastName }}</h1>
      <p id="profile-role">{{ user.role.name }}</p>

      <div class="wrapper-contact-info">
        <p>
          <font-awesome-icon class="icon-contact-info" icon="at" />
          {{ user.email }}
        </p>
      </div>

      <b-row class="wrapper-controls">
        <b-col>
          <nuxt-link to="/mijn-profiel/edit" class="button-control">
            <font-awesome-layers class="fa-2x">
              <font-awesome-icon class="icon-controls-outer" icon="circle" />
              <font-awesome-icon
                class="icon-controls-inner"
                transform="shrink-10"
                :icon="['fas', 'edit']"
              />
            </font-awesome-layers>
          </nuxt-link>
        </b-col>

        <b-col>
          <a href="" @click="deleteUser" class="button-control">
            <font-awesome-layers class="fa-2x">
              <font-awesome-icon class="icon-controls-outer" icon="circle" />
              <font-awesome-icon
                id="icon-controls-delete"
                class="icon-controls-inner"
                transform="shrink-10"
                :icon="['fas', 'trash-alt']"
              />
            </font-awesome-layers>
          </a>
        </b-col>
      </b-row>
    </div>
    <div v-else class="wrapper-no-profile">
      <b-alert show variant="danger"
        >Kan gebruikersinfo niet opvragen, probeer opnieuw</b-alert
      >
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticated",
  data() {
    return {
      profilepicture: "https://via.placeholder.com/150"
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    ...mapActions({
      getUser: "user/getUser",
      delUser: "user/deleteUser"
    }),
    deleteUser() {
      //let { id } = JSON.parse(this.$store.state.auth);

      this.delUser(this.$store.state.auth.id);
      Cookie.remove("auth");
      this.$router.push("/");
      console.log("Deleted user ...");
    }
  },
  async mounted() {
    //let { id } = JSON.parse(this.$store.state.auth);
    await this.getUser(this.$store.state.auth.id);
  }
};
</script>

<style lang="scss" scoped>
$viewport-tablet: 768px;

.wrapper-profile {
  .wrapper-profile-details {
    flex: 1 1 auto;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    //margin-top: 10rem;

    @media (max-width: $viewport-tablet) {
      //margin-top: 5rem;
    }

    #img-profile-picture {
      width: 90px;
      height: 90px;
      object-fit: cover;
      box-shadow: $primary-shadow;

      @media (min-width: $viewport-tablet) {
        width: 120px;
        height: 120px;
      }
    }

    #profile-name {
      margin: 1rem 0 0 0;
      font-size: 30px;
      font-weight: 500;
    }

    #profile-role {
      font-size: 20px;
      font-weight: 400;
      color: hsl(214, 7%, 47%);
    }

    .wrapper-contact-info {
      margin: 1rem 0 1rem 0;
      text-align: center;

      p {
        .icon-contact-info {
          margin-right: 10px;
        }
        margin: 10px 0 10px 0;
      }
    }

    .wrapper-controls {
      font-size: 24px;
      margin-top: 2rem;

      .button-control {
        display: block;
        &:hover {
          transform: scale(1.1);
        }
      }

      .icon-controls-outer {
        color: #ffffff;
        filter: drop-shadow($primary-shadow);
      }

      .icon-controls-inner {
        color: #37e8ba;
      }

      #icon-controls-delete {
        color: #fd4473;
      }
    }
  }

  .wrapper-no-profile {
    margin-top: 2rem;
  }
}
</style>
