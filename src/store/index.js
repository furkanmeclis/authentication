import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    isLogged:false,
    role:null
  },
  mutations: {
    SET_LOGGED_IN(state,value){
    state.isLogged = value
    },
    SET_USER(state,value){
      state.user = value
    },
    SET_USER_ROLE(state,value){
      state.role = value
    }
  },
  getters:{
      isAuthanticated : state => {
          return state.isLogged
      },
      getUserInfo : state => {
          return (state.isLogged == true) ? state.user : {}
      },

  }
})
