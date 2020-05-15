<template>
  <div class="wrapper-dashboard">
    <div class="content">
      <div id="headers">
        <h1 class="title">
          Welcome <span>{{ user }}</span>
        </h1>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <router-link
                class="tile is-child box"
                tag="article"
                to="/custom-mix"
              >
                <div class="wrapper-tile-content">
                  <h2>Mix your own</h2>
                  <p>
                    over
                    <span class="eyecatcher-number has-text-primary"
                      >362880</span
                    >
                    combinations
                  </p>
                </div>
              </router-link>
              <router-link
                class="tile is-child box"
                tag="article"
                to="/edit-drinks"
              >
                <div class="wrapper-tile-content lock">
                  <h2>Edit drinks</h2>
                  <i class="fas fa-lock has-text-danger"></i>
                  <span class="tag is-danger">&ndash; locked &ndash;</span>
                  <p class="has-text-danger is-family-code">Admin only</p>
                </div>
              </router-link>
            </div>
            <div class="tile is-parent">
              <router-link class="tile is-child box" tag="article" to="/order">
                <div id="order-a-drink" class="wrapper-tile-content">
                  <h2>Order a drink</h2>
                  <p>
                    choose between
                    <span class="eyecatcher-number has-text-primary">{{ amountOfCocktails }}</span>
                    unique cocktails
                  </p>
                </div>
              </router-link>
            </div>
          </div>
          <div class="tile is-parent">
            <article id="tile-notification" class="tile is-child box">
              <div class="content">
                <i id="notification" class="far fa-bell"></i>
                <span class="tag is-success is-normal">Info</span>
                <p v-if="latestOrder != null">Successfuly finished order #{{ latestOrder.Id }}<span v-if="elapsedOrderTime != null"> in {{ elapsedOrderTime }}s</span></p>
                <p v-else>Nothing here ...</p>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <div class="content">
              <p class="title">Order list</p>
              <p class="subtitle">An overview</p>
              <div class="content">
                <table class="table is-striped">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="queueItem in queue.slice(0,11)" :key="queueItem.Id">
                      <td>{{ queueItem.Id }}</td>
                      <td class="has-text-success has-text-weight-bold" v-if="queueItem.Status != null">
                        {{ queueItem.Status }}
                      </td>
                      <td class="has-text-info has-text-weight-bold" v-else>
                        queued
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      pagetitle: "dashboard"
    };
  },
  computed: {
    ...mapState({
      user: state => state.session.user,
      queue: state => state.queue,
      amountOfCocktails: state => state.cocktails.length,
      latestOrder: state => state.latestFinishedInQueue
    }),
    elapsedOrderTime() {
      if (this.latestOrder.StopTime != null && this.latestOrder.startTime != null) {
        let stopTime = new Date(0, 0, 0, this.latestOrder.StopTime.split(':')[0], this.latestOrder.StopTime.split(':')[1], this.latestOrder.StopTime.split(':')[2], 0);
        let startTime = new Date(0, 0, 0, this.latestOrder.StartTime.split(':')[0], this.latestOrder.StartTime.split(':')[1], this.latestOrder.StartTime.split(':')[2], 0);
        return (stopTime - startTime) / 1000;
      } return null;
    }
  },
  created() {
    this.$store.commit('setPageTitle', { title: this.pagetitle });
    this.$store.dispatch('fetchQueue');
    this.$store.dispatch('fetchCocktails');
    this.$store.dispatch('fetchLatestFinishedInQueue');
  }
};
</script>

<style lang="scss" scoped>
.wrapper-dashboard {
  margin: 2rem 0;

  @include from($desktop) {
    margin-top: 4rem;
    padding-left: 7.5rem;
    padding-right: 1rem;
  }

  .content {
    display: flex;
    flex-flow: column wrap;

    .tile {
      #tile-notification {
        padding: 0;

        .content {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;

          i {
            font-size: 3rem;
            color: $primaryColor;
            padding: 1rem;
            border-right: 1px solid $borderColor;
          }

          .tag {
            margin: 0 1rem;
          }

          p {
            font-weight: 600;
          }
        }
      }

      article {
        &:hover {
          border: none;
          box-shadow: 0 4px 12px 0px $shadow-color;
          cursor: pointer;
        }
      }

      .wrapper-tile-content {
        min-width: 100%;
        min-height: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;

        h2 {
          margin-bottom: 0;
        }

        span.eyecatcher-number {
          font-weight: 800;
        }

        &#order-a-drink {
          min-height: 500px;
        }

        &.lock {
          i {
            margin: 1rem 0;
            font-size: 2rem;
          }
        }
      }

      .box {
        border-radius: 3px;
        border-color: $borderColor;
      }
    }

    #headers {
      text-align: center;
      margin-bottom: 1.5rem;

      span {
        color: $primaryColor;
      }
    }
  }
}
</style>
