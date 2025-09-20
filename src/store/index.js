import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    userInfo: null,
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    }
  },
  mutations: {
  },
  actions: {
    // for login >>
    login({state}, {email, password}){
      return axios.post("login", {
        email,
        password,
      });
    },
    // for register >>
    register({state}, Obj){
      let formData = new FormData();

      Object.entries(Obj).forEach(([key, value]) => {
        formData.append(key, value)
      });

      // for(let pair of formData.values()){
      // }
      // return;
      return axios.post("register", formData);
    },
    // for products >>
    products({state}, filtersObj){
      // console.log(filtersObj);
      
      return axios.get("products", {
        params: {
          ...filtersObj,
          page: 1,
        }
      });
    },
  },
  modules: {
  }
})
