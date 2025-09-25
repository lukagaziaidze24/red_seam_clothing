<template>
    <div class="quantity-wrapper secondary-border">
        <img v-if="currentValue <= 1" class="cursor-pointer" src="@/assets/images/quantityComponentImages/minus.svg" alt="minus" title="decrease quantity">
        <img v-else @click="increaseOrDecreaseValue(-1)" class="cursor-pointer" src="@/assets/images/quantityComponentImages/minus-active.svg" alt="minus" title="decrease quantity">
        <p>{{ currentValue }}</p>
        <img @click="increaseOrDecreaseValue(1)" class="cursor-pointer" src="@/assets/images/quantityComponentImages/plus.svg" alt="plus" title="increase quantity">
    </div>
</template>
<script>
export default {
    data(){
        return {
            currentValue: 1,
        }
    },
    props: {
        outerValueObj: {
            type: Object,
            default: {},
        },
        id: {
            type: Number,
            default: null,
        }
    },
    mounted(){
        this.currentValue = this.outerValueObj.quantity;
    },
    methods: {
        increaseOrDecreaseValue(number){
            if(this.currentValue == 1 && number == -1){
                return;
            }
            this.currentValue += number;
            this.$emit("quantityValueChanged", {
                currentValue: this.currentValue,
                additionalInfo: {...this.outerValueObj},
                id: this.id,
            });
        }
    }
}
</script>
<style lang="scss">
.quantity-wrapper{
    padding: 5px 8px;
    border-radius: 22px;
    display: flex;
    column-gap: 8px;
}
</style>