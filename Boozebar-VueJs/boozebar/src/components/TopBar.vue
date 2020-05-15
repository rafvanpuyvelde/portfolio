<template>
  <div class="wrapper" :style="position">
    <ul>
      <li>
        <h1 class="title is-size-4-mobile">{{ pagetitle }}</h1>
      </li>
      <li>
        <div id="wrapper-status">
          <i id="notification" class="far fa-bell" @click="showNotifications"></i>
          <div class="dropdown is-right is-active">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click="dropdownActive = !dropdownActive"
              >
                <i
                  id="status-boozebar"
                  class="fas fa-circle"
                  :style="{ color: statusColor }"
                ></i>
                <span id="status-boozebar-text" v-if="dropdownActive"
                  >{{ status | capitalize }} <span> -</span></span
                >
                <span>{{ user }}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div
              class="dropdown-menu"
              id="dropdown-menu"
              role="menu"
              v-if="dropdownActive"
            >
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  Status
                </a>
                <a href="#" class="dropdown-item is-active">
                  Log Out
                </a>
                <hr class="dropdown-divider" v-if="isAdmin" />
                <a href="#" class="dropdown-item" v-if="isAdmin">
                  Admin Panel
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState} from 'vuex';

export default {
  props: {
    pagetitle: String,
    menuToggled: Boolean
  },
  data() {
    return {
      dropdownActive: false,
    };
  },
  methods: {
    showNotifications() {
      this.$store.commit('toggleNotifications');
    }
  },
  computed: {
    ...mapState({
      user: state => state.session.user,
      isAdmin: state => state.isAdmin,
      status: state => state.session.status
    }),
    position() {
      return this.menuToggled ? "display: none;" : "display: initial;";
    },
    statusColor() {
      let color = undefined;

      if (this.status == "online") color = "#29CC97";
      else if (this.status == "busy") color = "#FEC400";
      else if (this.status == "offline") color = "#19233B";
      else color = "#E91E63";

      return color;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  border-bottom: 1px solid $borderColor;
  background-color: $backgroundColorPrimary;
  position: fixed;
  top: 0;
  z-index: 1;
  min-width: 100%;
  margin-top: 3.3125rem;

  @include from($desktop) {
    margin-top: 0;
    min-width: calc(100% - 4.5rem);
    margin-left: 4.5rem;
  }

  h1 {
    margin-right: 1rem;
    min-width: 6.25rem;

    @include from($desktop) {
      min-width: initial;
    }
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    min-width: 100%;
    min-height: 3.78rem;

    li {
      padding: 0.705rem 0 0.705rem 0;
      #wrapper-status {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        #notification {
          margin-right: 1rem;
          &:hover {
            color: $primaryColor;
          }
        }

        .dropdown {
          padding-left: 1rem;
          border-left: 1px solid $borderColor;
        }
      }
    }

    .dropdown {
      margin-right: 1rem;
      font-family: $primaryFont;
      color: $primaryFontColor;

      .dropdown-trigger {
        span {
          font-family: $primaryFont;
          color: $primaryFontColor;
        }

        #status-boozebar {
          font-size: 0.7rem;
          margin-right: 0.5rem;
        }

        #status-boozebar-text {
          margin-right: 0.3rem;
          font-weight: 600;

          span {
            font-weight: 400;
          }
        }
      }

      .is-active {
        background-color: $primaryColor;
      }
    }

    .title {
      margin-bottom: 0;
      padding-left: 0.7rem;
      font-family: $primaryFont;
      color: $primaryFontColor;
      font-weight: 100;

      @include from($desktop) {
        padding-left: 3rem;
      }
    }
  }
}
</style>
