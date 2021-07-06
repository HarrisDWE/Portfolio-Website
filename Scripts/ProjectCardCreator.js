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

//Add content
let projectNameText = document.createTextNode("Example Project Title (Using JS)");
let projectDescText = document.createTextNode("Example description (using JS). Bacon ipsum dolor amet chicken turducken porchetta pork loin t-bone strip steak. Filet mignon brisket beef strip steak prosciutto venison. Hamburger tail filet mignon strip steak tri-tip short ribs jerky doner bacon burgdoggen swine capicola porchetta ham hock. Shankle pork loin ham turducken frankfurter pig pancetta short ribs tail ground round. Shankle beef ribs flank kielbasa shank picanha. Tenderloin corned beef pork loin, hamburger kielbasa kevin fatback pork chop. T-bone boudin pork chislic ground round beef ribs.");

projectLinks.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
projectLinks.innerText = "link";

projectName.appendChild(projectNameText);
projectDesc.appendChild(projectDescText);
projectImage.src = "../Images/Test-Image.png";
projectImage.alt = "test image";

//add to page in proper place
let mainDiv = document.getElementsByTagName("main");
mainDiv[0].appendChild(cardContainer);