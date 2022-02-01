window.addEventListener("DOMContentLoaded", createProjects);


function createProjects() {
    fetch("./Resources/Projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
        .then(data => addProjects(data))
        .catch(err => console.log("JSON load error:" + err))

    fetch("./Resources/ProjectContents.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
        .then(data => addModals(data))
        .catch(err => console.log("JSON load error:" + err))
}


function addProjects(data) {
    let projectIndex = 1;
    data.forEach(project => {
        addCardContentToDOM(project, createCardElements(projectIndex));
        projectIndex++;
    });
}


function addModals(data) {
    let modalIndex = 1;
    data.forEach(project => {
        addModalContentToDOM(project, createModalElements(modalIndex));
        modalIndex++;
    });
}


function createCardElements(projectIndex) {
    //Define key variables
    let cardContainer = document.createElement("div");
    let projectTech = document.createElement("div");
    let card = document.createElement("div");
    let cardMain = document.createElement("div");
    let cardDesc = document.createElement("div");

    let projectName = document.createElement("h3");
    let projectTechText = document.createElement("p"); //Just for testing - will need to change to be images
    let projectImage = document.createElement("img");
    let projectLinksP = document.createElement("p");
    let projectLinks = document.createElement("a"); //Will need to change to support multiple links
    let projectDesc = document.createElement("p");
    let projectDetailsA = document.createElement("a");
    let projectDetailsButton = document.createElement("button")

    //Assign classes
    cardContainer.classList.add("project-card-container"); 
    if (projectIndex % 2 == 0)
        cardContainer.classList.add("project-inverted");

    projectTech.classList.add("project-card-tech");
    card.classList.add("project-card");
    cardMain.classList.add("project-card-main");
    cardDesc.classList.add("project-card-desc");

    projectName.classList.add("project-card-title");
    projectImage.classList.add("project-card-image");
    projectLinksP.classList.add("project-card-links");
    projectLinks.classList.add("p-links");
    projectDetailsButton.classList.add("project-button")

    //Create card structure
    cardContainer.appendChild(projectName);
    cardContainer.appendChild(projectTech);
    cardContainer.appendChild(card);
    card.appendChild(cardMain);
    card.appendChild(cardDesc);
    card.appendChild(projectDetailsButton);

    projectTech.appendChild(projectTechText);
    cardMain.appendChild(projectImage);
    cardMain.appendChild(projectLinksP);
    cardDesc.appendChild(projectDesc);
    projectLinksP.appendChild(projectLinks);
    // projectDetailsA.appendChild(projectDetailsButton);

    //Return obj with all elements
    return { name: projectName, desc: projectDesc, tech: projectTechText, img: projectImage, links: projectLinks, buttonLink : projectDetailsA, button: projectDetailsButton, container: cardContainer };
}


function addCardContentToDOM(projectData, pageElem) {
    pageElem.container.id = projectData.name.replaceAll(" ", "-") + "-container";

    let projectNameText = document.createTextNode(projectData.name);
    let projectDescText = document.createTextNode(projectData.description);
    let projectTechText = document.createTextNode(projectData.tech); //For testing?

    pageElem.name.appendChild(projectNameText);
    pageElem.desc.appendChild(projectDescText);
    pageElem.tech.appendChild(projectTechText); //Testing? - depends if going for text or images

    pageElem.img.src = projectData.imageSrc;
    pageElem.img.alt = projectData.imageAlt;

    pageElem.links.href = projectData.linkSrc;
    pageElem.links.innerText = projectData.linkText;

    // pageElem.buttonLink.href = projectData.buttonLink;
    pageElem.button.innerText = "Details";

    //Add to DOM
    let cardsContainer = document.getElementById("project-cards")
    cardsContainer.appendChild(pageElem.container)
    // let mainDiv = document.getElementsByTagName("main");
    // mainDiv[0].appendChild(pageElem.container);
}

// Modal structure
/*
<div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times;</span>
            <h2>Modal Header</h2>
        </div>
        <div class="modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
        </div>
    </div>
</div>
*/
function createModalElements() {



    //Define key variables
    let modalContainer = document.createElement("div");
    let modalContent = document.createElement("div");
    let modalHeader = document.createElement("div");
    let modalMain = document.createElement("div");

    let projectName = document.createElement("h2");
    let closeButton = document.createElement("span")
    let modalDesc =  document.createElement("div");
    //let modalText = document.createElement("p"); //Just for testing - will need to be able to support multiple pieces of text
    //let modalImage = document.createElement("img"); //Just for testing - will need to be able to support multiple pieces of text

    modalContainer.classList.add("modal-container");
    modalContent.classList.add("modal-content"); 
    modalHeader.classList.add("modal-header"); 
    modalMain.classList.add("modal-main"); 
    closeButton.classList.add("close-button");
    modalDesc.classList.add("modal-desc");
  
    //Create card structure
    modalContainer.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalMain);

    modalHeader.appendChild(closeButton);
    modalHeader.appendChild(projectName);

    modalMain.appendChild(modalDesc);
    //modalMain.appendChild(modalImage);

    return { name: projectName, desc: modalDesc,  button: closeButton, container: modalContainer };
}


function addModalContentToDOM(modalData, pageElem) {
    pageElem.container.id = modalData.name.replaceAll(" ", "-") + "-modal";

    const modalTitleText = document.createTextNode(modalData.name);
    //const modalText = document.createTextNode(modalData.text);
    const closeButtonText = document.createTextNode("x"); "&times;"

    pageElem.button.appendChild(closeButtonText);
    pageElem.name.appendChild(modalTitleText);
    //pageElem.text.appendChild(modalText);
    
    if (modalData.content != null) {
        addModalDescription(modalData.content, pageElem.desc); //pass in the description container 
    }

    //Add to DOM
    let modalContainer = document.getElementById("modal-boxes")
    modalContainer.appendChild(pageElem.container)

    setupModals();
}

function addModalDescription(desc, container) {
    //Create an overall container
    desc.forEach(section => {
        // console.log(section);
        //Create the container for each section
        let sectionContainer = document.createElement("div");
        sectionContainer.classList.add("modal-desc-section");

        //Add heading
        if (section.heading != "" && section.heading != null) {
            let heading = document.createElement("h3");
            heading.appendChild(document.createTextNode(section.heading));
            
            sectionContainer.appendChild(heading);
        }
        // Add text
        if (section.text != "" && section.text != null) {
            let text = document.createElement("p");
            text.appendChild(document.createTextNode(section.text));

            sectionContainer.appendChild(text);
        }
        //Add image
        if (section.imageSrc != "" && section.imageSrc != null) {
            let img = document.createElement("img");
            img.src = section.imageSrc;
            //Add alt text
            if (section.imageAlt != "" && section.imageAlt != null) {
                img.alt = section.imageAlt;
            }

            sectionContainer.appendChild(img);
        }
        //Add video
        if (section.video != "" && section.video != null) {
            let cont = document.createElement("div");
            cont.classList.add("iframe-container");
            let video = document.createElement("iframe");
            video.src = section.video;

            video.setAttribute("allowfullscreen", ""); //enables fullscreen for the built in video player
            cont.appendChild(video);
            sectionContainer.appendChild(cont);
        }
        //Add the section to the container
        container.appendChild(sectionContainer);
    });

    return container;
}

// This method is used to link the modals to the project buttons as well as setting the modals' event listeners
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