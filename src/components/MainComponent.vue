<template>
    <div class="d-flex flex-column align-items-stretch">
        <HeaderComponent/>
        <router-view/>
    </div>
    <sidePopOutComponent :isOpenOuterToggler="isCartOpen">
        <template v-slot:title>
            <h5 class="before-extra-large-text poppins-500">asdasd</h5>
        </template>
        <template v-slot:sideContent>
            <div style="padding-top: 150px;" class="d-flex flex-column align-items-center">
                <img style="margin-bottom: 24px;" src="@/assets/images/cartImages/noItemsInCart.svg" alt="no items in cart">
                <hgroup class="d-flex flex-column align-items-center" style="row-gap: 10px;">
                    <h6 style="font-size: 24px; line-height: 100%;" class="poppins-600">Ooops!</h6>
                    <p class="light-text-size">You’ve got nothing in your cart just yet...</p>
                </hgroup>
                <PrimaryBtnComponent style="max-width: 214px; width: 100%; margin-top: 58px;" class="w-100" btnType="button" :disabled="true" paddingY="10px">
                    <template v-slot:btnContent>
                        <router-link to="/" class="w-100">
                            <div class="w-100">
                                <p class="light-text-size third-text-color">
                                    Start shopping
                                </p>
                            </div>
                        </router-link>
                    </template>
                </PrimaryBtnComponent>
            </div>
        </template>
    </sidePopOutComponent>
</template>
<style lang="scss">

</style>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import sidePopOutComponent from "./sidePopOutComponent.vue";
import PrimaryBtnComponent from "./PrimaryBtnComponent.vue";
import { mapGetters } from "vuex";
export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapGetters({
            isCartOpen: "getIsCartOpen",
        })
    },
    components: {
        HeaderComponent,
        sidePopOutComponent,
        PrimaryBtnComponent,
    }
}
</script>