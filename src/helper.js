export default {
    toggleInput(event){
        let primaryInput = event.target.closest(".primary-input-wrapper").querySelector(".primary-input");
        if(primaryInput.getAttribute("type") == "password"){
            primaryInput.setAttribute("type", "text");
        }else{
            primaryInput.setAttribute("type", "password");
        }
    },
}