<template>
    <header class="main-container with-padding">
        <nav class="d-flex align-items-center justify-content-between">
            <router-link to="/" class="d-flex align-items-center" style="column-gap: 4px;" title="products" aria-label="products page">
                <img src="@/assets/images/headerImages/logo.svg" alt="logo">
                <h1 class="poppins-600 standard-text-size primary-text-color">
                    Red Seam Clothing
                </h1>
            </router-link>
            <router-link v-if="this.$route.name == 'Register' || this.$route.name == 'Login'" to="/login" class="d-flex align-items-center column-gap-1 cursor-pointer">
                <img class="cursor-pointer" src="@/assets/images/headerImages/unknownProfile.svg" alt="cart" title="cart" aria-label="cart panel">
                <p class="primary-text-color before-light-text-size poppins-500">login</p>
            </router-link>
            <div v-else class="d-flex align-items-center" style="column-gap: 20px;">
                <img @click="openCartSidePopout" class="cursor-pointer" src="@/assets/images/headerImages/cart.svg" alt="cart" title="cart" aria-label="cart panel" :aria-expanded="this.$store.state.isCartOpen">
                <img v-if="userInfo?.avatar" class="profile-image cursor-pointer" :src="userInfo?.avatar??null" alt="profile" title="profile" aria-label="profile">
                <router-link v-else to="/login">
                    <img class="profile-image cursor-pointer" src="@/assets/images/headerImages/unknownProfile.svg" alt="profile" :title="`${userInfo?.username}`" aria-label="profile">
                </router-link>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters({
            userInfo: "getUserInfo"
        })
    },
    methods: {
        openCartSidePopout(){
            this.$store.state.isCartOpen = true;
        }
    }
}
</script>
<style lang="scss">
header.main-container{
    &.with-padding{
        padding: 28px 128px;
    }
    background-color: var(--primary-background-color);
    .profile-image{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
    }
}
</style>