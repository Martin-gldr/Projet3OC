// import des projet en BDD => json
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
// recupération des catégories 
const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json();
console.log(categories)
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



// CATEGORIES

// ajout catégorie "tous"
const divCategories = document.querySelector(".categories");
const btnTous = document.createElement("button");
btnTous.innerText ="Tous"
btnTous.classList.add("btnHomePage")
btnTous.id = 0

divCategories.appendChild(btnTous)

// creation des boutons catégories 
for(let i = 0; i<categories.length;i++){
    const divCategories = document.querySelector(".categories");
    const BtnElement = document.createElement("button");
    BtnElement.innerText = categories[i].name;
    BtnElement.id = `btn.${categories[i].name}`;
    BtnElement.classList.add("btnHomePage");

    divCategories.appendChild(BtnElement)
}

// Filtre par catégorie

const btnObjet = document.getElementById("btn.Objets")
btnObjet.addEventListener("click",()=>{
   const worksObjet = works.filter(function(work){
    return work.categoryId === 1
   });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksObjet)
    //gestion style btn
        btnObjet.classList.remove("btnSelected") ;
        btnAppartements.classList.remove("btnSelected") ;
        btnHotelsRestorants.classList.remove("btnSelected") ;
        btnTous.classList.remove("btnSelected") ;
        btnObjet.classList.toggle("btnSelected")
})

const btnAppartements = document.getElementById("btn.Appartements")
btnAppartements.addEventListener("click",()=>{
   const worksAppartements = works.filter(function(work){
    return work.categoryId === 2
   });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksAppartements);
    // gestion style btn
        btnObjet.classList.remove("btnSelected") ;
        btnAppartements.classList.remove("btnSelected") ;
        btnHotelsRestorants.classList.remove("btnSelected") ;
        btnTous.classList.remove("btnSelected") ;
        btnAppartements.classList.toggle("btnSelected")
})
    

const btnHotelsRestorants = document.getElementById("btn.Hotels & restaurants")
btnHotelsRestorants.addEventListener("click",()=>{
   const worksHotelsRestaurants = works.filter(function(work){
    return work.categoryId === 3
   });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksHotelsRestaurants);
    // gestion style btn
        btnObjet.classList.remove("btnSelected") ;
        btnAppartements.classList.remove("btnSelected") ;
        btnHotelsRestorants.classList.remove("btnSelected") ;
        btnTous.classList.remove("btnSelected") ;
        btnHotelsRestorants.classList.toggle("btnSelected")
})


btnTous.addEventListener("click",()=>{
   const worksTous = works.filter(function(work){
    return work
   });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksTous);
    // gestion style btn
        btnObjet.classList.remove("btnSelected") ;
        btnAppartements.classList.remove("btnSelected") ;
        btnHotelsRestorants.classList.remove("btnSelected") ;
        btnTous.classList.remove("btnSelected") ;
        btnTous.classList.toggle("btnSelected")
})