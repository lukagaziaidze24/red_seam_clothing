<template>
    <div class="main-container d-flex justify-content-stretch align-items-center">
        <section class="background-section w-50" title="background image" aria-label="login background image">
        </section>
        <main class="d-flex justify-content-center w-50">
            <div class="d-flex flex-column align-items-stretch justify-content-start">
                <h2 class="login-title primary-text-color poppins-600">
                    Log in
                </h2>

                <Form ref="loginForm" v-slot="{isSubmitting}" @submit="loginHandler" class="d-flex flex-column align-items-stretch" style="row-gap: 46px;">
                    
                    <fieldset class="d-flex flex-column align-items-stretch" style="row-gap: 24px;">
                        <fieldset class="primary-input-wrapper light-text-size">
                            <!-- :rules="isRequired" -->
                            <Field name="email" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <input v-bind="field" required id="email" name="email" autocomplete="on" class="primary-input secondary-text-color" type="email" placeholder="">
                            </Field>
                            <label for="email" class="primary-placeholder secondary-text-color">Email <span class="fourth-text-color">*</span></label>
                        </fieldset>
                        <fieldset class="primary-input-wrapper with-show-button light-text-size">
                            <!-- :rules="isRequired" -->
                            <Field name="password" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <input v-bind="field" required id="password" name="password" autocomplete="on" class="primary-input secondary-text-color" type="password" placeholder="">
                            </Field>
                            <label for="password" class="primary-placeholder secondary-text-color">Password <span class="fourth-text-color">*</span></label>
                            <button type="button" class="show-button" @click="this.$helper.toggleInput($event)">
                                <img src="@/assets/images/inputImages/showButton.svg" alt="show-hide-password">
                            </button>
                        </fieldset>
                    </fieldset>
                    <fieldset class="d-flex flex-column align-items-center" style="row-gap: 24px;">
                        <PrimaryBtnComponent class="w-100" bntType="submit">
                            <template v-slot:btnContent>
                                <p class="light-text-size third-text-color">
                                    Log in
                                </p>
                            </template>
                        </PrimaryBtnComponent>
                        <p class="d-flex align-items-center column-gap-2">
                            <span class="ight-text-size secondary-text-color">not a member?</span>
                            <span class="ight-text-size fourth-text-color poppins-500">Register</span>
                        </p>
                    </fieldset>

                </Form>


                <!-- <form @submit.prevent="loginHandler" class="d-flex flex-column align-items-stretch" style="row-gap: 46px;">
                    <fieldset class="d-flex flex-column align-items-stretch" style="row-gap: 24px;">
                        <fieldset class="primary-input-wrapper light-text-size">

                            <input required id="Email" name="Email" autocomplete="on" class="primary-input secondary-text-color" type="email" placeholder="">
                            <label for="Email" class="primary-placeholder secondary-text-color">Email <span class="fourth-text-color">*</span></label>
                        </fieldset>
                        <fieldset class="primary-input-wrapper with-show-button light-text-size">
                            <input required id="password" name="password" autocomplete="on" class="primary-input secondary-text-color" type="password" placeholder="">
                            <label for="password" class="primary-placeholder secondary-text-color">Password <span class="fourth-text-color">*</span></label>
                            <button type="button" class="show-button" @click="this.$helper.toggleInput($event)">
                                <img src="@/assets/images/inputImages/showButton.svg" alt="show-hide-password">
                            </button>
                        </fieldset>
                    </fieldset>
                    <fieldset class="d-flex flex-column align-items-center" style="row-gap: 24px;">
                        <PrimaryBtnComponent class="w-100" bntType="submit">
                            <template v-slot:btnContent>
                                <p class="light-text-size third-text-color">
                                    Log in
                                </p>
                            </template>
                        </PrimaryBtnComponent>
                        <p class="d-flex align-items-center column-gap-2">
                            <span class="ight-text-size secondary-text-color">not a member?</span>
                            <span class="ight-text-size fourth-text-color poppins-500">Register</span>
                        </p>
                    </fieldset>

                </form> -->
            </div>
        </main>
    </div>
</template>
<script>
import PrimaryBtnComponent from '@/components/PrimaryBtnComponent.vue';
export default {
    data(){
        return {

        }
    },
    components: {
        PrimaryBtnComponent,
    },
    methods: {
        loginHandler(values){
            this.$store.dispatch("login", values).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        },
        isRequired(value) {
            let isMoreThan2 = value?.trim()?.length >= 2;
            let isLessThan255 = value?.trim()?.length <= 255;
            let isOnlySymbols = /^[A-Za-z\n \u10A0-\u10FF]*$/.test(String(value));

            let errorArray = [];

            if(!isMoreThan2){
                errorArray.push('მინიმუმ 2 სიმბოლო');
            }
            if(!isLessThan255){
                errorArray.push('მაქსიმუმ 255 სიმბოლო');
            }
            if(!isOnlySymbols){
                errorArray.push('მარტო ლათინური და ქართული სიმბოლოები');
            }
            if(errorArray.length > 0){
                return errorArray;
            }else{
                return true;
            }
        },
    }
}
</script>
<style lang="scss">
.main-container{
    .background-section{
        background-image: url('@/assets/images/loginImages/loginBackground.png');
        background-position: top;
        background-repeat: no-repeat;
        background-size: cover;
        height: 1000px;
    }
    main{
        div{
            max-width: 554px;
            width: 100%;
            row-gap: 48px;
        }
        .login-title{
            font-size: 42px;
            line-height: 100%;
        }
    }
}
</style>
