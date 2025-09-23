import axios from "axios";
import store from "./store";
import router from "./router";
export default {
    methods: {
        data(){
            return {
                validImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
                colorMap: {
                    White: "#edededff",
                    Red: "#FF0000",
                    Multi: "linear-gradient(45deg, red, yellow, green, blue)",
                    Blue: "#0000FF",
                    "Navy Blue": "#001F54",
                    Grey: "#808080",
                    Black: "#000000",
                    Purple: "#800080",
                    Orange: "#FFA500",
                    Beige: "#F5F5DC",
                    Pink: "#FFC0CB",
                    Green: "#008000",
                    Cream: "#FFFDD0",
                    Maroon: "#800000",
                    Brown: "#A52A2A",
                    Peach: "#FFE5B4",
                    "Off White": "#F8F8F0",
                    Mauve: "#E0B0FF",
                    Yellow: "#FFFF00",
                    Magenta: "#FF00FF",
                    Khaki: "#F0E68C",
                    Olive: "#808000",
                }
            }
        },
        toggleInput(event){
            let primaryInput = event.target.closest(".primary-input-wrapper").querySelector(".primary-input");
            if(primaryInput.getAttribute("type") == "password"){
                primaryInput.setAttribute("type", "text");
            }else{
                primaryInput.setAttribute("type", "password");
            }
        },
        isAvatarValid(file){
            let errorsArray = [];
            if(!this.data().validImageTypes.includes(file?.type)){
                errorsArray.push("The Avatar field must be a valid image format");
            }
            if(errorsArray.length > 0){
                return errorsArray;
            }
            return true;
        },
        handleUnauthenticatedUser(){
            window.localStorage.removeItem("BearerToken");
            window.localStorage.removeItem("userInfo");
            axios.defaults.headers.common.Authorization = ``;
            store.state.userInfo = null;
            router.push("/login");
        },
    }
}