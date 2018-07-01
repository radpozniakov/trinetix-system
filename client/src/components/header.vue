<template>
  <div>
    <v-toolbar color="primary lighten-1" dark fixed app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">Trinetix system</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="menu in menuItems" :key="menu.title" flat router :to="menu.link">
          <v-icon left>
            {{menu.iconTitle}}
          </v-icon>
          {{menu.title}}
        </v-btn>
        <v-menu offset-y>
          <v-btn slot="activator" flat>
              <v-avatar class="mr-2" size="36px">
                <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="John">
              </v-avatar>
            {{ currentManager.name }}
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>
                <v-icon class="mr-2" left>account_circle</v-icon>Profile info</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logOut">
            <v-list-tile-title>
              <v-icon class="mr-2" left>keyboard_tab</v-icon>Log out
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import authorization from '@/services/authorization'
import {mapGetters, mapMutations} from 'vuex';
export default {

  data() {
    return {
      sideNav: false,
      menuItems: [
        { iconTitle: "border_clear", title: "invoices", link: "invoices" },
        { iconTitle: "people", title: "all users", link: "users" }
      ]
    };
  },
  computed: {
    ...mapGetters([
        'currentManager',
    ]),
  },
  methods: {
    async logOut() {
      try{
        let logOutResult = await authorization.logOut({token: this.$store.getters.token})
        this.$store.commit('logOut')
        this.$router.push({path:"/login", params: {logout: true}})
        }catch(err){
          console.log(err)
        alert("Ошибка")
      }
    }
  }
};
</script>