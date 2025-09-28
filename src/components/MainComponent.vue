<template>
    <div class="d-flex flex-column align-items-stretch">
        <HeaderComponent/>
        <router-view/>
    </div>
    <sidePopOutComponent :isOpenOuterToggler="isCartOpen" @closePopout="closePopout">
        <template v-slot:title>
            <h5 v-if="isAuthenticated" class="before-extra-large-text poppins-500 primary-text-color">{{`Shopping Cart (${cartProducts.length})`}}</h5>
            <h5 v-else></h5>
        </template>
        <template v-slot:sideContent v-if="isAuthenticated">
            <div v-if="cartProducts.length > 0" style="padding-top: 63px; height: calc(100% - 32px);" class="d-flex flex-column align-items-stretch justify-content-between">
                <ul class="d-flex flex-column align-items-center primary-scrollbar with-padding" style="row-gap: 36px; height: 600px;">
                    <li v-for="(cartProductObj, i) of cartProducts" class="w-100">
                        <article style="height: min-content; column-gap: 17px;" class="d-flex justify-content-stretch">
                            <div style="max-width: 100px; max-height: 134px; background-color: var(--third-background-color);" class="primary-border border-radius-10">
                                <img aria-labelledby="cart-product-label" style="width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply;" :src="cartProductObj.images[cartProductObj.available_colors.indexOf(cartProductObj.color)]" alt="product image">
                            </div>
                            <div class="w-100 d-flex flex-column justify-content-between" style="padding-block: 11px;">
                                <div class="w-100 d-flex flex-column" style="row-gap: 10px;">
                                    <div id="cart-product-label" class="d-flex align-items-center justify-content-between">
                                        <h6 class="light-text-size primary-text-color poppins-500 text-capitalize">{{ cartProductObj.name }}</h6>
                                        <span class="after-standard-text-size primary-text-color poppins-500">{{ `$ ${cartProductObj.total_price}` }}</span>
                                    </div>
                                    <p class="before-light-text-size poppins-400 fifth-text-color">{{ cartProductObj.color }}</p>
                                    <p class="before-light-text-size poppins-400 fifth-text-color">{{ cartProductObj.size }}</p>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <QuantityComponent :outerValueObj="cartProductObj" :id="cartProductObj.id" @quantityValueChanged="changeCartProductQuantity"/>
                                    <p @click="removeProductFromCart(cartProductObj)" class="before-light-text-size poppins-400 fifth-text-color cursor-pointer">remove</p>
                                </div>
                            </div>
                        </article>
                    </li>
                </ul>
                <div class="d-flex flex-column align-items-stretch" style="row-gap: 102px;">
                    <ul class="d-flex flex-column align-items-stretch fifth-text-color" style="row-gap: 16px;">
                        <li class="w-100 d-flex justify-content-between">
                            <p class="standard-text-size poppins-400">Items subtotal</p>
                            <p class="standard-text-size poppins-400">{{ `$ ${cartProducts.reduce((accumulator, productObj) => {
                                return accumulator + productObj.total_price;
                            }, 0)}` }}</p>
                        </li>
                        <li class="w-100 d-flex justify-content-between">
                            <p class="standard-text-size poppins-400">Delivery</p>
                            <p class="standard-text-size poppins-400">{{ `$ 5` }}</p>
                        </li>
                        <li class="w-100 d-flex justify-content-between">
                            <p class="before-extra-large-text poppins-500">Total</p>
                            <p class="before-extra-large-text poppins-500">{{ `$ ${cartProducts.reduce((accumulator, productObj) => {
                                return accumulator + productObj.total_price;
                            }, 5)}` }}</p>
                        </li>
                    </ul>
                    <PrimaryBtnComponent @click="goToCheckout()" class="w-100" btnType="button" :disabled="false" paddingY="16px">
                        <template v-slot:btnContent>
                            <div class="d-flex align-items-center justify-content-center w-100" style="column-gap: 10px;">
                                <p class="after-standard-text-size poppins-500 third-text-color">
                                    Go to checkout
                                </p>
                            </div>
                        </template>
                    </PrimaryBtnComponent>
                </div>
            </div>
            <div v-else style="padding-top: 150px;" class="d-flex flex-column align-items-center">
                <img style="margin-bottom: 24px;" src="@/assets/images/cartImages/noItemsInCart.svg" alt="no items in cart">
                <hgroup class="d-flex flex-column align-items-center" style="row-gap: 10px;">
                    <h6 style="font-size: 24px; line-height: 100%;" class="poppins-600">Ooops!</h6>
                    <p class="light-text-size poppins-400">You’ve got nothing in your cart just yet...</p>
                </hgroup>
                <PrimaryBtnComponent @click="goToShopping()" style="max-width: 214px; width: 100%; margin-top: 58px;" class="w-100" btnType="button" :disabled="false" paddingY="10px">
                    <template v-slot:btnContent>
                        <div class="w-100">
                            <p class="light-text-size poppins-400 third-text-color">
                                Start shopping
                            </p>
                        </div>
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
import QuantityComponent from "./QuantityComponent.vue";
import { mapGetters } from "vuex";
export default {
    data(){
        return {
            cartProducts: [],
            isAuthenticated: false,
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
        QuantityComponent,
    },
    watch: {
        isCartOpen: {
            handler(newVal){
                if(newVal){
                    this.getItemsFromCart();
                }else{
                    this.cartProducts = [];
                }
                this.isAuthenticated = false;
                this.isOpen = newVal;
            }
        }
    },
    methods: {
        goToShopping(){
            this.closePopout();
            this.$router.push("/");
        },
        goToCheckout(){
            this.closePopout();
            this.$router.push("/checkout");
        },
        removeProductFromCart(cartProductObj){
            let changedProductObjIndex = this.cartProducts.findIndex((productObj) => {
                return productObj.id == cartProductObj.id && productObj.color == cartProductObj.color && productObj.size == cartProductObj.size;
            });
            let changedProductObj = this.cartProducts[changedProductObjIndex];
            this.$store.dispatch("removeProductFromCart", {id: changedProductObj.id, color: changedProductObj.color, size: changedProductObj.size}).then((response) => {
                this.cartProducts.splice(changedProductObjIndex, 1);
            }).catch((error) => {
                if(error?.response?.status == 401){
                    this.closePopout();
                    this.$helper.methods.handleUnauthenticatedUser();
                }
            });
        },
        changeCartProductQuantity({currentValue, additionalInfo ,id}){
            let changedProductObj = this.cartProducts.find((productObj) => {
                return productObj.id == id && productObj.size == additionalInfo.size && productObj.color == additionalInfo.color;
            });
            this.$store.dispatch("changeCartProductQuantity", {currentValue, id, color: changedProductObj.color, size: changedProductObj.size}).then((response) => {
                changedProductObj.quantity = currentValue;
                changedProductObj.total_price = changedProductObj.quantity * changedProductObj.price;
            }).catch((error) => {
                if(error?.response?.status == 401){
                    this.closePopout();
                    this.$helper.methods.handleUnauthenticatedUser();
                }
            });
        },
        getItemsFromCart(){
            this.$store.dispatch("getItemsFromCart").then((response) => {
                this.isAuthenticated = true;
                this.cartProducts = response.data;
            }).catch((error) => {
                if(error?.response?.status == 401){
                    this.closePopout();
                    this.$helper.methods.handleUnauthenticatedUser();
                }
            });
        },
        closePopout(){
            this.isAuthenticated = false;
            this.$store.state.isCartOpen = false;
        },
    }
}
</script>