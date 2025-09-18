<template>
    <div>
        <HeaderComponent/>
        <!-- unda gaiweros hederi -->
        <router-view/>
    </div>
</template>
<style lang="scss">

</style>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
    data(){
        return {

        }
    },
    components: {
        HeaderComponent,
    }
}
</script>