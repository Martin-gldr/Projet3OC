// import fonction pour la modal
import { genererModalPhoto, openModal, removePhoto } from "./modal.js"

// import des projet en BDD => json
let reponse = await fetch("http://localhost:5678/api/works")
let works = await reponse.json()


// recupération des catégories 
const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json()


const tokenIn = window.localStorage.getItem("token")
const userID = window.localStorage.getItem("id")

// login ou logout 
const loginLink = document.getElementById("loginLink")
const logoutLink = document.getElementById("logoutLink")
// affichage mode edition 
const headerEdition = document.querySelector(".headerEdition")
const modifierLink = document.querySelector(".editionMesProjets a")




// creation des cards des projet 
export function genererWorks(works) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ''

    for (let i = 0; i < works.length; i++) {

        const figureElment = document.createElement("figure")


        let imgElement = document.createElement("img")
        imgElement.src = works[i].imageUrl
        let titleElement = document.createElement("figcaption")
        titleElement.innerText = works[i].title
    

        gallery.appendChild(figureElment)
        figureElment.appendChild(imgElement)
        figureElment.appendChild(titleElement)
    }
}
genererWorks(works)



if (tokenIn === null) {

    //affichage mode normal
    loginLink.classList.remove("hide")
    logoutLink.classList.add("hide")
    headerEdition.classList.add("hide")
    modifierLink.classList.add("hide")

    // CATEGORIES

    // ajout catégorie "tous"
    const divCategories = document.querySelector(".categories")
    const btnTous = document.createElement("button")
    btnTous.innerText = "Tous"
    btnTous.classList.add("btnHomePage")
    btnTous.id = 0
    divCategories.appendChild(btnTous)

    // creation des boutons catégories et filtre
    for (let i = 0; i < categories.length; i++) {
        const divCategories = document.querySelector(".categories")
        const btnElement = document.createElement("button")
        btnElement.innerText = categories[i].name
        btnElement.id = categories[i].name
        btnElement.classList.add("btnHomePage")
        divCategories.appendChild(btnElement)

        btnElement.addEventListener("click", () => {
            const worksFiltree = works.filter(function (work) {
                return work.categoryId === categories[i].id
            });
            document.querySelector(".gallery").innerHTML = ""
            genererWorks(worksFiltree)
            let btnListe = document.querySelectorAll("button")
            for (let i = 0; i < btnListe.length; i++) {
                btnListe[i].classList.remove("btnSelected")
            };
            btnElement.classList.toggle("btnSelected")
        })
    }

    btnTous.addEventListener("click", () => {
        const worksTous = works.filter(function (work) {
            return work
        });
        document.querySelector(".gallery").innerHTML = ""
        genererWorks(worksTous);
        let btnliste = document.querySelectorAll("button")
        for (let i = 0; i < btnliste.length; i++) {
            btnliste[i].classList.remove("btnSelected")
        };
        btnTous.classList.toggle("btnSelected")
    })

} else if (tokenIn != null) {
    // affichage mode édition
    modifierLink.classList.remove("hide")
    headerEdition.classList.remove("hide")
    logoutLink.classList.remove("hide")
    loginLink.classList.add("hide")
    logoutLink.addEventListener("click", () => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("id")
        location.href = "./index.html"
    })

    // Gestion Modal 
    modifierLink.addEventListener("click", async () => {
        const reponse = await fetch("http://localhost:5678/api/works")
        const newWorks = await reponse.json()
        openModal()
        genererModalPhoto(newWorks)
        removePhoto()

    })

}





