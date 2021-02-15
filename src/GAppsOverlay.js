const gAppsIcon = document.getElementById("google-apps-option-icon");
//const bodyTag = document.getElementsByTagName("body")[0];
const gAppsOverlay = document.getElementById("google-app-overlay");
//console.log(gAppsIcon, bodyTag, gAppsOverlay);

let gAppsOverlayFlag = false;

function handleGAppsOverlay(event) {
    //console.log(event.target.id);

    let childList = [...gAppsOverlay.children];
    //console.log(childList)
    //console.log((event.target).closest("#google-app-overlay"))
    if((event.target).closest("#google-app-overlay") === null) {
        gAppsOverlay.classList.add("google-app-overlay-display");
        bodyTag.removeEventListener("click", handleGAppsOverlay);
    }
    //return !!bodyTag.onclick;
}

gAppsIcon.addEventListener("click", (event) => {
    if(gAppsOverlay.classList.contains("google-app-overlay-display")){
        bodyTag.click();
    }
    event.stopPropagation();

    if(gAppsOverlay.classList.contains("google-app-overlay-display")) {
        bodyTag.addEventListener("click", handleGAppsOverlay);
        gAppsOverlay.classList.remove("google-app-overlay-display");
    }
    else {
        handleGAppsOverlay(event);
    }
})
