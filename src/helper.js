export default {
    methods: {
        data(){
            return {
                validImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
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
    }
}