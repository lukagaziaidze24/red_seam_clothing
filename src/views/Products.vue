<template>
    <main class="main-container with-padding">
        <section class="d-flex align-items-stretch justify-content-between">
            <h2 class="extra-large-text primary-text-color">
                Products
            </h2>
            <div class="d-flex align-items-center" style="column-gap: 32px;">
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
                                    <fieldset class="primary-input-wrapper light-text-size">
                                        <!-- :rules="isRequired" -->
                                        <Field name="filter[price_from]" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                            <input min="0" v-bind="field" required id="filter[price_from]" name="filter[price_from]" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" style="width: 175px;" type="number" placeholder="">
                                            <ul class="d-flex flex-column gap-1 mt-1">
                                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                                    <p>{{ errorMsg }}</p>
                                                </li>
                                            </ul>
                                        </Field>
                                        <label for="filter[price_from]" class="primary-placeholder secondary-text-color">From <span class="fourth-text-color">*</span></label>
                                    </fieldset>
                                    <fieldset class="primary-input-wrapper light-text-size">
                                        <!-- :rules="isRequired" -->
                                        <Field name="filter[price_to]" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                            <input min="0" v-bind="field" required id="filter[price_to]" name="filter[price_to]" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" style="width: 175px;" type="number" placeholder="">
                                            <ul class="d-flex flex-column gap-1 mt-1">
                                                <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                                    <p>{{ errorMsg }}</p>
                                                </li>
                                            </ul>
                                        </Field>
                                        <label for="filter[price_to]" class="primary-placeholder secondary-text-color">To <span class="fourth-text-color">*</span></label>
                                    </fieldset>
                                    
                                </fieldset>
                                <fieldset style="width: 124px; align-self: flex-end;">
                                    <PrimaryBtnComponent class="w-100" btnType="submit" :disabled="isSubmitting">
                                        <template v-slot:btnContent>
                                            <p class="light-text-size third-text-color">
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
                            <p id="filter-text" class="standard-text-size poppins-400">Sort by</p>
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
    </main>
</template>
<script>
import DropDownComponent from '@/components/DropDownComponent.vue';
import PrimaryBtnComponent from '@/components/PrimaryBtnComponent.vue';
import * as yup from 'yup';

export default {
    data(){
        return {
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
    methods: {
        checkSortingOptionHandler(data){
            this.sortingOptionsArray.forEach((optionObj) => {
                if(optionObj.setId == data.setId){
                    optionObj.isChoosen = !optionObj.isChoosen;
                    this.choosenSortID = optionObj.isChoosen?optionObj.setId:"created_at";
                }else{
                    optionObj.isChoosen = false;
                }
            });
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
            this.getProducts();
        },
        getProducts(){
            this.$store.dispatch("products", {...this.filterValues, sort: this.choosenSortID}).then((response) => {
                console.log(response);
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
</style>