function hamburgerControl() {
    let links = document.getElementById("burger-dropdown-container");
    if (links.style.display === "block") 
        links.style.display = "none"; 
    else 
        links.style.display = "block";
}