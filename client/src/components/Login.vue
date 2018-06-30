<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
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
                <v-btn @click="submit" color="primary">Login</v-btn>
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
      password: ''
    }
  },
  methods: {
    async submit(){
      try{
          let loginStatus = await authorization.login({
          email: this.email,
          password: this.password
        })
        let result = {
          authorized: loginStatus.data.session.authorized,
          id: loginStatus.data.session.manager._id,
          email: loginStatus.data.session.manager.email,
          token : loginStatus.data.token
        }
        this.$store.commit('authorization', result)
      }catch(err){
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
