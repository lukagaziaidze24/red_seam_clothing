<template>
    <button :type="bntType" :style="[{'--padding-block': paddingY}, {'--padding-inline': paddingX}]" class="border-radius-10 w-100">
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
        bntType: {
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
    }   
}
</script>
<style lang="scss" scoped>
button{
    background-color: var(--secondary-background-color);
    padding: var(--padding-block) var(--padding-inline);
}
</style>