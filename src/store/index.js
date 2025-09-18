import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login({state}, {email, password}){
      console.log(email);
      console.log(password);
      return axios.post("login", {
        email,
        password,
      });
    }
  },
  modules: {
  }
})
