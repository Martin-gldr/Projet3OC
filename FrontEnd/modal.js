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
    const BtnFermer = document.querySelector(".modal-wrapper button")
    BtnFermer.addEventListener("click",closeModal)
    
   
}

function stopPropagation(e){
    e.stopPropagation()
}

export function closeModal(){
    
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    modal.removeEventListener("click", closeModal)
    const addPhotoBtn = document.querySelector(".modal-end-button")
    addPhotoBtn.removeEventListener("click",openAddModal)
    const BtnFermer = document.querySelector(".modal-wrapper button")
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
export function removePhoto(works){

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
    btnValider.innerText = "Valdier"

    // creation des élément de la modal ajout 
    const BodyModal = document.getElementById("modalBody")
    BodyModal.classList.remove("galleryImage")
    // div ajout image
    const imgAdd = document.createElement("div")
    imgAdd.classList.add("ImgAddDiv")
    const imgAddLogo = document.createElement("img")
    imgAddLogo.src = "./assets/icons/instagram.png"
    const imgAddbtn = document.createElement("button")
    imgAddbtn.innerText="+ Ajouter photo"
    const imgAddText = document.createElement("p")
    imgAddText.innerText="jpg, png 4mo max"
    imgAdd.appendChild(imgAddLogo)
    imgAdd.appendChild(imgAddbtn)
    imgAdd.appendChild(imgAddText)
    //le form 
    //la liste déroulante
    
    BodyModal.appendChild(imgAdd)


}
