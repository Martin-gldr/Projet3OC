// import fonction pour la modal
import { closeModal, genererPhoto, openModal, openAddModal } from "./modal.js";

// import des projet en BDD => json
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
// recupération des catégories 
const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json();


const userIn = window.localStorage.getItem("token")
console.log(userIn)
const UserID = window.localStorage.getItem("id")
console.log(UserID)
// login ou logout 
const loginLink = document.getElementById("loginLink")
const logoutLink = document.getElementById("logoutLink")
// affichage mode edition 
const headerEdition = document.querySelector(".headerEdition")
const ModifierLink = document.querySelector(".editionMesProjets a")




// creation des cards des projet 
function genererWorks (works){
    for(let i = 0; i< works.length; i++){
    const gallery = document.querySelector(".gallery")
    const figureElment = document.createElement("figure")


    let imgElement = document.createElement("img")
    imgElement.src = works[i].imageUrl
    let titleElement = document.createElement("figcaption")
    titleElement.innerText = works[i].title
    // figureElment.categoriesId = works[i].categoryId

    gallery.appendChild(figureElment)
    figureElment.appendChild(imgElement)
    figureElment.appendChild(titleElement)
    }
}
genererWorks(works)



if (userIn === null ){


    loginLink.classList.remove("hide")
    logoutLink.classList.add("hide")
    headerEdition.classList.add("hide")
    ModifierLink.classList.add("hide")

    // CATEGORIES

        // ajout catégorie "tous"
        const divCategories = document.querySelector(".categories");
        const btnTous = document.createElement("button");
        btnTous.innerText ="Tous"
        btnTous.classList.add("btnHomePage")
        btnTous.id = 0
        divCategories.appendChild(btnTous)

        // creation des boutons catégories et filtre
        for(let i = 0; i<categories.length;i++){
            const divCategories = document.querySelector(".categories");
            const BtnElement = document.createElement("button");
            BtnElement.innerText = categories[i].name;
            BtnElement.id = categories[i].name;
            BtnElement.classList.add("btnHomePage");
            divCategories.appendChild(BtnElement);
            
            BtnElement.addEventListener("click",()=>{
        const worksFiltree = works.filter(function(work){
                return work.categoryId === categories[i].id });
                document.querySelector(".gallery").innerHTML="";
                genererWorks(worksFiltree);
                let btnliste = document.querySelectorAll("button");
                for(let i=0; i<btnliste.length;i++){
                        btnliste[i].classList.remove("btnSelected")
                };
                BtnElement.classList.toggle("btnSelected")
            })
        }

        btnTous.addEventListener("click",()=>{
        const worksTous = works.filter(function(work){
            return work
        });
            document.querySelector(".gallery").innerHTML="";
            genererWorks(worksTous);
            let btnliste = document.querySelectorAll("button");
                for(let i=0; i<btnliste.length;i++){
                        btnliste[i].classList.remove("btnSelected")
                };
            btnTous.classList.toggle("btnSelected")
        }) 

} else if(userIn != null){
    ModifierLink.classList.remove("hide")
    headerEdition.classList.remove("hide")
    logoutLink.classList.remove("hide")
    loginLink.classList.add("hide")
    logoutLink.addEventListener("click",()=>{ 
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("id")
        console.log(userIn)
        console.log(UserID)
        location.href="./index.html"
    })

    // Gestion Modal 
    ModifierLink.addEventListener("click",()=>{
        
        openModal()
        genererPhoto(works)
        console.log(UserID)
       
        if (UserID === "1"){ 
        let removeButtonListe = document.querySelectorAll(".removeButton")
        for(let i=0; i<removeButtonListe.length;i++){
            removeButtonListe[i].addEventListener("click",()=>{
                console.log(removeButtonListe[i].id)
            })
        }}else if(UserID != 1){
            for(let i=0; i<removeButtonListe.length;i++){
                removeButtonListe[i].addEventListener("click",()=>{
                    console.log("Vous n'etes pas administrateur")
                })
        }}
        
    })
    
    
   

   

    


    
    

    
}





