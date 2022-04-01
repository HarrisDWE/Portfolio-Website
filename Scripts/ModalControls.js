// This method is used to link the modals to the project buttons as well as setting the modals' event listeners
window.addEventListener("DOMContentLoaded", setupModals)


function setupModals() {

    let projectButtons = document.getElementsByClassName("project-button");
    let modals = document.getElementsByClassName("modal-container");
    let closeButtons = document.getElementsByClassName("close-button");

    // console.log("Project Buttons: " + projectButtons.length);
    // console.log("Modals: " + projectButtons.length);
    // console.log("Close Buttons: " + closeButtons.length);

    if (projectButtons.length == modals.length) {
        for (i = 0; i < projectButtons.length; i++) {
    
            // Set the project details button to display the correct modal
            projectButtons.item(i).onclick = function() { projectButtonOnClick(this) };

            // Set the close button to close its respective modal
            closeButtons.item(i).onclick = function() { closeButtonOnClick(this) };
        }
    }
    else {
        // console.log("The number of modals does not match the number of projects!");
    }
}


function projectButtonOnClick(button) {
    let projectButtons = document.getElementsByClassName("project-button");
    let modals = document.getElementsByClassName("modal-container");
    
    //This is a horrible way of determining which modal is related to each button - come up with better way to do this.
    for (i = 0; i < projectButtons.length; i++) {
        if (button != projectButtons.item(i)) { continue; }

        modals.item(i).style.display = "block";
        break;
    }
}
function closeButtonOnClick(button) {
    let closeButtons = document.getElementsByClassName("close-button");
    let modals = document.getElementsByClassName("modal-container");

    //This is a horrible way of determining which modal is related to each button - come up with better way to do this.
    for (i = 0; i < closeButtons.length; i++) {
        if (button != closeButtons.item(i)) { continue; }

        modals.item(i).style.display = "none";
        break;
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    const modals = document.getElementsByClassName("modal-container");

    for (i = 0; i < modals.length; i++) {
        if (event.target == modals.item(i)) {
            modals.item(i).style.display = "none";
        }
    }
}