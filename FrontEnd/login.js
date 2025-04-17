
const divMsgErreur = document.querySelector(".erreur") 
const formulaireLogin = document.querySelector("#formLogin");
formulaireLogin.addEventListener("submit", function (event) {
 event.preventDefault();

const login = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=motDePasse]").value,
    }
    const chargeUtile = JSON.stringify(login)
       
    fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
    }).then(reponse => {
        if (reponse.status === 404){
            divMsgErreur.innerHTML=" "
            const emailIncorrect = document.createElement("p");
            emailIncorrect.innerText = "Votre email n'a pas de compte associé";
            divMsgErreur.appendChild(emailIncorrect);
            console.log("erreur de mail")

        }else if (reponse.status === 401){
            divMsgErreur.innerHTML=" "
            const mdpIncorrect = document.createElement("p");
            mdpIncorrect.innerText = "mot de passe incorrect";
            divMsgErreur.appendChild(mdpIncorrect);
            console.log("erreur de mdp")

        }else if(reponse.status=== 200){
        return reponse.json().then((user)=>{console.log(user);
       
            window.localStorage.setItem("token",user.token);
            window.localStorage.setItem("id",user.userId);
            location.href="./index.html"
        })
        }

    })
    
    
});

