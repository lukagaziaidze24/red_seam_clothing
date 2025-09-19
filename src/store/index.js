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
    register({state}, Obj){
      // {username, email, password, password_confirmation, avatar}
      let formData = new FormData();

      Object.entries(Obj).forEach(([key, value]) => {
        formData.append(key, value)
      });

      // for(let pair of formData.values()){
      // }
      // return;
      return axios.post("register", formData);
    }
  },
  modules: {
  }
})
