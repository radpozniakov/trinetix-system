import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export const store =  new Vuex.Store({
    state:{
      client: {
        authorized: false,
        token: null,
        email: '',
        id: ''
      }
    },
    getters:{
      authorizationStatus(state){
          return state.client.authorized
        },
      token(state){
        return state.client.token
      }
    },
    mutations: {
      authorization(state, payload){
          state.client.authorized = payload.authorized
          state.client.token = payload.token
          state.client.email = payload.email
          state.client.id = payload.id
        },
      logOut(state){
        state.client.authorized = false
        state.client.token = null
        state.client.email = null
        state.client.id = null
      }  
    },
    actions: {
      authorization (context, payload) {
          context.commit('authorization', payload)
        }
      } 
    })
