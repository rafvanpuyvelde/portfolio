<template>
  <b-container class="wrapper-register">
    <b-row id="row-register" align-v="center">
      <b-col lg="6" md="8" offset-lg="3" offset-md="2">
        <register-form></register-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import RegisterForm from '~/components/forms/RegisterForm.vue'

export default {
  middleware: 'notAuthenticated',
  layout: 'blank',
  components: {
    RegisterForm,
  },
  computed: {
    ip() {
      //return this.$store.state.ip 
    }
  },
  methods: {
    ...mapActions ({
      trainers: 'getTrainers'
    })
  },
  mounted () {
    this.trainers();
  },
}
</script>

<style lang="scss" scoped>
.wrapper-register {  
  #row-register {
    min-height: 100vh;
  }
}
</style>