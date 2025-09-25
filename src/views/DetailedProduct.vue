<template>
    <main class="main-container with-padding d-flex flex-column" style="row-gap: 49px; margin-top: 30px; padding-bottom: 110px;">
        <h4 class="light-text-size poppins-300 primary-text-color">
            Listing/Product
        </h4>
        <div v-if="productInfo" class="d-flex justify-content-between" style="column-gap: 168px;">
            <section class="w-50">
                <PrimaryCarouselComponent :imagesArray="[...productInfo.images]" @choosenNewImage="handleNewImage" :outsideChooseTrigger="choosenColorID"/>
            </section>
            <section class="w-50 d-flex flex-column" style="row-gap: 56px;">
                <hgroup class="d-flex flex-column poppins-600" style="font-size: 32px; line-height: 100%; row-gap: 21px;">
                    <h2 class="primary-text-color">
                        {{ productInfo.name }}
                    </h2>
                    <p class="primary-text-color">{{ `${productInfo.price}$` }}</p>
                </hgroup>
                <div class="d-flex flex-column" style="row-gap: 48px;">
                    <article class="d-flex flex-column" style="row-gap: 16px;">
                        <h6 class="standard-text-size poppins-400">
                            {{ `Color: ${choosenColorObj.id??''}` }}
                        </h6>
                        <ColorSelectComponent :colorOptions="productInfo.available_colors" @choosenNewColor="handleNewColor" :outsideChooseTrigger="choosenColorID" />
                    </article>
                    <article class="d-flex flex-column" style="row-gap: 16px;">
                        <h6 class="standard-text-size poppins-400">
                            {{ `Size ${choosenSizeObj.size??''}` }}
                        </h6>
                        <SizeSelectComponent :sizeOptions="productInfo.available_sizes" @choosenNewSize="handleNewSize"/>
                    </article>
                    <article class="d-flex flex-column" style="row-gap: 16px;">
                        <h6 id="quantity-label" class="standard-text-size poppins-400">
                            Quantity
                        </h6>
                        <Multiselect name="quantity" id="quantity" aria-labelledby="quantity-label" v-model="quantityMultiselectObj.value" :options="quantityMultiselectObj.options" :mode="quantityMultiselectObj.mode"
                            :searchable="false" :loading="false" :close-on-select="true" :object="false" :resolve-on-load="false" :min-chars="1"
                            :hideSelected="true" :canDeselect="false" :canClear="false" :required="false"
                            class="poppins-400" style="max-width: 70px; align-self: flex-start;" autocomplete="off" :placeholder="quantityMultiselectObj.placeholder" :disabled="quantityMultiselectObj.isDisabled" insert>
        
                            <template #caret="{ toggle }">
                                <span class="custom-caret" style="padding-right: 15px; padding-bottom: 2px;" @click="toggle">
                                    <img src="@/assets/images/detailedProductImages/downArrow.svg" alt="open dropdown">
                                </span>
                            </template>
                        </Multiselect>
                    </article>
                </div>
                <PrimaryBtnComponent v-if="this.productInfo?.available_colors?.length > 0 && this.productInfo?.available_sizes?.length > 0" :disabled="addingToCart" @click="addProductToCart()" class="w-100" btnType="button" paddingY="17.5px">
                    <template v-slot:btnContent>
                        <div class="d-flex align-items-center justify-content-center w-100" style="column-gap: 10px;">
                            <img src="@/assets/images/detailedProductImages/cart.svg" alt="cart">
                            <p class="light-text-size poppins-400 third-text-color">
                                Add to cart
                            </p>
                        </div>
                    </template>
                </PrimaryBtnComponent>
                <PrimaryBtnComponent v-else class="w-100" btnType="button" :disabled="true" paddingY="17.5px">
                    <template v-slot:btnContent>
                        <div class="d-flex align-items-center justify-content-center w-100" style="column-gap: 10px;">
                            <img src="@/assets/images/detailedProductImages/cart.svg" alt="cart">
                            <p class="light-text-size poppins-400 third-text-color">
                                Out of stock
                            </p>
                        </div>
                    </template>
                </PrimaryBtnComponent>
                <hr class="primary-border" style="margin: 0;">
                <article class="d-flex flex-column align-item-stretch" style="row-gap: 7px;">
                    <hgroup class="d-flex align-items-center justify-content-between">
                        <h6 class="before-extra-large-text poppins-500">Details</h6>
                        <img :src="productInfo.brand.image" alt="product brand" style="max-width: 109px; max-height: 61px;">
                    </hgroup>
                    <div class="d-flex flex-column" style="row-gap: 19px;">
                        <p class="standard-text-size poppins-400">{{ `Brand: ${productInfo.brand.name??''}` }}</p>
                        <p class="standard-text-size poppins-400">{{ `${productInfo.description??''}` }}</p>
                    </div>
                </article>
            </section>
        </div>
    </main>
</template>
<script>
import ColorSelectComponent from '@/components/ColorSelectComponent.vue';
import SizeSelectComponent from '@/components/SizeSelectComponent.vue';
import PrimaryBtnComponent from '@/components/PrimaryBtnComponent.vue';
import Multiselect from '@vueform/multiselect';
import PrimaryCarouselComponent from '@/components/PrimaryCarouselComponent.vue';
import axios from 'axios';

export default {
    data(){
        return {
            addingToCart: false,
            productInfo: null,
            // for quantity multiselect >>
            quantityMultiselectObj: {
                value: 1,
                options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                mode: "single",
                placeholder: "",
                isDisabled: false,
            },
            // for color radio>>
            choosenColorObj: {},
            // for size radio >>
            choosenSizeObj: {},
            // for colors and images sync >>>
            choosenColorID: null,
        }
    },
    components: {
        ColorSelectComponent,
        SizeSelectComponent,
        PrimaryBtnComponent,
        Multiselect,
        PrimaryCarouselComponent,
    },
    mounted(){  
        this.getSingleProduct();
    },
    methods: {
        addProductToCart(){
            this.addingToCart = true;
            this.$store.dispatch("addProductToCart", {
                color: this.choosenColorObj.id,
                size: this.choosenSizeObj.size,
                quantity: this.quantityMultiselectObj.value,
                product: this.$route.params.productID,
            }).then((response) => {

            }).catch((error) => {
                if(error?.response?.status == 401){
                    this.$helper.methods.handleUnauthenticatedUser();
                }
            }).finally(() => {
                this.addingToCart = false;
            });
        },
        handleNewImage(newImageObj){
            this.choosenColorID = newImageObj.id;
        },
        handleNewSize(sizeObj){
            this.choosenSizeObj = sizeObj;
        },
        handleNewColor(colorObj){
            this.choosenColorObj = {...colorObj};
            this.choosenColorID = colorObj.id;
        },
        getSingleProduct(){
            this.$store.dispatch("getSingleProduct", this.$route.params.productID).then((response) => {
                this.productInfo = response.data;
                this.productInfo.available_colors = this.productInfo?.available_colors?.map((colorID) => {
                    return {
                        id: colorID,
                        color: this.$helper.methods.data().colorMap[colorID],
                    }
                });
                this.productInfo.available_sizes = this.productInfo?.available_sizes?.map((size) => {
                    return {
                        size: size,
                    }
                });
                this.productInfo.images = this.productInfo?.images?.map((imageURI, i) => {
                    return {
                        imageURI: imageURI,
                        id: this.productInfo?.available_colors[i].id,
                    }
                });
            });
        },
    }
}
</script>
<style lang="scss">
</style>
