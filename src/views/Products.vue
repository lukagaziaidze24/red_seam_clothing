<template>
    <main class="main-container with-padding d-flex flex-column align-items-stretch" style="row-gap: 32px; margin-top: 72px;">
        <section class="d-flex align-items-stretch justify-content-between">
            <h2 class="extra-large-text primary-text-color">
                Products
            </h2>
            <div class="d-flex align-items-center" style="column-gap: 32px;">
                <p class="before-light-text-size poppins-400">
                    {{ `Showing ${this.productsPagingInfo.showingFrom}-${this.productsPagingInfo.showingTo} of ${this.productsPagingInfo.total} results` }}
                </p>
                <DropDownComponent @isDropdownOpen="handleFiltersDropdownClick" :closeDropdown="dropdownClosers.filters" class="h-100">
                    <template v-slot:dropdownHeader>
                        <div class="d-flex align-items-center" style="column-gap: 8px;">
                            <img src="@/assets/images/dropDownImages/filter.svg" alt="filter" aria-labelledby="filter-text">
                            <p id="filter-text" class="poppins-400" style="font-size: 16px; line-height: 100%;">Filter</p>
                        </div>
                    </template>
                    <template v-slot:dropdownBody>
                        <div class="d-flex flex-column" style="row-gap: 20px;">
                            <h6 class="standard-text-size poppins-600">
                                Select price
                            </h6>
                            <Form ref="filtersForm" class="d-flex flex-column align-items-stretch" style="row-gap: 10px;"  v-slot="{isSubmitting, values}" :validation-schema="filterSchema" @submit="filterSubmitHandler">
                                <fieldset class="w-100 d-flex" style="column-gap: 10px;">
                                    <fieldset class="primary-input-wrapper light-text-size poppins-400">
                                        <!-- :rules="isRequired" -->
                                        <Field name="filter[price_from]" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                            <input min="0" v-bind="field" required id="filter[price_from]" name="filter[price_from]" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" style="width: 175px;" type="number" placeholder="">
                                            <ul class="d-flex flex-column gap-1 mt-1">
                                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                                    <p>{{ errorMsg }}</p>
                                                </li>
                                            </ul>
                                        </Field>
                                        <label for="filter[price_from]" class="primary-placeholder secondary-text-color">From</label>
                                    </fieldset>
                                    <fieldset class="primary-input-wrapper light-text-size poppins-400">
                                        <!-- :rules="isRequired" -->
                                        <Field name="filter[price_to]" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                            <input min="0" v-bind="field" required id="filter[price_to]" name="filter[price_to]" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" style="width: 175px;" type="number" placeholder="">
                                            <ul class="d-flex flex-column gap-1 mt-1">
                                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                                    <p>{{ errorMsg }}</p>
                                                </li>
                                            </ul>
                                        </Field>
                                        <label for="filter[price_to]" class="primary-placeholder secondary-text-color">To</label>
                                    </fieldset>
                                    
                                </fieldset>
                                <fieldset style="width: 124px; align-self: flex-end;">
                                    <PrimaryBtnComponent class="w-100" btnType="submit" :disabled="isSubmitting">
                                        <template v-slot:btnContent>
                                            <p class="light-text-size poppins-400 third-text-color">
                                                Apply
                                            </p>
                                        </template>
                                    </PrimaryBtnComponent>
                                </fieldset>
                            </Form>


                        </div>
    
                    </template>
                </DropDownComponent>
                <DropDownComponent @isDropdownOpen="handleSortingDropdownClick" :closeDropdown="dropdownClosers.sorting" class="h-100">
                    <template v-slot:dropdownHeader>
                        <div class="d-flex align-items-center" style="column-gap: 8px;">
                            <p v-if="choosenSortID == 'created_at'" id="filter-text" class="standard-text-size poppins-400">Sort by</p>
                            <p v-else id="filter-text" class="standard-text-size poppins-400">
                                {{ 
                                    sortingOptionsArray.find((optionObj) => optionObj.setId == choosenSortID ).content
                                 }}
                            </p>
                            <img src="@/assets/images/dropDownImages/arrow.svg" alt="filter" aria-labelledby="filter-text">
                        </div>
                    </template>
                    <template v-slot:dropdownBody>

                        <div class="d-flex flex-column" style="row-gap: 8px;">
                            <h6 class="standard-text-size poppins-600">
                                Select price
                            </h6>
                            <ul class="d-flex flex-column align-items-start standard-text-size poppins-400 cursor-pointer">
                                <li v-for="(data, i) of sortingOptionsArray" :class="['sort-li', 'primary-transition', 'border-radius-5', {'choosen': data.isChoosen}]" @click="checkSortingOptionHandler(data)">
                                    {{ data.content }}
                                </li>
                            </ul>
                        </div>
                    </template>
                </DropDownComponent>
            </div>
        </section>
        <section>
            <div v-if="filterValues['filter[price_from]'] || filterValues['filter[price_to]']" class="d-flex align-items-center gap-2 primary-border light-text-size poppins-400" style="padding: 8px 10px; border-radius: 50px; width: fit-content;">
                <p>
                    {{ `price: ${filterValues['filter[price_from]']}-${filterValues['filter[price_to]']}` }}
                </p>
                <img src="@/assets/images/dropDownImages/deleteCross.svg" @click="removeFilters()" class="cursor-pointer" alt="remove price filter">
            </div>
        </section>
        <section class="d-flex flex-column align-items-center" style="row-gap: 90px; padding-bottom: 219px;">
            <ul class="products-grid-wrapper w-100">
                <li v-for="(data, i) of productsInfoArray" :key="i" style="width: 100%;" @click="seeDetailedProduct(data)" class="cursor-pointer">
                    <figure class="d-flex flex-column align-items-stretch" style="row-gap: 12px;">
                        <div class="w-100 h-100 border-radius-10" style="background-color: var(--third-background-color); overflow: hidden;">
                            <img :src="data.cover_image" :alt="data.name" style="width: 100%; max-height: 549px; height: 100%; mix-blend-mode: multiply;">
                        </div>
                        <figcaption class="d-flex flex-column align-items-start" style="row-gap: 4px;">
                            <p class="after-standard-text-size poppins-500">
                                {{ data.name }}
                            </p>
                            <p class="after-standard-text-size poppins-500">
                                {{ `${data.price}$` }}
                            </p>
                        </figcaption>
                    </figure>
                </li>
            </ul>
            <vue-awesome-paginate
                :total-items="productsPagingInfo.total"
                :items-per-page="productsPagingInfo.limit"
                :max-pages-shown="3"
                v-model="productsPagingInfo.offset"
                :hide-prev-next-when-ends="true"
                :disable-breakpoint-buttons="false"
                @click="paginationClickHandler"
                class="my-3"
            >
                <template #prev-button>
                    <span>
                        <img src="@/assets/images/paginationImages/prevBtn.svg" height="25" />
                    </span>
                </template>

                <template #next-button>
                    <span>
                        <img src="@/assets/images/paginationImages/nextBtn.svg" height="25" />
                    </span>
                </template>
            </vue-awesome-paginate>
        </section>
    </main>
</template>
<script>
import DropDownComponent from '@/components/DropDownComponent.vue';
import PrimaryBtnComponent from '@/components/PrimaryBtnComponent.vue';
import * as yup from 'yup';

export default {
    data(){
        return {
            // for paging >>
            productsPagingInfo: {
                total: 100,
                limit: 10,
                offset: 1,
                showingFrom: 0,
                showingTo: 0,
            },
            // for products info>>
            productsInfoArray: [],
            // for filters and sorting >>
            dropdownClosers: {
                sorting: false,
                filters: false,
            },
            // for filters >>
            filterValues: {},
            choosenSortID: "created_at",
            filterSchema: {
                "filter[price_from]": yup.number("The from field must be a number")
                    .typeError("The from field must be a number")
                    .min(0, "The from field cannot be negative")
                    .nullable()
                    .transform((value, originalValue) => // if original value is empty string return null instead, otherwise return just the value
                        originalValue === "" ? null : value
                    ),
                "filter[price_to]": yup.number("The to field must be a number type")
                    .typeError("The from field must be a number")
                    .min(0, "The from field cannot be negative")
                    .nullable()
                    .transform((value, originalValue) =>  // if original value is empty string return null instead, otherwise return just the value
                        originalValue === "" ? null : value
                    ),
            },
            // for sort >>
            sortingOptionsArray: [
                {
                    content: "New Products first",
                    setId: "-created_at",
                    isChoosen: false,
                },
                {
                    content: "Price, low to high",
                    setId: "price",
                    isChoosen: false,
                },
                {
                    content: "Price, high to low",
                    setId: "-price",
                    isChoosen: false,
                }
            ],
        }
    },
    components: {
        DropDownComponent,
        PrimaryBtnComponent,
    },
    mounted(){
        this.getProducts();
    },
    methods: {
        seeDetailedProduct(productObj){
            this.$router.push(`/detailedProduct/${productObj.id}`);
        },
        paginationClickHandler(){
            this.getProducts();
        },
        checkSortingOptionHandler(data){
            this.sortingOptionsArray.forEach((optionObj) => {
                if(optionObj.setId == data.setId){
                    optionObj.isChoosen = !optionObj.isChoosen;
                    this.choosenSortID = optionObj.isChoosen?optionObj.setId:"created_at";
                    this.productsPagingInfo.offset = 1;
                }else{
                    optionObj.isChoosen = false;
                }
            });
            this.dropdownClosers.sorting = !this.dropdownClosers.sorting;
            this.getProducts();
        },
        handleSortingDropdownClick(isOpen){
            this.closeAllDropdowns("sorting");
        },
        closeAllDropdowns(togglerName){
            Object.keys(this.dropdownClosers).forEach((key) => {
                if(key != togglerName){
                    this.dropdownClosers[key] = !this.dropdownClosers[key];
                }
            });
        },
        removeFilters(){
            Object.keys(this.filterValues).forEach((key) => {
                this.filterValues[key] = "";
            });
            this.$refs?.filtersForm?.setValues({...this.filterValues});
            this.getProducts();
        },
        handleFiltersDropdownClick(isOpen){
            if(isOpen){
                setTimeout(() => {
                    this.$refs.filtersForm.setValues({...this.filterValues});
                    this.closeAllDropdowns("filters");
                }, 0);
            }
        },
        filterSubmitHandler(values, actions){
            this.filterValues = {...values};
            this.productsPagingInfo.offset = 1;
            this.dropdownClosers.filters = !this.dropdownClosers.filters;
            this.getProducts();
        },
        getProducts(){
            this.$store.dispatch("products", {...this.filterValues, sort: this.choosenSortID, page: this.productsPagingInfo.offset}).then((response) => {
                this.productsInfoArray = response.data.data;
                this.productsPagingInfo.total = response.data.meta.total;
                this.productsPagingInfo.showingFrom = response.data.meta.from;
                this.productsPagingInfo.showingTo = response.data.meta.to;
                this.productsPagingInfo.limit = response.data.meta.per_page;
                window.scrollTo(0, 0);
            });
        },
    }
}
</script>
<style lang="scss">
.sort-li{
    padding: 8px 5px;
    &.choosen{
        background-color: var(--primary-border-color);
    }
}
.products-grid-wrapper{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 24px;
    row-gap: 48px;
}
</style>