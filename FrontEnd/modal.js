// données 
const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json();

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
const UserID = window.localStorage.getItem("id")
console.log(UserID)
const userIn = window.localStorage.getItem("token")
console.log(userIn)


// fonctions pour la modal
export function openModal (){ 
    const modal = document.querySelector(".modal")
    modal.style.display = null 
    const modalTitle = document.querySelector(".modal h2")
    modalTitle.innerText="Gallerie Photo"
    const modalBody =document.getElementById("modalBody")
    modalBody.classList.add("galleryImage")
    modal.addEventListener("click",closeModal)
    modal.querySelector(".modal-wrapper").addEventListener("click",stopPropagation)
    const addPhotoBtn = document.querySelector(".modal-end-button")
    addPhotoBtn.innerText="Ajouter une photo"

    addPhotoBtn.addEventListener("click",openAddModal)
    const BtnFermer = document.querySelector(".modal-close-button")
    BtnFermer.addEventListener("click",closeModal)
    
   
}

function stopPropagation(e){
    e.stopPropagation()
}

export function closeModal(){
    
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    const backBtn=document.querySelector(".modal-back-button")
    backBtn.style.display = "none";
    modal.removeEventListener("click", closeModal)
    const addPhotoBtn = document.querySelector(".modal-end-button")
    addPhotoBtn.removeEventListener("click",openAddModal)
    const BtnFermer = document.querySelector(".modal-close-button")
    BtnFermer.removeEventListener("click",closeModal)
    clearModal()
}

export function genererPhoto(works){
    
    for(let i = 0; i< works.length; i++){
        const galleryImage = document.getElementById("modalBody");
        const imageElment = document.createElement("Image");


        let imgElement = document.createElement("img");
        imgElement.src = works[i].imageUrl;
        
        
        
        let trashElement = document.createElement("button");
        trashElement.innerText='X';
        trashElement.classList.add("removeButton")
        trashElement.id= works[i].id

        galleryImage.appendChild(imageElment);
        imageElment.appendChild(trashElement);
        imageElment.appendChild(imgElement);
    
    
    }
        

}
export function removePhoto(){
    if (UserID === "1"){ 
    let removeButtonListe = document.querySelectorAll(".removeButton")
    for(let i=0; i<removeButtonListe.length;i++){
        removeButtonListe[i].addEventListener("click",()=>{
            console.log(removeButtonListe[i].id)
            let removeID = removeButtonListe[i].id
            let url = "http://localhost:5678/api/works/"+removeID
            console.log(url)
            let token = userIn
            console.log(token)

            fetch(url,{
                method:"DELETE",
                headers:{
                    'Autorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }

                }).then(res => {
                if (res.status===401){
                    console.log("erreur401")
                }else if(res.status===500){
                    console.log("erreur500")
                }else if(res.status===200){
                    console.log("item supprimé")
                }
            })          

        })
    }}else if(UserID != 1){
        for(let i=0; i<removeButtonListe.length;i++){
            removeButtonListe[i].addEventListener("click",()=>{
                console.log("Vous n'etes pas administrateur")
        })
    }
}

}
export function clearModal(){
    const modalWrapper = document.querySelector(".modal-wrapper")
    const galleryImage = document.getElementById("modalBody");
    galleryImage.innerHTML=''
    const modalTitle = modalWrapper.querySelector(".modal-wrapper h2")
    modalTitle.innerHTML=''
    const modalWrapperBtn = document.querySelectorAll(".modal-end-button")
    modalWrapperBtn.innerHTML=''
    
}

export function openAddModal(){
    clearModal()
    console.log("ok")
    const modalTitle = document.querySelector(".modal h2")
    modalTitle.innerHTML='Ajout Photo'
    const btnValider = document.querySelector(".modal-end-button")
    btnValider.removeEventListener("click",openAddModal)
    btnValider.innerText = "Valider"
    const backBtn=document.querySelector(".modal-back-button")
    backBtn.style.display = null

    //fonction du bouton back
    backBtn.addEventListener("click",()=>{
        backBtn.style.display="none"
        clearModal()
        openModal()
        genererPhoto(works)
        removePhoto()
        
    })

    // creation des élément de la modal ajout 
    const BodyModal = document.getElementById("modalBody")
    BodyModal.classList.remove("galleryImage")
    // div ajout image
    const imgAdd = document.createElement("div")
    imgAdd.classList.add("ImgAddDiv")
    const imgAddLogo = document.createElement("img")
    imgAddLogo.src = "./assets/icons/instagram.png"
    imgAddLogo.classList.add("ImgAddLogo")
    const imgAddLabel= document.createElement("label")
    const imgAddSpan = document.createElement("span")
    imgAddSpan.innerText="+ Ajouter photo"
    const imgAddInput = document.createElement("input")
    imgAddInput.type = "file"
    imgAddInput.accept="image/jpeg, image/png"
    imgAddInput.addEventListener('change',previewImage)
    imgAddLabel.appendChild(imgAddSpan)
    imgAddLabel.appendChild(imgAddInput)

    const imgAddText = document.createElement("p")
    imgAddText.innerText="jpg, png 4mo max"
    imgAdd.appendChild(imgAddLogo)
    imgAdd.appendChild(imgAddLabel)
    imgAdd.appendChild(imgAddText)
    //le form 
   
    const addForm = document.createElement("form")
    let addInput = document.createElement("input")
    addInput.type="text"
    addInput.name="titre"
    addInput.id="titre"
    let labelInupt = document.createElement("label")
    labelInupt.innerText="Titre"
    addForm.appendChild(labelInupt)
    addForm.appendChild(addInput)
    
    //la liste déroulante
    let selectCatégorie = document.createElement("select")
    selectCatégorie.id="catégorie"
    selectCatégorie.name="catégorie"
    const labelSelect = document.createElement("label")
    labelSelect.innerText="Catégorie"

    
    for(let i=0; i<categories.length;i++){
        let optionCatégorie = document.createElement("option")
        optionCatégorie.value =categories[i].name
        optionCatégorie.innerText=categories[i].name
        selectCatégorie.appendChild(optionCatégorie)
    }
    addForm.append(labelSelect)
    addForm.appendChild(selectCatégorie)
    // lien vers la div principale

    BodyModal.appendChild(imgAdd)
    BodyModal.appendChild(addForm)

}

function previewImage (e){
    const input = e.target
    const div = document.querySelector(".ImgAddDiv")
    div.innerHTML=''
    const image = document.createElement("img")
    image.classList.add("previewImage")
    div.appendChild(image)
    const span = document.querySelector(".ImgAddDiv Span")

    if(input.files && input.files[0]){
        const reader = new FileReader();
        reader.onload = function (e){
            image.src = e.target.result

        }
        
        reader.readAsDataURL(input.files[0])
    }

}