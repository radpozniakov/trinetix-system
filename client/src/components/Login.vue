<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12" style="margin-top: 100px">
              <v-toolbar dark color="primary lighten-1" >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" v-model="email" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" v-model="password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary lighten-1" >
                  <v-progress-circular v-if="showProgressLogin"
                    indeterminate
                    color="white" size="16" style="margin-right: 5px"
                  ></v-progress-circular>
                  <span>Login</span>                    
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import authorization from '@/services/authorization'
export default {
  data () {
    return {
      email: '',
      password: '',
      showProgressLogin: false
    }
  },
  methods: {
    async submit(){
      try{
          this.showProgressLogin = true
          let loginStatus = await authorization.login({
          email: this.email,
          password: this.password
        })
        setTimeout(() =>{
          let result = {
          authorized: loginStatus.data.session.authorized,
          id: loginStatus.data.session.manager._id,
          email: loginStatus.data.session.manager.email,
          name: loginStatus.data.session.manager.name,
          token : loginStatus.data.token
        }
        this.showProgressLogin = false
        this.$store.commit('authorization', result)
        this.$router.push({path:"/"})
        }, 1000)
      }catch(err){
        this.showProgressLogin = false
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
