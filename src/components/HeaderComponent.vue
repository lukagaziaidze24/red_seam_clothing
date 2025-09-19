<template>
    <header class="main-container">
        <nav class="d-flex align-items-center justify-content-between">
            <router-link to="/" class="d-flex align-items-center" style="column-gap: 4px;" title="products" aria-label="products page">
                <img src="@/assets/images/headerImages/logo.svg" alt="logo">
                <h1 class="poppins-600 primary-text-color">
                    Red Seam Clothing
                </h1>
            </router-link>
            <router-link v-if="this.$route.name == 'Register' || this.$route.name == 'Login'" to="/login" class="d-flex align-items-center column-gap-1 cursor-pointer">
                <img class="cursor-pointer" src="@/assets/images/headerImages/unknownProfile.svg" alt="cart" title="cart" aria-label="cart panel">
                <p style="font-size: 12px; line-height: 100%;" class="primary-text-color">login</p>
            </router-link>
            <div v-else class="d-flex align-items-center" style="column-gap: 20px;">
                <img class="cursor-pointer" src="@/assets/images/headerImages/cart.svg" alt="cart" title="cart" aria-label="cart panel">
                <img class="profile-image cursor-pointer" src="@/assets/images/headerImages/cart.svg" alt="profile" title="profile" aria-label="profile">
            </div>
        </nav>
    </header>
</template>
<style lang="scss">
header.main-container{
    padding: 28px 128px;
    background-color: var(--primary-background-color);
    h1{
        font-size: 16px;
        line-height: 100%;
    }
    .profile-image{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }
}
</style>
<script>
export default {
}
</script>