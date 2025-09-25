<template>
    <main class="main-container with-padding d-flex flex-column align-items-stretch" style="row-gap: 42px; margin-top: 72px;">
        <h2 class="extra-large-text primary-text-color">checkout</h2>
        <div class="checkout-content-grid-wrapper">
            <section class="checkout-form-wrapper">
                <h3 class="poppins-500 secondary-text-color" style="font-size: 22px; line-height: 100%;">
                    Order details
                </h3>
                <Form v-if="cartProducts.length > 0" ref="checkoutForm" :validation-schema="checkoutSchema" @submit="checkoutProducts" v-slot="{isSubmitting}" class="d-flex flex-column align-items-stretch" style="row-gap: 33px; max-width: 578px;">


                    <fieldset class="d-flex align-items-center" style="column-gap: 24px;">
                        <fieldset class="primary-input-wrapper light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="name" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="name" name="name" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                    <label for="name" class="primary-placeholder secondary-text-color">Name</label>
                                </div>
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>

                        <fieldset class="primary-input-wrapper light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="surname" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="surname" name="surname" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                    <label for="surname" class="primary-placeholder secondary-text-color">Surname</label>
                                </div>
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>
                    </fieldset>


                    <fieldset class="primary-input-wrapper light-text-size poppins-400">
                        <!-- :rules="isRequired" -->
                        <Field name="email" :value="this.$store.state.userInfo.email" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                            <div class="actuall-input-wrapper">
                                <input v-bind="field" required id="email" name="email" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                <label for="email" class="primary-placeholder">
                                    <div class="d-flex align-items-center" style="column-gap: 4px;">
                                        <img src="@/assets/images/checkoutImages/email.svg" alt="email">
                                        <p class="secondary-text-color">
                                            Email
                                        </p>
                                    </div>
                                </label>
                            </div>
                            
                            <ul class="d-flex flex-column gap-1 mt-1">
                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                    <p>{{ errorMsg }}</p>
                                </li>
                            </ul>
                        </Field>
                    </fieldset>



                    <fieldset class="d-flex align-items-center" style="column-gap: 24px;">
                        <fieldset class="primary-input-wrapper light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="address" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="address" name="address" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                    <label for="address" class="primary-placeholder secondary-text-color">Address</label>
                                </div>

                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>

                        <fieldset class="primary-input-wrapper light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="zip_code" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="zip_code" name="zip_code" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                    <label for="zip_code" class="primary-placeholder secondary-text-color">Zip code</label>
                                </div>

                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>
                    </fieldset>

                    <button id="submitButton" type="submit" :disabled="isSubmitting"></button>

                </Form>
            </section>
            <section class="d-flex flex-column align-items-stretch justify-content-between">
                <ul v-if="cartProducts.length > 0" class="d-flex flex-column align-items-center primary-scrollbar with-padding" style="row-gap: 36px; max-height: 304px;">
                    <li v-for="(cartProductObj, i) of cartProducts" class="w-100">
                        <article style="height: min-content; column-gap: 17px;" class="d-flex justify-content-stretch">
                            <div style="max-width: 100px; max-height: 134px; background-color: var(--third-background-color);" class="primary-border border-radius-10">
                                <img aria-labelledby="checkout-product-label" style="width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply;" :src="cartProductObj.images[cartProductObj.available_colors.indexOf(cartProductObj.color)]" alt="product image">
                            </div>
                            <div class="w-100 d-flex flex-column justify-content-between" style="padding-block: 11px;">
                                <div class="w-100 d-flex flex-column" style="row-gap: 10px;">
                                    <div id="checkout-product-label" class="d-flex align-items-center justify-content-between">
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
                <p v-else class="before-extra-large-text poppins-600">No items in the cart</p>
                <div v-if="cartProducts.length > 0" class="d-flex flex-column align-items-stretch" style="row-gap: 102px;">
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
                    <PrimaryBtnComponent @click="checkoutInAction()" class="w-100" btnType="button" :disabled="false" paddingY="16px">
                        <template v-slot:btnContent>
                            <div class="d-flex align-items-center justify-content-center w-100" style="column-gap: 10px;">
                                <p class="after-standard-text-size poppins-500 third-text-color">
                                    Pay
                                </p>
                            </div>
                        </template>
                    </PrimaryBtnComponent>
                </div>
            </section>
        </div>
    </main>
    <PrimaryModalComponent :showModal="showModal" @closeModal="closeModal">
        <template v-slot:modal-content>
            <div class="d-flex flex-column align-items-center" style="margin-top: 44px;">
                <img src="@/assets/images/modalImages/modalSucces.svg" alt="success">
                <hgroup class="d-flex flex-column align-items-center" style="row-gap: 16px; margin-top: 40px;">
                    <h3 class="extra-large-text primary-text-color">Congrats!</h3>
                    <p class="light-text-size poppins-400 secondary-text-color">Your order is placed successfully!</p>
                </hgroup>
                <PrimaryBtnComponent @click="closeModal(false)" class="w-100" btnType="button" :disabled="false" paddingY="14px" maxWidth="214px" style="margin-top: 74px;">
                    <template v-slot:btnContent>
                        <div class="d-flex align-items-center justify-content-center w-100" style="column-gap: 10px;">
                            <p class="light-text-size poppins-400 third-text-color">
                                Continue shopping
                            </p>
                        </div>
                    </template>
                </PrimaryBtnComponent>
            </div>
        </template>
    </PrimaryModalComponent>
</template>
<script>
import PrimaryBtnComponent from '@/components/PrimaryBtnComponent.vue';
import QuantityComponent from '@/components/QuantityComponent.vue';
import PrimaryModalComponent from '@/components/PrimaryModalComponent.vue';
import * as yup from 'yup';
export default {
    data(){
        return {
            cartProducts: [],
            checkoutSchema: {
                name: yup.string().required("The name field is required."),
                surname: yup.string().required("The surname field is required."),
                email: yup.string().required("The email field is required.").email("The email field must be a valid email address.").min(3, "The email field must be at least 3 characters."),
                address: yup.string().required("The address field is required.").min(3, "The address field must be at least 3 characters."),
                zip_code: yup.number().required().typeError("The from field must be a number").min(2, "The zip code field must be at least 2."),
            },
            // for modal >>
            showModal: false,
        }
    },
    mounted(){
        this.getItemsFromCart();
    },
    components: {
        PrimaryBtnComponent,
        QuantityComponent,
        PrimaryModalComponent,
    },
    methods: {
        closeModal(isOpen){
            this.triggerModal(isOpen);
            this.$router.push("/");
        },
        triggerModal(isOpen){
            this.showModal = isOpen;
        },
        async checkoutProducts(values, actions){
            await new Promise(async (resolve) => {
                await this.$store.dispatch("checkoutProducts", values).then((response) => {
                    this.triggerModal(true);
                }).catch((error) => {
                    if(error?.response?.status == 422){
                        Object.entries(error.response.data.errors).forEach(([key, value]) => {
                            actions.setFieldError(key, value);
                        });
                    }
                });
                resolve();
            });
        },
        checkoutInAction(){
            document.getElementById("submitButton").click();
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
                    this.$helper.methods.handleUnauthenticatedUser();
                }
            });
        },
        getItemsFromCart(){
            this.$store.dispatch("getItemsFromCart").then((response) => {
                this.cartProducts = response.data;
            }).catch(() => {
                if(error?.response?.status == 401){
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
            }).catch(() => {
                if(error?.response?.status == 401){
                    this.$helper.methods.handleUnauthenticatedUser();
                }
            });
        },
    }
}
</script>
<style lang="scss">
.checkout-content-grid-wrapper{
    display: grid;
    grid-template-columns: auto 460px;
    grid-template-rows: 635px;
    column-gap: 130px;
    .checkout-form-wrapper{
        border-radius: 16px;
        background-color: var(--third-background-color);
        padding: 72px 47px;
        display: flex;
        flex-direction: column;
        row-gap: 46px;
    }
}
</style>