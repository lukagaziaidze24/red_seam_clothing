<template>
    <ul class="sizes-wrapper d-flex align-items-center" :style="{'--col-gap': columnGap}">
        <li v-for="(data, i) of sizeOptions" :class="['size-indicator-wrapper', 'border-radius-10', 'primary-border', {'selected': choosenSizeObj.size == data.size}, 'primary-transition', 'cursor-pointer']" @click="setSelectedSizeID(data)">
            <p class="standard-text-size poppins-400 primary-text-color">
                {{ data.size }}
            </p>
        </li>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            choosenSizeObj: {
                // size: "XL"
            },
        }
    },
    props: {
        columnGap: {
            type: String,
            default: "8px",
        },
        sizeOptions: {
            type: Array,
            default: [
                // {
                //     size: "XL",
                // }
            ],
            deep: true,
        }
    },
    mounted(){
        this.setSizeOnID(this.sizeOptions[0]?.size);
    },
    methods: {
        setSizeOnID(size){
            if(size){
                this.choosenSizeObj = {...this.sizeOptions.find((sizeObj) => sizeObj.size == size)};
                this.$emit("choosenNewSize", this.choosenSizeObj);
            }
        },
        setSelectedSizeID(sizeObj){
            this.choosenSizeObj = {...sizeObj};
            this.$emit("choosenNewSize", this.choosenSizeObj);
        },
    }
}
</script>
<style lang="scss">
.sizes-wrapper{
    column-gap: var(--col-gap);
    .size-indicator-wrapper{
        padding: 9px 30px;
        &.selected{
            border: 1px solid var(--primary-text-color);
            background-color: var(--third-background-color);
        }
    }
}
</style>