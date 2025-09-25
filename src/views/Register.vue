<template>
    <div class="main-container d-flex justify-content-stretch align-items-center" style="margin-top: 72px;">
        <section class="background-section w-50" title="background image" aria-label="register background image">
        </section>
        <main class="d-flex justify-content-center w-50">
            <div class="d-flex flex-column align-items-stretch justify-content-start">
                <h2 class="extra-large-text primary-text-color poppins-600">
                    Register
                </h2>

                <Form ref="registerForm" :validation-schema="loginSchema" @submit="registerHandler" v-slot="{isSubmitting, values}" class="d-flex flex-column align-items-stretch" style="row-gap: 46px;">
                    
                    <fieldset class="d-flex flex-column align-items-stretch" style="row-gap: 24px;">
                        <fieldset class="d-flex flex-column align-items-start">
                            <fieldset class="d-flex align-items-center" style="column-gap: 15px;">
                                <label for="avatar" class="primary-form-file-input-label">
                                    <div class="photo-preview-wrapper">
                                        <img v-if="!this.avatarImageSrcHolder" src="@/assets/images/registerImages/unknownAvatar.svg" alt="profile photo preview">
                                        <img v-if="this.avatarImageSrcHolder" style="width: 100%; height: 100%; object-fit: cover;" :src="this.avatarImageSrcHolder" alt="Avatar">
                                    </div>
                                    <p v-if="!this.avatarImageSrcHolder" class="light-text-size poppins-400 secondary-text-color" id="upload-text">Upload image</p>
                                    <p v-if="this.avatarImageSrcHolder" class="light-text-size poppins-400 secondary-text-color" aria-label="upload new image">Upload new</p>
                                </label>
                                <p v-if="this.avatarImageSrcHolder" @click="removeAvatarImage()" class="light-text-size poppins-400 secondary-text-color cursor-pointer" aria-label="remove image">Remove</p>
                            </fieldset>


                            <!-- :rules="isPhotoUploadedValid" -->
                            <Field name="avatar" value="" :validateOnInput="true" v-slot="{ field, errors, handleChange, handleBlur, errorMessage, meta, isSubmitting }">
                                <input ref="avatar" aria-labelledby="upload-text" @change="handleChange" @blur="handleBlur" type="file" accept="image/*" id="avatar" class="primary-form-file-input">
                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>
                        <fieldset class="primary-input-wrapper light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="username" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="username" name="username" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="text" placeholder="">
                                    <label for="username" class="primary-placeholder secondary-text-color">Username <span class="fourth-text-color">*</span></label>
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
                            <Field name="email" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="email" name="email" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="email" placeholder="">
                                    <label for="email" class="primary-placeholder secondary-text-color">Email <span class="fourth-text-color">*</span></label>
                                </div>

                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>
                        <fieldset class="primary-input-wrapper with-show-button light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="password" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="password" name="password" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="password" placeholder="">
                                    <label for="password" class="primary-placeholder secondary-text-color">Password <span class="fourth-text-color">*</span></label>
                                    <button type="button" class="show-button" @click="this.$helper.methods.toggleInput($event)">
                                        <img src="@/assets/images/inputImages/showButton.svg" alt="show-hide-password">
                                    </button>
                                </div>

                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>
                        <fieldset class="primary-input-wrapper with-show-button light-text-size poppins-400">
                            <!-- :rules="isRequired" -->
                            <Field name="password_confirmation" value="" :validateOnInput="true" v-slot="{ field, errors, errorMessage, meta, isSubmitting }">
                                <div class="actuall-input-wrapper">
                                    <input v-bind="field" required id="password_confirmation" name="password_confirmation" autocomplete="on" :class="['primary-input', 'secondary-text-color', {'invalid': errors.length > 0}]" type="password" placeholder="">
                                    <label for="password_confirmation" class="primary-placeholder secondary-text-color">Confirm password <span class="fourth-text-color">*</span></label>
                                    <button type="button" class="show-button" @click="this.$helper.methods.toggleInput($event)">
                                        <img src="@/assets/images/inputImages/showButton.svg" alt="show-hide-password">
                                    </button>
                                </div>

                                <ul class="d-flex flex-column gap-1 mt-1">
                                    <li v-for="(errorMsg, i) of errors" class="primary-form-msg poppins-300 fourth-text-color">
                                        <p>{{ errorMsg }}</p>
                                    </li>
                                </ul>
                            </Field>
                        </fieldset>
                    </fieldset>
                    <fieldset class="d-flex flex-column align-items-center" style="row-gap: 24px;">
                        <PrimaryBtnComponent class="w-100" btnType="submit" :disabled="isSubmitting">
                            <template v-slot:btnContent>
                                <p class="light-text-size poppins-400 third-text-color">
                                    Register
                                </p>
                            </template>
                        </PrimaryBtnComponent>
                        <p class="d-flex align-items-center column-gap-2">
                            <span class="light-text-size poppins-400 secondary-text-color">Already member?</span>
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
            avatarImageSrcHolder: null,
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
                avatar: (file) => {
                    if(!file){
                        return true;
                    }
                    let isAvatarValid = this.$helper.methods.isAvatarValid(file);
                    
                    if(isAvatarValid === true){
                        let avatarBlob = new Blob([file], {
                            type: file?.type,
                        });
                        this.avatarImageSrcHolder = URL.createObjectURL(avatarBlob);
                    }else{
                        this.clearAvatarImage();
                    }

                    return isAvatarValid;
                }
            },
        }
    },
    components: {
        PrimaryBtnComponent,
    },
    methods: {
        removeAvatarImage(){
            if(this.$refs?.registerForm){
                this.$refs?.registerForm?.setFieldValue("avatar", "");
                
            }
            if(this.$refs?.avatar){
                this.$refs.avatar.value = '';
            }
            this.clearAvatarImage();
        },
        clearAvatarImage(){

            URL.revokeObjectURL(this.avatarImageSrcHolder);
            this.avatarImageSrcHolder = null;
        },
        async registerHandler(values, actions){
            // delay submitting
            // await new Promise(resolve => setTimeout(resolve, 4000));
            

            await new Promise(async (resolve) => {

                await this.$store.dispatch("register", values).then((response) => {
                    
                    window.localStorage.setItem("BearerToken", response.data.token);
                    window.localStorage.setItem("userInfo", JSON.stringify(response.data.user));
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
                resolve();
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
    }
}
</style>
