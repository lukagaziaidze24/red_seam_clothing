<template>
    <ul class="colors-wrapper d-flex align-items-center" :style="{'--col-gap': columnGap}">
        <li v-for="(data, i) of colorOptions" :aria-label="choosenColorObj.id" :class="['color-indicator-border', {'selected': choosenColorObj.id == data.id}, 'primary-transition', 'cursor-pointer']" :style="{'--color': data.color}" @click="setSelectedColorID(data)">
            <div class="color-indicator-border-helper primary-transition">
                <div class="color-indicator-core">
    
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            choosenColorObj: {},
        }
    },
    props: {
        columnGap: {
            type: String,
            default: "13px",
        },
        colorOptions: {
            type: Array,
            default: [
                // {
                //     color: "#78878",
                //     id: "White"
                // }
            ],
            deep: true,
        },
        // corresponds to the id prop in colorOptions>
        outsideChooseTrigger: { 
            type: String,
            default: "",
        }
    },
    watch: {
        outsideChooseTrigger: {
            handler(newVal){
                if(newVal != this.choosenColorObj.id){
                    this.choosenColorObj = {...this.colorOptions.find((colorObj) => colorObj.id == newVal)};
                    this.$emit("choosenNewColor", this.choosenColorObj);
                }
            }
        }
    },
    mounted(){
        this.setColorOnID(this.colorOptions[0]?.id);
    },
    methods: {
        setColorOnID(id){
            if(id){
                this.choosenColorObj = {...this.colorOptions.find((colorObj) => colorObj.id == id)};
                this.$emit("choosenNewColor", this.choosenColorObj);
            }
        },
        setSelectedColorID(colorObj){
            this.choosenColorObj = {...colorObj};
            this.$emit("choosenNewColor", this.choosenColorObj);
        },
    },
}
</script>
<style lang="scss">
.colors-wrapper{
    column-gap: var(--col-gap);
    .color-indicator-border{
        position: relative;
        width: 48px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        // overflow: hidden;
        // border: 1px solid var(--color);
        background: var(--color);

        &.selected{
            width: 48px;
            .color-indicator-border-helper{
                width: 45px;
            }
            
        }
        .color-indicator-border-helper{
            width: 52px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-color: var(--primary-background-color);
            .color-indicator-core{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 38px;
                height: 38px;
                border-radius: 50%;
                background: var(--color);
            }
        }
    }
}
</style>