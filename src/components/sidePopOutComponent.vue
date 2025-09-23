<template>
    <aside v-if="isOpen" class="side-popout-wrapper">
        <div class="side-popout-content">
            <div class="d-flex align-items-center justify-content-between">
                <slot name="title">

                </slot>
                <img @click="closeCartSidePopout" src="@/assets/images/cartImages/cartClose.svg" class="cursor-pointer" alt="close Cart">
            </div>
            <slot name="sideContent">

            </slot>
        </div>
    </aside>
</template>
<script>
export default {
    data(){
        return {
            isOpen: false,
        }
    },
    props: {
        isOpenOuterToggler: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
        isOpenOuterToggler: {
            handler(newVal){
                this.isOpen = newVal;
            }
        }
    },
    methods: {
        closeCartSidePopout(){
            this.$store.state.isCartOpen = false;
        }
    }
}

</script>
<style lang="scss">
.side-popout-wrapper{
    z-index: 100;
    isolation: isolate;
    position: relative;
    width: 100%;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    animation: smoothAppear 0.3s ease-out forwards;
    .side-popout-content{
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(100%);
        width: 540px;
        height: 100%;
        background-color: var(--third-background-color);
        border: 1px solid var(--primary-border-color);
        animation: smoothContentAppear 0.3s ease-out forwards;
        padding: 40px;
    }
}
@keyframes smoothAppear {
    0%{
        background-color: transparent;
    }
    100%{
        background-color: var(--fourth-background-color);
    }
}
@keyframes smoothContentAppear {
    0%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0%);
    }
}
</style>