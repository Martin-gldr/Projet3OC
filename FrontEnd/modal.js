export function openModal (){
    const modal = document.querySelector(".modal")
    modal.style.display = null 
    modal.addEventListener("click",closeModal)
    modal.querySelector(".modal-wrapper").addEventListener("click",stopPropagation)
}

function stopPropagation(e){
    e.stopPropagation()
}

export function closeModal(){
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    const galleryImage = document.querySelector(".galleryImage");
    galleryImage.innerHTML=''
}

export function genererPhoto(works){
    
    for(let i = 0; i< works.length; i++){
        const galleryImage = document.querySelector(".galleryImage");
        const imageElment = document.createElement("Image");


        let imgElement = document.createElement("img");
        imgElement.src = works[i].imageUrl;
        
        
        
        let trashElement = document.createElement("button");
        trashElement.innerText='X';
       

        galleryImage.appendChild(imageElment);
        imageElment.appendChild(trashElement);
        imageElment.appendChild(imgElement);
    
    
    }
        

}
