<template>
  <div class="wrapper-order">
    <div class="content">
      <div id="wrapper-cocktails">
        <div id="filter" class="field has-addons">
          <div id="search">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Cocktail name"
                v-model="search"
              />
            </div>
            <div class="control">
              <p id="search-text">Search</p>
            </div>
          </div>
          <label class="checkbox">
            <input type="checkbox" />
            Alcohol free
          </label>
        </div>
        <div id="cocktails">
          <router-link id="custom-drink" tag="div" to="/custom-mix">
            <i class="fas fa-plus"></i>
          </router-link>
          <cocktail
            v-for="cocktail in filteredCocktails"
            :key="cocktail.id"
            :cocktail="cocktail"
            @cocktailWasClicked="showItemAddedStatus"
          ></cocktail>
        </div>
        <div class="is-clipped">
          <ordermodal :visible="showNotifications"></ordermodal>
        </div>
      </div>
      <div id="wrapper-summary-desktop">
        <div id="summary-header">
          <div id="overview-header">
            <h3 class="title">Order overview</h3>
            <transition name="fade">
              <p id="plus-one" v-if="itemRecentlyAdded">+1</p>
            </transition>
          </div>
        </div>
        <div id="summary-content">
          <table class="table is-striped" v-if="orders.length > 0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.name }}</td>
                <td>{{ order.amount }}</td>
                <td class="row-min" @click="decreaseOrderAmount(order)">
                  <i class="fas fa-minus-circle"></i>
                </td>
                <td @click="increaseOrderAmount(order)">
                  <i class="fas fa-plus-circle"></i>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Try clicking on a cocktail</p>
          <div id="wrapper-btn-order" v-if="orders.length > 0" @click="placeOrder">
            <a id="btn-order" class="button is-success is-medium">
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
              <span>Order</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper-summary">
      <div id="summary-header">
        <div id="overview-header">
          <p>Order overview</p>
          <transition name="fade">
            <p id="plus-one" v-if="itemRecentlyAdded">+1</p>
          </transition>
        </div>
        <i
          v-if="!overviewToggled"
          class="fas fa-chevron-up"
          @click="overviewToggled = !overviewToggled"
        ></i>
        <i
          v-else
          class="fas fa-chevron-down"
          @click="overviewToggled = !overviewToggled"
        ></i>
      </div>
      <div id="summary-content" v-if="overviewToggled">
        <table class="table is-striped" v-if="orders.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.name }}</td>
              <td>{{ order.amount }}</td>
              <td class="row-min" @click="decreaseOrderAmount(order)">
                <i class="fas fa-minus-circle"></i>
              </td>
              <td @click="increaseOrderAmount(order)">
                <i class="fas fa-plus-circle"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Try clicking on a cocktail</p>
        <div id="wrapper-btn-order" v-if="orders.length > 0"  @click="placeOrder">
          <a id="btn-order" class="button is-success is-medium">
            <span class="icon is-small">
              <i class="fas fa-check"></i>
            </span>
            <span>Order</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cocktail from "./Cocktail.vue";
import OrderModal from "./OrderModal.vue";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      pagetitle: "order cocktails",
      overviewToggled: false,
      itemRecentlyAdded: false,
      search: ""
    };
  },
  computed: {
    ...mapState({
      cocktails: state => state.cocktails,
      orders: state => state.order,
      orderInfo: state => state.orderInfo,
      showNotifications: state => state.session.notificationsVisible
    }),
    filteredCocktails() {
      if (this.cocktails != null) {
        return this.cocktails.filter(cocktail => {
          return cocktail.Name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },
    successfulOrders() {
      return ['Test', 'test2'];
    },
    unsuccessfulOrders() {
      return ['Test', 'test2'];
    },
  },
  methods: {
    decreaseOrderAmount(order) {
      this.$store.commit("decreaseOrder", {
        id: order.id,
        name: order.name
      });
    },
    increaseOrderAmount(order) {
      this.$store.commit("addOrder", {
        id: order.id,
        name: order.name
      });
    },
    showItemAddedStatus() {
      this.itemRecentlyAdded = true;
      setTimeout(() => {
        this.itemRecentlyAdded = false;
      }, 1000);
    },
    placeOrder() {
      console.log('Data sent ...');
      this.$store.dispatch('placeOrder');
    }
  },
  components: {
    Cocktail,
    'ordermodal': OrderModal
  },
  created() {
    this.$store.commit("setPageTitle", { title: this.pagetitle });
    this.$store.dispatch('fetchCocktails');
  }
};
</script>

<style lang="scss" scoped>
$desktop_custom: 68.125rem;
$widescreen_custom: 79.9375rem;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.wrapper-order {
  min-height: 100%;

  @media screen and (min-width: $desktop_custom) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .content {
    margin: 2rem 1rem 0 1rem;
    border: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    min-height: 100%;

    @include from($desktop) {
      min-width: 100%;
      margin-right: 0;
      padding-left: 7.5rem;
      margin-left: 0;
    }

    @include from($widescreen) {
      min-width: 100%;
      margin-top: 0;
      flex-flow: row nowrap;
    }

    #wrapper-cocktails {
      min-width: 100%;

      @media screen and (min-width: $widescreen) {
        min-width: 65%;
        margin-top: 2rem;
      }

      #filter {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        #search {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          min-width: 13rem;

          .input {
            font-family: $primaryFont;
            z-index: 0;
          }

          #search-text {
            background-color: $primaryColor;
            color: $backgroundColorPrimary;
            padding: 0.355rem 0.3rem 0.355rem 0.3rem;
            border-radius: 0 0.3rem 0.3rem 0;
          }
        }

        .checkbox {
          margin-left: 2rem;
          min-width: 6.25rem;
        }
      }

      #cocktails {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        overflow-y: auto;
        margin-bottom: 4.5rem;

        #custom-drink {
          text-align: center;
          min-width: 100%;
          padding: 1rem 0 1rem 0;
          margin-bottom: 1rem;
          margin-right: 1rem;
          border-radius: 5px;
          border: 3px dashed $borderColor;
          cursor: pointer;

          @media screen and (min-width: $desktop_custom) {
            min-width: 30%;
            padding: 5rem 0 5rem 0;
          }

          i {
            color: $borderColor;
            font-size: 20px;
            color: #999999;
          }
        }

        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track {
          background-color: $borderColor;
          border: 0.5em solid rgba(0, 0, 0, 0);
        }
        &::-webkit-scrollbar-thumb {
          outline: 1px solid $backgroundColorPrimary;
        }
      }
    }

    #wrapper-summary-desktop {
      display: none;
      padding: 1rem 0;

      @media screen and (min-width: $desktop) {
        position: fixed;
        bottom: 0;
        display: initial;
        min-width: 100%;
        background-color: $backgroundColorPrimary;
        padding-left: 3rem;
      }

      @media screen and (min-width: $widescreen_custom) {
        position: static;
        bottom: initial;
        margin: 0;
        padding: 4.5rem;
        min-width: 35%;
        min-height: 100%;
      }
    }

    #notifications {
      min-width: 100%;
      margin: 0;
      margin-top: 1rem;
      max-height: 35rem;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }

  #wrapper-summary {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    color: $backgroundColorPrimary;
    background-color: $primaryFontColor;
    border-top: 1px solid black;
    min-width: 100%;
    position: fixed;
    z-index: 0;
    bottom: 0;

    @include from($desktop) {
      display: none;
    }

    #summary-header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      i {
        padding: 1rem;
        border-left: 1px solid $shadow-color;
        cursor: pointer;
      }

      #overview-header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-left: 1rem;
        margin-right: 6rem;

        p {
          margin-bottom: 0;

          &#plus-one {
            margin-left: 1rem;
            color: $success;
          }
        }
      }
    }

    #summary-content {
      border-top: 1px solid $shadow-color;
      font-family: $primaryFont;
      color: $primaryFontColor;
      background-color: #fafafa;

      table {
        margin-bottom: 0;
        min-width: 100%;

        tr {
          color: #808080;

          td,
          th {
            &:first-of-type {
              padding-left: 1rem;
            }
          }

          td.row-min {
            padding-right: 0;
          }
        }

        i {
          font-size: 1.3rem;
        }
      }

      p {
        background-color: $backgroundColorPrimary;
        text-align: center;
        padding: 1rem 0;
      }

      #wrapper-btn-order {
        margin: 2rem 1rem;
        #btn-order {
          min-width: 100%;
        }
      }
    }
  }
}
</style>
