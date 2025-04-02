// import des projet en BDD => json
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
// recupération des catégories 
const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json();
console.log(categories)
// creation des cards des projet 
for(let i = 0; i< works.length; i++){
const gallery = document.querySelector(".gallery")
const figureElment = document.createElement("figure")


let imgElement = document.createElement("img")
imgElement.src = works[i].imageUrl
let titleElement = document.createElement("figcaption")
titleElement.innerText = works[i].title

gallery.appendChild(figureElment)
figureElment.appendChild(imgElement)
figureElment.appendChild(titleElement)
}

// creation des boutons catégories 



