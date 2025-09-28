import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helper from './helper'
import { Field, Form, ErrorMessage } from 'vee-validate';
import VueAwesomePaginate from "vue-awesome-paginate";
import { createHead, VueHeadMixin } from '@unhead/vue/client'
import { TemplateParamsPlugin } from '@unhead/vue/plugins'



// createApp(App).use(store).use(router).mount('#app')




const redSeamClothingApp = createApp(App);
const head = createHead({
    plugins: [TemplateParamsPlugin],
    init: [
      // change default
      {
        title: 'Red Seam Clothing',
        titleTemplate: '%s %separator %siteName',
        templateParams: {
            separator: '|',
            siteName: 'Red Seam Clothing'
        },
        htmlAttrs: { lang: 'en' },
        // link: [
        //     {
        //         rel: 'icon',
        //         href: '/favicon.ico',
        //         sizes: '16x16'
        //     },
        // ]
      },
    ],
});
redSeamClothingApp.use(store).use(router).use(VueAwesomePaginate).use(head);
redSeamClothingApp.mixin(VueHeadMixin);
redSeamClothingApp.config.globalProperties.$helper=helper;

redSeamClothingApp.component("Field", Field);
redSeamClothingApp.component("Form", Form);
redSeamClothingApp.component("ErrorMessage", ErrorMessage);



redSeamClothingApp.mount("#app");


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "@vueform/multiselect/themes/default.css"
