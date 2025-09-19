import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    userInfo: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login({state}, {email, password}){
      return axios.post("login", {
        email,
        password,
      });
    },
    register({state}, {username, email, password, password_confirmation }){
      return axios.post("register", {
        username,
        email,
        password,
        password_confirmation,
      });
    }
  },
  modules: {
  }
})
