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


//btn tous 

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