import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    userInfo: null,
    isCartOpen: false,
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
    getIsCartOpen: (state) => {
      return state.isCartOpen;
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
      
      return axios.get("products", {
        params: {
          ...filtersObj,
        }
      });
    },
    // for detailedProduct page>>
    getSingleProduct({state}, id){
      return axios.get(`products/${id}`);
    },
    addProductToCart({state}, {color, size, quantity, product}){
      return axios.post(`cart/products/${product}`, {
        color,
        size, 
        quantity,
      });
    },
    // for cart side popout >>
    getItemsFromCart(){
      return axios.get("cart");
    },
    changeCartProductQuantity({state}, {currentValue, id, color, size}){
      return axios.patch(`cart/products/${id}`, {
        quantity: currentValue,
        color,
        size,
      });
    },
    removeProductFromCart({state}, {id, color, size}){
      return axios.delete(`/cart/products/${id}`, {
        data: {
          color,
          size,
        }
      });
    },
    // for checkout page >>
    checkoutProducts({state}, values){
      return axios.post("cart/checkout", {...values});
    },
  },
  modules: {
  }
})
