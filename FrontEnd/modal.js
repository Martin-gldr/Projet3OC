import { genererWorks } from "./projets.js"

// données 
let url = "http://localhost:5678/api/"
const reponseCategories = await fetch(url+"categories")
const categories = await reponseCategories.json()

let reponse = await fetch(url+"works")
let works = await reponse.json();
const userId = window.localStorage.getItem("id")

const tokenIn = window.localStorage.getItem("token")


// fonctions pour la modal

// ouverture de la modal gallerie
export function openModal() {
    const modal = document.querySelector(".modal")
    modal.style.display = null
    const modalTitle = document.querySelector(".modal h2")
    modalTitle.innerText = "Galerie photo"
    const modalBody = document.getElementById("modalBody")
    modalBody.classList.add("galleryImage")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".outer-wrapper").addEventListener("click", stopPropagation)
    const modalEndBtn = document.querySelector(".modal-end-button")
    modalEndBtn.innerText = "Ajouter une photo"

    modalEndBtn.addEventListener("click", openAddModal)
    const modalCloseBtn = document.querySelector(".modal-close-button")
    modalCloseBtn.addEventListener("click", closeModal)

}
// gestion du click qui ferme
function stopPropagation(e) {
    e.stopPropagation()
}
// gestion fermeture modal
export async function closeModal() {

    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    const backBtn = document.querySelector(".modal-back-button")
    backBtn.style.display = "none";
    modal.removeEventListener("click", closeModal)
    const modalEndBtn = document.querySelector(".modal-end-button")
    modalEndBtn.removeEventListener("click", openAddModal)
    modalEndBtn.classList.remove("arret")
    const modalCloseBtn = document.querySelector(".modal-close-button")
    modalCloseBtn.removeEventListener("click", closeModal)
    clearModal()
}
// creer les photo dans la modal
export function genererModalPhoto(works) {
    const modalBody = document.getElementById("modalBody")

    for (let i = 0; i < works.length; i++) {

        const imageElment = document.createElement("Image")


        let imgElement = document.createElement("img")
        imgElement.src = works[i].imageUrl;



        let trashElement = document.createElement("i")
        trashElement.classList.add("fa-solid")
        trashElement.classList.add("fa-trash-can")
        trashElement.classList.add("removeButton")
        trashElement.id = works[i].id

        modalBody.appendChild(imageElment)
        imageElment.appendChild(trashElement)
        imageElment.appendChild(imgElement)


    }


}
// gestion suppression des photos dans la modal + dans la BDD
export function removePhoto() {
    let removeButtonListe = document.querySelectorAll(".removeButton")
    for (let i = 0; i < removeButtonListe.length; i++) {
        removeButtonListe[i].addEventListener("click", () => {
            let removeID = removeButtonListe[i].id
            let Url = url+"works/" + removeID
            let token = tokenIn

            fetch(Url, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            }).then(async res => {
                if (res.status === 401) {
                    const galleryImage = document.getElementById("modalBody")
                    let messageErreur = document.createElement("p")
                    messageErreur.innerText = "Erreur de supression"
                    galleryImage.appendChild(messageErreur)
                } else if (res.status === 500) {
                    const galleryImage = document.getElementById("modalBody")
                    let messageErreur = document.createElement("p")
                    messageErreur.innerText = "Le serveur a eu un problème "
                    galleryImage.appendChild(messageErreur)
                } else if (res.status < 300) {
                    const reponse = await fetch("http://localhost:5678/api/works")
                    const newWorks = await reponse.json();
                    const galleryImage = document.getElementById("modalBody")
                    galleryImage.innerHTML = ''
                    genererModalPhoto(newWorks)
                    removePhoto()
                    genererWorks(newWorks)
                    works = newWorks
                }
            })

        })
    }
}
// fonction pour nettoyer la modal
export function clearModal() {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = ''
    const modalTitle = modalWrapper.querySelector(".modal-wrapper h2")
    modalTitle.innerHTML = ''
    const modalEndBtn = document.querySelector(".modal-end-button") 
    modalEndBtn.removeEventListener("click",postPhoto)
    modalEndBtn.innerHTML = ''

}
// gestion de la partie ajout photo
export function openAddModal() {
    clearModal()
    // affichage
    const modalTitle = document.querySelector(".modal h2")
    modalTitle.innerHTML = 'Ajout photo'
    const modalEndBtn = document.querySelector(".modal-end-button")
    modalEndBtn.removeEventListener("click", openAddModal)
   
    modalEndBtn.innerText = "Valider"
    modalEndBtn.classList.add("arret")
    const backBtn = document.querySelector(".modal-back-button")
    backBtn.style.display = null

    //fonction du bouton back
    backBtn.addEventListener("click", () => {
        backBtn.style.display = "none"
        clearModal()
        modalEndBtn.classList.remove("arret")
        openModal()
        genererModalPhoto(works)
        removePhoto()

    })

    // creation des élément de la modal ajout 
    const modalBody = document.getElementById("modalBody")
    modalBody.classList.remove("galleryImage")
    // div ajout image
    const imgAddDiv = document.createElement("div")
    imgAddDiv.classList.add("ImgAddDiv")
    const imgAddLogo = document.createElement("img")
    imgAddLogo.src = "./assets/icons/Vector-4.png"
    imgAddLogo.classList.add("ImgAddLogo")
    const imgAddLabel = document.createElement("label")
    imgAddLabel.classList.add("imgAddLabel")
    const imgAddSpan = document.createElement("span")
    imgAddSpan.innerText = "+ Ajouter photo"
    const imgAddInput = document.createElement("input")
    imgAddInput.type = "file"
    imgAddInput.accept = "image/jpeg, image/png"
    imgAddInput.addEventListener('change', previewImage)
    imgAddLabel.appendChild(imgAddSpan)
    imgAddLabel.appendChild(imgAddInput)

    const imgAddText = document.createElement("p")
    imgAddText.innerText = "jpg, png: 4mo max"
    imgAddDiv.appendChild(imgAddLogo)
    imgAddDiv.appendChild(imgAddLabel)
    imgAddDiv.appendChild(imgAddText)
    //le form 

    const addForm = document.createElement("form")
    addForm.id = "addForm"
    addForm.appendChild(imgAddDiv)
    let addInput = document.createElement("input")
    addInput.type = "text"
    addInput.name = "title"
    addInput.id = "title"
    let labelAddInupt = document.createElement("label")
    labelAddInupt.innerText = "Titre"
    addForm.appendChild(labelAddInupt)
    addForm.appendChild(addInput)

    //la liste déroulante
    let selectCatégorie = document.createElement("select")
    selectCatégorie.name = "category"
    const labelSelect = document.createElement("label")
    labelSelect.classList.add("labelSelect")
    labelSelect.innerText = "Catégorie"


    for (let i = 0; i < categories.length; i++) {
        let optionCatégorie = document.createElement("option")
        optionCatégorie.value = categories[i].id
        optionCatégorie.innerText = categories[i].name
        selectCatégorie.appendChild(optionCatégorie)
    }
    const btnSelect = document.createElement("i")
    btnSelect.classList.add("fa-solid")
    btnSelect.classList.add("fa-chevron-down")
    labelSelect.appendChild(btnSelect)
    addForm.append(labelSelect)
    addForm.appendChild(selectCatégorie)
    // lien vers la div principale


    modalBody.appendChild(addForm)

    addPhoto()
}
// fonction pour previsualiser l'image 
function previewImage(e) {
    // gestion affichage
    const input = e.target
    const div = document.querySelector(".ImgAddDiv")
    const divLogo = document.querySelector(".ImgAddDiv img")
    divLogo.classList.add("hide")
    const divBtn = document.querySelector(".ImgAddDiv span")
    divBtn.classList.add("hide")
    const divP = document.querySelector(".ImgAddDiv p")
    divP.classList.add("hide")
    const label = document.querySelector(".imgAddLabel")
    label.classList.add("hide")
    const image = document.createElement("img")
    image.classList.add("previewImage")
    div.appendChild(image)
    const span = document.querySelector(".ImgAddDiv Span")
    // fonction pour lire le fichier

    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
            image.src = e.target.result

        }

        reader.readAsDataURL(input.files[0])
        console.log(input.files[0].size)
    }

}
// gestion de l'ajout d'une image 
function addPhoto() {
    const inputTitre = document.getElementById("title")
    const inputPhoto = document.querySelector(".ImgAddDiv input")
    const modalEndBtn = document.querySelector(".modal-end-button")
    const form = document.getElementById("addForm")
    let titreValide = false
    let photoValide = false

    // verifier si les champs sont remplis
    inputTitre.addEventListener("keyup", () => {
        if (inputTitre.value === "") {
            titreValide = false
            modalEndBtn.classList.add("arret")
        } else if (inputTitre.value != "") {
            titreValide = true
            if (titreValide === true && photoValide === true) {
               modalEndBtn.classList.remove("arret")
               modalEndBtn.addEventListener("click", postPhoto)
            }
        }
    })
    inputPhoto.addEventListener("change", () => {
        if (inputPhoto.files[0].size<4194304) {

            photoValide = true
            if (titreValide === true && photoValide === true) {
                modalEndBtn.classList.remove("arret")
                modalEndBtn.addEventListener("click", postPhoto)
            }
        } else if(inputPhoto.files[0].size>4194304) {
            let messageErreur = document.createElement("p")
            messageErreur.innerText = "image trop lourde"
            form.appendChild(messageErreur)

        } else {photoValide = false
            modalEndBtn.classList.add("arret")
        }

    })
}
// fonction pour poster la photo
function postPhoto() {
    
    const inputPhoto = document.querySelector(".ImgAddDiv input")
    let token = tokenIn
    let form = document.getElementById("addForm")
  

    const formData = new FormData(form)


    formData.append("image", inputPhoto.files[0])

    fetch(url+"works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    }
    ).then(async res => {
        if (res.status === 400) {
            let messageErreur = document.createElement("p")
            messageErreur.innerText = "Votre requète est mal formulée"
            form.appendChild(messageErreur)


        } else if (res.status === 401) {
            let messageErreur = document.createElement("p")
            messageErreur.innerText = "Vous n'etes pas authorisé à ajouter une image"
            form.appendChild(messageErreur)

        } else if (res.status === 500) {
            let messageErreur = document.createElement("p")
            messageErreur.innerText = "Un Problème serveur a eu lieu"
            form.appendChild(messageErreur)

        }
        else if (res.status === 201) {
            const reponse = await fetch(url+"works")
            const newWorks = await reponse.json()
            genererWorks(newWorks)
            works = newWorks
            location.href = "./index.html"

        }
    }
    )

    

}
