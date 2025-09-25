<template>
    <div class="carousel-grid-wrapper w-100" :style="{'--height': height}">
        <div class="images-scroll-wrapper primary-scrollbar with-padding">
            <ul class="d-flex flex-column align-items-stretch">
                <li v-for="(data, i) of imagesArray" @click="makeImageOnThumbnail(data, i)" :class="['image-wrapper', 'cursor-pointer', {'selected': data.id == choosenImageObj.id }]">
                    <img :src="data.imageURI" :alt="data.id" :aria-label="data.id">
                </li>
            </ul>
        </div>

        <ul id="thumbnails-scroll-wrapper" class="thumbnails-scroll-wrapper">
            <li v-for="(data, i) of imagesArray">
                <img :src="data.imageURI" :alt="data.id" :aria-label="data.id">
            </li>
        </ul>
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
        height: {
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
                    let elementIndex = this.imagesArray.findIndex((imageObj) => {return imageObj.id == newVal});

                    let scrollContext = document.getElementById("thumbnails-scroll-wrapper");
                    let thumbnailElements = Array.from(scrollContext.children);
                    

                    thumbnailElements[elementIndex].scrollIntoView(
                        { behavior: "smooth", block: "center", inline: "start", container: "nearest" }
                    );
                    this.choosenImageObj = {...this.imagesArray.find((imageObj) => imageObj.id == newVal)};

                    this.$emit("choosenNewImage", this.choosenImageObj);
                }
            }
        }
    },
    mounted(){
        this.makeImageOnThumbnail(this.imagesArray[0], 0);
    },
    methods: {
        makeImageOnThumbnail(imageData, elementIndex){
            let scrollContext = document.getElementById("thumbnails-scroll-wrapper");
            let thumbnailElements = Array.from(scrollContext.children);
            

            thumbnailElements[elementIndex].scrollIntoView(
                { behavior: "smooth", block: "center", inline: "start", container: "nearest" }
            );

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
    height: var(--height);
    column-gap: 24px;
    overflow: hidden;

    .images-scroll-wrapper{
        overflow-y: auto;
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

    .thumbnails-scroll-wrapper{
        width: 100%;
        height: calc(var(--height) - 1px);
        overflow: hidden;
        li{
            width: 100%;
            height: 100%;
            img{
                mix-blend-mode: multiply;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }



}
</style>