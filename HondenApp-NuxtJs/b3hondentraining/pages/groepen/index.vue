<template>
  <b-container class="wrapper-groups">
    <h1>Mijn groepen</h1>

    <div v-if="groups && groups.length" class="wrapper-table"></div>

    <div v-if="!createGroupActive">
      <div class="wrapper-table">
        <div class="wrapper-group-info">
          <ul v-if="groups && groups.length">
            <li v-for="group in groups" :key="group.id">
              <nuxt-link class="btnGroupDetails" :to="`groepen/${group.id}`">
                <div class="info group-primary">
                  <p class="info-label">Groepsnaam</p>
                  <p>{{ group.name }}</p>
                </div>

                <div class="info group-trainer">
                  <p class="info-label">Trainer</p>
                  <p>
                    {{
                      group.trainer.firstName +
                        ' "' +
                        group.trainer.username +
                        '" ' +
                        group.trainer.lastName
                    }}
                  </p>
                </div>
              </nuxt-link>
            </li>
          </ul>
          <p v-else>
            Er zijn nog geen groepen, voeg eentje toe om te beginnen ...
          </p>
        </div>
      </div>
    </div>

    <div v-if="!createGroupActive" class="wrapper-add-group">
      <b-button
        id="btn-add-group"
        @click="createGroupActive = !createGroupActive"
        variant="outline-primary"
      >
        Groep toevoegen
      </b-button>
    </div>

    <div v-else>
      <create-group-form
        @toggleForm="createGroupActive = !createGroupActive"
      ></create-group-form>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

import CreateGroupForm from "@/components/forms/CreateGroupForm.vue";

export default {
  middleware: "authenticated",
  data() {
    return {
      createGroupActive: false,
      userRole: null
    };
  },
  computed: {
    groups() {
      return this.$store.state.group.userGroups;
    }
  },
  methods: {
    ...mapActions({
      getUserGroups: "group/getUserGroups"
    })
  },
  components: {
    CreateGroupForm
  },
  async mounted() {
    await this.getUserGroups(this.$store.state.auth.id);
    this.userRole = this.$store.state.auth.roleId;
  }
};
</script>

<style lang="scss" scoped>
.wrapper-groups {
  display: flex;
  flex-flow: column nowrap;

  margin-top: 3.5rem;

  h1 {
    margin: 0 0 2.5rem 0;
  }

  .wrapper-group-info {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: flex;
        background-color: #ffffff;
        padding: 30px;
        margin-bottom: 20px;
        box-shadow: $primary-shadow;

        :hover {
          text-decoration: none;
        }

        a {
          display: flex;
          flex-flow: row;
          color: black;
          width: 100%;

          .info {
            display: flex;
            flex-flow: column;
            margin: 0 1.5rem 0.3rem 1rem;

            @media (min-width: 1440px) {
              margin-bottom: 0;
            }

            p {
              margin: 0;
              padding: 0 1rem 0 0;

              &.info-label {
                font-weight: 500;
              }
            }
          }

          .group-primary {
            flex: 1 1 auto;
          }

          .group-trainer {
            text-align: right;
          }
        }
      }
    }
  }

  .wrapper-add-group {
    #btn-add-group {
      margin: 1.5rem 0 3rem 0;
    }
  }
}
</style>
