<template>
   <v-app v-if=authorizationStatus>
    <header-component></header-component>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      
    </v-content>
    <div>
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
  </v-app>
  <v-app v-else id="inspire">
    <login-component></login-component>
    <div>
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
  </v-app>
</template>

<script>
import authorization from '@/services/authorization'
import {mapGetters, mapMutations} from 'vuex';
import headerComponent from '@/components/header'
import loginComponent from '@/components/Login'
export default {
  data () {
    return {
  
    }
  },
  methods: {
  
  },
  computed:{
    ...mapGetters([
        'authorizationStatus',
    ]),
  },
  components:{headerComponent, loginComponent},
  async beforeCreate(){
     try{
      let loginInfo = await authorization.handshake()
      console.log(loginInfo.data)
      if(loginInfo.data.manager){
        let result = {
          authorized: true,
          id: loginInfo.data.manager._id,
          email: loginInfo.data.manager.email,
          token : loginInfo.data.xAuth
        }
      this.$store.commit('authorization', result)
      }
     }catch(err){
       console.log(err)
     }

  }
}
</script>

<style lang="sass" scoped>

</style>
