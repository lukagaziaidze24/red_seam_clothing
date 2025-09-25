<template>
    <div class="carousel-grid-wrapper w-100" :style="{'--max-height': maxHeight}">
        <div class="images-scroll-wrapper">
            <ul class="d-flex flex-column align-items-stretch">
                <li v-for="(data, i) of imagesArray" @click="makeImageOnThumbnail(data)" :class="['image-wrapper', 'cursor-pointer', {'selected': data.id == choosenImageObj.id }]">
                    <img :src="data.imageURI" :alt="data.id" :aria-label="data.id">
                </li>
            </ul>
        </div>
        <div v-if="choosenImageObj?.id" class="thumbnail-wrapper">
            <img style="width: 100%; height: 100%;" :src="choosenImageObj.imageURI" :alt="choosenImageObj?.id" :aria-label="choosenImageObj?.id">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            choosenImageObj: {},
        }
    },
    props: {
        imagesArray: {
            type: Array,
            default: [
                // {
                //     "imageURI",
                //     id: "White"
                // }
            ]
        },
        maxHeight: {
            type: String,
            default: "937px",
        },
        // corresponds to the id prop in imagesArray>
        outsideChooseTrigger: { 
            type: String,
            default: "",
        }
    },
    watch: {
        outsideChooseTrigger: {
            handler(newVal){
                if(newVal != this.choosenImageObj.id){
                    this.choosenImageObj = {...this.imagesArray.find((imageObj) => imageObj.id == newVal)};
                }
            }
        }
    },
    mounted(){
        this.makeImageOnThumbnail(this.imagesArray[0]);
    },
    methods: {
        makeImageOnThumbnail(imageData){
            this.choosenImageObj = {...imageData};
            this.$emit("choosenNewImage", this.choosenImageObj);
        }
    }
}
</script>
<style lang="scss">
.carousel-grid-wrapper{
    display: grid;
    grid-template-columns: 120px auto;
    max-height: var(--max-height);
    height: 100%;
    column-gap: 24px;
    overflow: hidden;
    .images-scroll-wrapper{
        overflow-y: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        &::-webkit-scrollbar-thumb{
            display: none;
        }
        ul{
            row-gap: 9px;
            .image-wrapper{
                background-color: var(--third-background-color);
                border: 1px solid transparent;
                transition: all 300ms linear !important;
                &.selected{
                    border: 1px solid var(--secondary-background-color);
                }
                img{
                    mix-blend-mode: multiply;
                    width: 100%;
                    max-height: 160px;
                }
            }
        }
    }
    .thumbnail-wrapper{
        background-color: var(--third-background-color);
        img{
            mix-blend-mode: multiply;
            object-fit: cover;
        }
    }
}
</style>