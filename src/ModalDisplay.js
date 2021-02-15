const createNewContactLink = document.getElementById("create-new-contact-link");
const backgroundModal = document.getElementById("modal-display");
const modal = document.getElementById("modal-create-contact"); 
const firstNameInput = document.getElementById("first-name-input");
const saveContactButton = document.getElementById("save-contact-button");
const rowInputFields = document.getElementsByClassName("row-input-fields");
const clearInputButtonList = document.getElementsByClassName("clear-input");
const closeModalButton = document.getElementById("close-model-button");
const allInputContainDiv = document.getElementsByClassName("info-input")[0];
const allInputList = allInputContainDiv.getElementsByTagName("input");

const waitTill = (ms) => new Promise(resolve => setTimeout(resolve,ms));

createNewContactLink.addEventListener("click", (event) => {
    event.preventDefault();
    backgroundModal.classList.toggle("close-modal");
    firstNameInput.focus();
})

backgroundModal.addEventListener("click", (event) => {
    if(event.target.id === "modal-display") {
        backgroundModal.classList.toggle("close-modal");
    }
})

// modal.addEventListener("click", (event) => {
//     console.log(event);
// })

for(let elm of rowInputFields) {
    
    elm.addEventListener("mouseenter", (event) => {
        // cross button
        elm.children[2].classList.toggle("input-visibility-hidden");
    })

    elm.addEventListener("mouseleave", (event) => {
        // cross button
        elm.children[2].classList.toggle("input-visibility-hidden");
    })

    let tempPlaceholder = "";
    let inputAreas = elm.getElementsByTagName("input");

    for(let inp of inputAreas) {
        inp.addEventListener("focusin", async(event) => {
            tempPlaceholder = event.target.placeholder;
            event.target.placeholder = "";
            event.path[1].getElementsByTagName("span")[0]?.classList.toggle("input-visibility-hidden");
            await waitTill(400);
            // cross button
            event.path[2].getElementsByTagName("div")[2].style.visibility = "visible";
        })

        inp.addEventListener("focusout", async(event) => {
            event.target.placeholder = tempPlaceholder;
            tempPlaceholder = "";
            event.path[1].getElementsByTagName("span")[0]?.classList.toggle("input-visibility-hidden");
            await waitTill(300);
            // cross button
            event.path[2].getElementsByTagName("div")[2].style.visibility = "";
        })
    }
}

for(let clearButton of clearInputButtonList) {
    //console.log(clearButton);

    clearButton.addEventListener("click", (event) => {
        event.preventDefault();
        let inputAreaList = event.path[1].getElementsByTagName("input");
        //console.log(event.path[1]);
        for(let area of inputAreaList) {
            area.value = "";
        }
        
        let flag = false;

        for(let inp of allInputList) {
            if(inp.value !== "") {
                flag = true;
                break;
            }
        }

        if(!flag && saveContactButton.classList.contains("active-save-button")) {
            saveContactButton.classList.remove("active-save-button");
        }

    })
    
}

allInputContainDiv.addEventListener("input", () => {
    let flag = false;

    for(let inp of allInputList) {
        if(inp.value !== "") {
            flag = true;
            break;
        }
    }

    if(!flag && saveContactButton.classList.contains("active-save-button")) {
        saveContactButton.classList.remove("active-save-button");
    } else {
        if(!saveContactButton.classList.contains("active-save-button")) {
            saveContactButton.classList.add("active-save-button");
        }
    }
})


closeModalButton.addEventListener("click", () => {

    for(let inp of allInputList) {
        inp.value = "";
    }

    if(saveContactButton.classList.contains("active-save-button")) {
        saveContactButton.classList.remove("active-save-button");
    }

    backgroundModal.classList.toggle("close-modal");
})


const phoneInput = document.getElementsByClassName("phone-input")[0];
const phoneInputArea = phoneInput.getElementsByTagName("input")[0];

const phoneLabelInput = document.getElementsByClassName("phone-label-input")[0];

phoneInputArea.addEventListener("input", (event) => {
    if(event.target.value !== "") {
        phoneLabelInput.classList.remove("phone-label-input-display");
        phoneInput.style.width = "33%";
    }
    else {
        phoneLabelInput.classList.add("phone-label-input-display");
        phoneInputArea.focus();
        phoneInput.style.width = "";
    }
})
