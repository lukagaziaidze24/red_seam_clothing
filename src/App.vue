<template>
  <router-view/>
</template>
<script>
import axios from 'axios';

export default {
  mounted(){
    this.setAxiosDefaults();
  },
  methods: {
    setAxiosDefaults(){
      axios.defaults.baseURL = 'https://api.redseam.redberryinternship.ge/api/';
      
      if(window.localStorage.getItem("BearerToken")){
        axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem("BearerToken")}`
      }
    }
  }
}
</script>
<style lang="scss">

</style>
