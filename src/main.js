import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helper from './helper'
import { Field, Form, ErrorMessage } from 'vee-validate';
import VueAwesomePaginate from "vue-awesome-paginate";


// createApp(App).use(store).use(router).mount('#app')


const redSeamClothingApp = createApp(App);
redSeamClothingApp.use(store).use(router).use(VueAwesomePaginate);
redSeamClothingApp.config.globalProperties.$helper=helper;

redSeamClothingApp.component("Field", Field);
redSeamClothingApp.component("Form", Form);
redSeamClothingApp.component("ErrorMessage", ErrorMessage);



redSeamClothingApp.mount("#app");


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"