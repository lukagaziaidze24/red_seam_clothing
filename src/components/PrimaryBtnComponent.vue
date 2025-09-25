<template>
    <button :disabled="disabled" :type="btnType" :style="[{'--padding-block': paddingY}, {'--padding-inline': paddingX}, {'--max-width': maxWidth}]" class="border-radius-10 w-100">
        <slot name="btnContent">

        </slot>
    </button>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: {
        btnType: {
            type: String,
            default: "button",
        },
        paddingY: {
            type: String,
            default: "14px",
        },
        paddingX: {
            type: String,
            default: "0px",
        },
        maxWidth: {
            type: String,
            default: "none",
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    }   
}
</script>
<style lang="scss" scoped>
button{
    background-color: var(--secondary-background-color);
    padding: var(--padding-block) var(--padding-inline);
    max-width: var(--max-width);
}
</style>