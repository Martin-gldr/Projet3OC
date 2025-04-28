import { genererWorks } from "./projets.js"

// données 
const reponseCategories = await fetch("http://localhost:5678/api/categories")
const categories = await reponseCategories.json()

let reponse = await fetch("http://localhost:5678/api/works")
let works = await reponse.json();
const UserID = window.localStorage.getItem("id")
console.log(UserID)
const userIn = window.localStorage.getItem("token")
console.log(userIn)


// fonctions pour la modal

// ouverture de la modal gallerie
export function openModal() {
    const modal = document.querySelector(".modal")
    modal.style.display = null
    const modalTitle = document.querySelector(".modal h2")
    modalTitle.innerText = "Gallerie Photo"
    const modalBody = document.getElementById("modalBody")
    modalBody.classList.add("galleryImage")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation)
    const addPhotoBtn = document.querySelector(".modal-end-button")
    addPhotoBtn.innerText = "Ajouter une photo"

    addPhotoBtn.addEventListener("click", openAddModal)
    const BtnFermer = document.querySelector(".modal-close-button")
    BtnFermer.addEventListener("click", closeModal)

}

function stopPropagation(e) {
    e.stopPropagation()
}

export async function closeModal() {

    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    const backBtn = document.querySelector(".modal-back-button")
    backBtn.style.display = "none";
    modal.removeEventListener("click", closeModal)
    const addPhotoBtn = document.querySelector(".modal-end-button")
    addPhotoBtn.removeEventListener("click", openAddModal)
    addPhotoBtn.classList.remove("arret")
    const BtnFermer = document.querySelector(".modal-close-button")
    BtnFermer.removeEventListener("click", closeModal)
    clearModal()
}

export function genererPhoto(works) {
    const galleryImage = document.getElementById("modalBody")

    for (let i = 0; i < works.length; i++) {

        const imageElment = document.createElement("Image")


        let imgElement = document.createElement("img")
        imgElement.src = works[i].imageUrl;



        let trashElement = document.createElement("i")
        trashElement.classList.add("fa-solid")
        trashElement.classList.add("fa-trash-can")
        trashElement.classList.add("removeButton")
        trashElement.id = works[i].id

        galleryImage.appendChild(imageElment)
        imageElment.appendChild(trashElement)
        imageElment.appendChild(imgElement)


    }


}
export function removePhoto() {
    let removeButtonListe = document.querySelectorAll(".removeButton")
    for (let i = 0; i < removeButtonListe.length; i++) {
        removeButtonListe[i].addEventListener("click", () => {
            console.log(removeButtonListe[i].id)
            let removeID = removeButtonListe[i].id
            let url = "http://localhost:5678/api/works/" + removeID
            console.log(url)
            let token = userIn
            console.log(token)

            fetch(url, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }

            }).then(async res => {
                if (res.status === 401) {
                    console.log("erreur401")
                } else if (res.status === 500) {
                    console.log("erreur500")
                } else if (res.status < 300) {
                    const reponse = await fetch("http://localhost:5678/api/works")
                    const newWorks = await reponse.json();
                    const galleryImage = document.getElementById("modalBody")
                    galleryImage.innerHTML = ''
                    genererPhoto(newWorks)
                    removePhoto()
                    genererWorks(newWorks)
                    works = newWorks
                }
            })

        })
    }
}
export function clearModal() {
    const modalWrapper = document.querySelector(".modal-wrapper")
    const galleryImage = document.getElementById("modalBody");
    galleryImage.innerHTML = ''
    const modalTitle = modalWrapper.querySelector(".modal-wrapper h2")
    modalTitle.innerHTML = ''
    const modalWrapperBtn = document.querySelectorAll(".modal-end-button")
    modalWrapperBtn.innerHTML = ''

}

export function openAddModal() {
    clearModal()
    console.log("ok")
    const modalTitle = document.querySelector(".modal h2")
    modalTitle.innerHTML = 'Ajout Photo'
    const btnValider = document.querySelector(".modal-end-button")
    btnValider.removeEventListener("click", openAddModal)
    btnValider.innerText = "Valider"
    btnValider.classList.add("arret")
    const backBtn = document.querySelector(".modal-back-button")
    backBtn.style.display = null

    //fonction du bouton back
    backBtn.addEventListener("click", () => {
        backBtn.style.display = "none"
        clearModal()
        btnValider.classList.remove("arret")
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
    imgAdd.appendChild(imgAddLogo)
    imgAdd.appendChild(imgAddLabel)
    imgAdd.appendChild(imgAddText)
    //le form 

    const addForm = document.createElement("form")
    addForm.id = "addForm"
    addForm.appendChild(imgAdd)
    let addInput = document.createElement("input")
    addInput.type = "text"
    addInput.name = "title"
    addInput.id = "title"
    let labelInupt = document.createElement("label")
    labelInupt.innerText = "Titre"
    addForm.appendChild(labelInupt)
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


    BodyModal.appendChild(addForm)

    addPhoto()
}

function previewImage(e) {
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

    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
            image.src = e.target.result

        }

        reader.readAsDataURL(input.files[0])
    }

}

function addPhoto() {
    const inputTitre = document.getElementById("title")
    const inputPhoto = document.querySelector(".ImgAddDiv input")
    const btnValider = document.querySelector(".modal-end-button")
    let titreValide = false
    let photoValide = false

    inputTitre.addEventListener("change", () => {
        if (inputTitre.value === "") {
            titreValide = false
            btnValider.classList.add("arret")
        } else if (inputTitre.value != "") {
            titreValide = true
            if (titreValide === true && photoValide === true) {
                postPhoto()
            }
        }
    })
    inputPhoto.addEventListener("change", () => {
        if (inputPhoto.files) {
            photoValide = true
            if (titreValide === true && photoValide === true) {
                postPhoto()
            }
        } else {
            photoValide = false
            btnValider.classList.add("arret")

        }

    })
}

function postPhoto() {
    const btnValider = document.querySelector(".modal-end-button")
    btnValider.classList.remove("arret")
    const inputPhoto = document.querySelector(".ImgAddDiv input")
    let token = userIn
    let form = document.getElementById("addForm")
    btnValider.addEventListener("click", () => {

        const formData = new FormData(form)


        formData.append("image", inputPhoto.files[0])

        fetch("http://localhost:5678/api/works", {
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
                const reponse = await fetch("http://localhost:5678/api/works")
                const newWorks = await reponse.json()
                genererWorks(newWorks)
                works = newWorks
                location.href = "./index.html"

            }
        }
        )

    })

}
