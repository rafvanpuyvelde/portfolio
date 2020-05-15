<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p id="header" class="modal-card-title">Notifications</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <ul id="notifications">
          <div class="notification is-primary" v-for="item in successfulOrders" :key="item.id">
            {{ item }}
          </div>
          <div class="notification is-danger" v-for="item in unsuccessfulOrders" :key="item.id">
            {{ item }}
          </div>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState} from 'vuex';

export default {
  Name: 'OrderModal',
  props: {
    visible: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderInfo: state => state.notifications
    }),
    successfulOrders() {
      let orders = []
      this.orderInfo.forEach(order => {
        if (order.split(' ')[0] != 'Unable')
          orders.push(order);
      });
      return orders;
    },
    unsuccessfulOrders() {
      let orders = []
      this.orderInfo.forEach(order => {
        if (order.split(' ')[0] == 'Unable')
          orders.push(order);
      });
      return orders;
    }
  },
  methods: {
    close() {
      this.$store.commit('toggleNotifications');
    }
  }
}
</script>

<style lang="scss" scoped>
  #header {
    margin-bottom: 0;
  }

  #notifications {
    margin: 0;
  }
</style>

