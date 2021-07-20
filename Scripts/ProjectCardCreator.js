window.addEventListener("DOMContentLoaded", createProjects);


function createProjects() {
    fetch(".ProjectsTEST.json")
        .then(response => response.json())
        .then(data => addData(data))
        .catch(err => console.log("JSON load error:" + err))
    
    //Testing
    addData([{
        "name" : "Testing JSON", 
        "description" : "this is an example description",
        "tech" : "currently just text, but will change to images later",
        "imageSrc" : "../Images/Test-Image.png",
        "imageAlt" : "This is alt text",
        "linkText" : "Example Link",
        "linkSrc" : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
        "name" : "Testing JSON 2", 
        "description" : " 2this is an example description",
        "tech" : "currently just text, but will change to images later",
        "imageSrc" : "../Images/Test-Image.png",
        "imageAlt" : "This is alt text",
        "linkText" : "Example Link",
        "linkSrc" : "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }])
}

// $.getJSON(".Projects.json", function(data) {
//     //const projects = data.projects;
//     const projects = JSON.parse(data);
//     projects.forEach(project => {
//         projectPageElements = createElements();
//         addContent(project, projectPageElements[0], projectPageElements[1], projectPageElements[2], projectPageElements[3]);
//         addToDOM(projectPageElements[4]);
//     });
// });

function addData(data) {
    data.forEach(project => {
        addContentToDOM(project, createElements());
    });
}

function createElements() {
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

    //Assign classes
    cardContainer.classList.add("project-card-container");
    projectTech.classList.add("project-card-tech");
    card.classList.add("project-card");
    cardMain.classList.add("project-card-main");
    cardDesc.classList.add("project-card-desc");

    projectName.classList.add("project-card-title");
    projectImage.classList.add("project-card-image");
    projectLinksP.classList.add("project-card-links");
    projectLinks.classList.add("p-links");

    //Create card structure
    cardContainer.appendChild(projectName);
    cardContainer.appendChild(projectTech);
    cardContainer.appendChild(card);
    card.appendChild(cardMain);
    card.appendChild(cardDesc);

    projectTech.appendChild(projectTechText);
    cardMain.appendChild(projectImage);
    cardMain.appendChild(projectLinksP);
    cardDesc.appendChild(projectDesc);
    projectLinksP.appendChild(projectLinks);

    //Return obj with all elements
    return { name: projectName, desc: projectDesc, img: projectImage, links: projectLinks, container: cardContainer };
}


function addContentToDOM(projectData, pageElem) {
    let projectNameText = document.createTextNode(projectData.name);
    let projectDescText = document.createTextNode(projectData.description);

    pageElem.name.appendChild(projectNameText);
    pageElem.desc.appendChild(projectDescText);

    pageElem.img.src = projectData.imageSrc;
    pageElem.img.alt = projectData.imageAlt;

    pageElem.links.href = projectData.linkSrc;
    pageElem.links.innerText = projectData.linkText;

    //Add to DOM
    let mainDiv = document.getElementsByTagName("main");
    mainDiv[0].appendChild(pageElem.container);
}