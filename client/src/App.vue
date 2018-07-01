<template>
   <v-app>
    <header-component v-if=authorizationStatus></header-component>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <footer-component v-if=authorizationStatus></footer-component>
  </v-app>
</template>

<script>
import authorization from '@/services/authorization'
import {mapGetters, mapMutations} from 'vuex';
import headerComponent from '@/components/header'
import loginComponent from '@/components/Login'
import FooterComponent from '@/components/Footer'
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
  mounted(){
      //this.$router.push({path:"/login", params: {logout: true}})
  },
  components:{headerComponent, loginComponent, FooterComponent},
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
      }else{
        this.$router.push({path:"/login", params: {logout: true}})  
      }
     }catch(err){
       console.log(err)
     }
  }
}
</script>

<style lang="sass" scoped>

</style>
