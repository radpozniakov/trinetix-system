<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
            <button class="btn" @click="testSend">svsev </button>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
  import testService from '@/services/testServise.js'
  export default {
    data () {
      return {
        msg: "Rad Poznyakov"
      }
    },
    methods: {
      async testSend(){
        try {
          const response = await testService.test({
            name: "Rad Pf",
            email: "rad"
          })
          console.log('responce', response)
        }catch(error){
          console.log('error', error)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #0cda7d;
}
</style>
