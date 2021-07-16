const fs = require("fs");


fs.readFile("./Projects.json", "utf8", (err, data) => {
    if (err) {
        console.log(`Error reading projects json: ${err}`);
    }
    else {
        const projects = JSON.parse(data);

        projects.forEach(proj => {
            projectPageElements = createElements();
    
            addContent(projects, projectPageElements[0], projectPageElements[1], projectPageElements[2], projectPageElements[3]);
            addToDOM(projectPageElements[4]);

            console.log(`${proj.name}`);
            alert(proj.name);
        })
    }
});