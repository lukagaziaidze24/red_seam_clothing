<template>
    <div class="dropDown-wrapper d-flex align-items-center" :style="{'--zIndex': zIndex}">
        <button :aria-expanded="isOpen" class="cursor-pointer" @click="toggleDropdown()">
            <slot name="dropdownHeader">

            </slot>
        </button>
        <div v-if="isOpen" class="dropdown-body primary-border" ref="body" :style="[{'--padding-block': paddingY}, {'--padding-inline': paddingX}]">
            <slot name="dropdownBody">

            </slot>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isOpen: false,
        }
    },
    props: {
        paddingY: {
            type: String,
            default: "16px",
        },
        paddingX: {
            type: String,
            default: "16px",
        },
        closeDropdown: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: Number,
            default: 50,
        }
    },
    watch: {
        closeDropdown: {
            handler(newVal){
                this.isOpen = false;
            }
        }
    },
    methods: {
        toggleDropdown(){
            this.isOpen = !this.isOpen;
            this.$emit("isDropdownOpen", this.isOpen);
        }
    }
}
</script>
<style lang="scss" scoped>
.dropDown-wrapper{
    position: relative;
    z-index: var(--zIndex);
    .dropdown-body{
        opacity: 0;
        width: max-content;
        position: absolute;
        top: 100%;
        right: 0;
        padding: var(--padding-block) var(--padding-inline);
        animation: bodyAnimation 300ms linear forwards;
        background-color: var(--primary-background-color);
    }
}
@keyframes bodyAnimation {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>