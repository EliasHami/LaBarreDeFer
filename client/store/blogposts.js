import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const bp_store = new Vuex.Store({
    state: {
      List: []
    },
    mutations: {
      add (state, blogpost) {
        state.List.push(blogpost)
      },
      emptyList(state){
          state.List = []
      }
    },
    getters: {
        List_getter: state => {
            return state.List
        }
    }
})