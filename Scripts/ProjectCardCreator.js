window.addEventListener("DOMContentLoaded", createProjects);


function createProjects() {
    //http://localhost:8000/Resources/Projects.json
    fetch("./Resources/Projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
        .then(data => addProjects(data))
        .catch(err => console.log("JSON load error:" + err))

    fetch("./Resources/Modals.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
        .then(data => addModals(data))
        .catch(err => console.log("JSON load error:" + err))
    
    //Hard code Testing
    // addProjects([{
    //     "name" : "Testing JSON", 
    //     "description" : "this is an example description",
    //     "tech" : "currently just text, but will change to images later",
    //     "imageSrc" : "../Images/Test-Image.png",
    //     "imageAlt" : "This is alt text",
    //     "linkText" : "Example Link",
    //     "linkSrc" : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    // },
    // {
    //     "name" : "Testing JSON 2", 
    //     "description" : " 2this is an example description",
    //     "tech" : "currently just text, but will change to images later",
    //     "imageSrc" : "../Images/Test-Image.png",
    //     "imageAlt" : "This is alt text",
    //     "linkText" : "Example Link",
    //     "linkSrc" : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    // }])
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
    // projectDetailsButton.classList.add("project-button")

    //Create card structure
    cardContainer.appendChild(projectName);
    cardContainer.appendChild(projectTech);
    cardContainer.appendChild(card);
    card.appendChild(cardMain);
    card.appendChild(cardDesc);
    card.appendChild(projectDetailsA);

    projectTech.appendChild(projectTechText);
    cardMain.appendChild(projectImage);
    cardMain.appendChild(projectLinksP);
    cardDesc.appendChild(projectDesc);
    projectLinksP.appendChild(projectLinks);
    projectDetailsA.appendChild(projectDetailsButton);

    //Return obj with all elements
    return { name: projectName, desc: projectDesc, tech: projectTechText, img: projectImage, links: projectLinks, buttonLink : projectDetailsA, button: projectDetailsButton, container: cardContainer };
}


function addCardContentToDOM(projectData, pageElem) {
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

    pageElem.buttonLink.href = projectData.buttonLink;
    pageElem.button.innerText = "Details";

    //Add to DOM
    let cardsContainer = document.getElementById("project-cards")
    cardsContainer.appendChild(pageElem.container)
    // let mainDiv = document.getElementsByTagName("main");
    // mainDiv[0].appendChild(pageElem.container);
}

function createModalElements(modalData, pageElem) {
    // <div id="myModal" class="modal">
    //                 <!-- Modal content -->
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <span class="close">&times;</span>
    //                         <h2>Modal Header</h2>
    //                     </div>
    //                     <div class="modal-body">
    //                         <p>Some text in the Modal Body</p>
    //                         <p>Some other text...</p>
    //                     </div>
    //                 </div>
    //             </div>


    //Define key variables
    let modalContainer = document.createElement("div");
    let modalContent = document.createElement("div");
    let modalHeader = document.createElement("div");
    let modalMain = document.createElement("div");

    let projectName = document.createElement("h2");
    let closeButton = document.createElement("span")
    let modalText = document.createElement("p"); //Just for testing - will need to be able to support multiple pieces of text
    let modalImage = document.createElement("img"); //Just for testing - will need to be able to support multiple pieces of text

    modalContainer.classList.add("modal-container");
    modalContent.classList.add("modal-content"); 
    modalHeader.classList.add("modal-header"); 
    modalMain.classList.add("modal-main"); 
    closeButton.classList.add("close")
  
    //Create card structure
    modalContainer.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalMain);

    modalHeader.appendChild(projectName);
    modalHeader.appendChild(closeButton);

    modalMain.appendChild(modalText);
    modalMain.appendChild(modalImage);

    return { name: projectName, text: modalText, img: modalImage, button: closeButton, container: modalContainer };
}


function addModalContentToDOM(modalData, pageElem) {
    let modalTitleText = document.createTextNode(modalData.name);
    let modalText = document.createTextNode(modalData.text);
    let closeButtonText = document.createTextNode("x"); "&times;"

    pageElem.button.appendChild(closeButtonText);
    pageElem.name.appendChild(modalTitleText);
    pageElem.text.appendChild(modalText);
    

    pageElem.img.src = modalData.imageSrc;
    pageElem.img.alt = modalData.imageAlt;

    //Add to DOM
    console.log(pageElem)
    let modalContainer = document.getElementById("modal-boxes")
    modalContainer.appendChild(pageElem.container)
}