<template>
    <div class="main-container d-flex justify-content-stretch align-items-center">
        <section class="background-section w-50" title="background image" aria-label="login background image">
        </section>
        <main class="d-flex justify-content-center w-50">
            <div class="d-flex flex-column align-items-stretch justify-content-start">
                <h2 class="login-title primary-text-color poppins-600">
                    Register
                </h2>

                <Form ref="registerForm" :validation-schema="loginSchema" @submit="registerHandler" v-slot="{isSubmitting}" class="d-flex flex-column align-items-stretch" style="row-gap: 46px;">
                    
                    <fieldset class="d-flex flex-column align-items-stretch" style="row-gap: 24px;">
                        <fieldset class="primary-input-wrapper light-text-size">
                            <!-- :rules="isRequired" -->
                            <Field name="username" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <input v-bind="field" required id="username" name="username" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                            <label for="username" class="primary-placeholder secondary-text-color">Username <span class="fourth-text-color">*</span></label>
                        </fieldset>
                        <fieldset class="primary-input-wrapper light-text-size">
                            <!-- :rules="isRequired" -->
                            <Field name="email" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <input v-bind="field" required id="email" name="email" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="email" placeholder="">
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                            <label for="email" class="primary-placeholder secondary-text-color">Email <span class="fourth-text-color">*</span></label>
                        </fieldset>
                        <fieldset class="primary-input-wrapper with-show-button light-text-size">
                            <!-- :rules="isRequired" -->
                            <Field name="password" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <input v-bind="field" v-model="passwordVmodel" required id="password" name="password" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="password" placeholder="">
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                            <label for="password" class="primary-placeholder secondary-text-color">Password <span class="fourth-text-color">*</span></label>
                            <button type="button" class="show-button" @click="this.$helper.toggleInput($event)">
                                <img src="@/assets/images/inputImages/showButton.svg" alt="show-hide-password">
                            </button>
                        </fieldset>
                        <fieldset class="primary-input-wrapper with-show-button light-text-size">
                            <!-- :rules="isRequired" -->
                            <Field name="password_confirmation" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <input v-bind="field" v-model="confirmPasswordVmodel" required id="password_confirmation" name="password_confirmation" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="password" placeholder="">
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                            <label for="password_confirmation" class="primary-placeholder secondary-text-color">Conform password <span class="fourth-text-color">*</span></label>
                            <button type="button" class="show-button" @click="this.$helper.toggleInput($event)">
                                <img src="@/assets/images/inputImages/showButton.svg" alt="show-hide-password">
                            </button>
                        </fieldset>
                    </fieldset>
                    <fieldset class="d-flex flex-column align-items-center" style="row-gap: 24px;">
                        <PrimaryBtnComponent class="w-100" btnType="submit" :disabled="isSubmitting">
                            <template v-slot:btnContent>
                                <p class="light-text-size third-text-color">
                                    Register
                                </p>
                            </template>
                        </PrimaryBtnComponent>
                        <p class="d-flex align-items-center column-gap-2">
                            <span class="light-text-size secondary-text-color">not a member?</span>
                            <router-link to="/login" class="light-text-size fourth-text-color poppins-500">Log in</router-link>
                        </p>
                    </fieldset>

                </Form>


                
            </div>
        </main>
    </div>
</template>
<script>
import PrimaryBtnComponent from '@/components/PrimaryBtnComponent.vue';
import * as yup from 'yup';
import router from "@/router";
import axios from 'axios';


export default {
    data(){
        return {
            passwordVmodel: "",
            confirmPasswordVmodel: "",
            loginSchema: {
                username: yup.string().min(3, "The username field must be at least 3 characters."),
                email: yup.string().email("The email field must be a valid email address.").min(3, "The email field must be at least 3 characters."),
                password: yup.string()
                    .trim()
                    .min(3, "The password field must be at least 3 characters.")
                    .required("Password is required"),
                password_confirmation: yup.string()
                    .trim()
                    .required("Please confirm your password")
                    .test("password-match", "Passwords do not match", function (value) {
                        // 'this.options.context' contains all other fields
                        return value === this.options.context.password;
                    }),
            }
        }
    },
    components: {
        PrimaryBtnComponent,
    },
    methods: {
        registerHandler(values, actions){
            // delay submitting
            // await new Promise(resolve => setTimeout(resolve, 4000));
            
            this.$store.dispatch("register", values).then((response) => {
                
                window.localStorage.setItem("BearerToken", response.data.token);
                window.localStorage.setItem("UserInfo", JSON.stringify(response.data.user));
                axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
                this.$store.state.userInfo = response.data.user;

                this.$router.push("/");
            }).catch((error) => {

                if(error?.response?.status == 422){
                    Object.entries(error.response.data.errors).forEach(([key, value]) => {
                        actions.setFieldError(key, value);
                    });
                }
            });
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
