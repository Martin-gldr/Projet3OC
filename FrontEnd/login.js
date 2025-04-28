let url = "http://localhost:5678/api/"
const divMsgErreur = document.querySelector(".erreur")
const formulaireLogin = document.querySelector("#formLogin")

formulaireLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    // recuperation des données
    const login = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=motDePasse]").value,
    }
    const chargeUtile = JSON.stringify(login)
    // gestion envoie des données
    fetch(url+"users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    }).then(reponse => {
        if (reponse.status === 404) {
            divMsgErreur.innerHTML = " "
            const emailIncorrect = document.createElement("p")
            emailIncorrect.innerText = "Votre email n'a pas de compte associé"
            divMsgErreur.appendChild(emailIncorrect)
            

        } else if (reponse.status === 401) {
            divMsgErreur.innerHTML = " "
            const mdpIncorrect = document.createElement("p")
            mdpIncorrect.innerText = "mot de passe incorrect"
            divMsgErreur.appendChild(mdpIncorrect)

        } else if (reponse.status === 200) {
            return reponse.json().then((user) => {

                window.localStorage.setItem("token", user.token)
                window.localStorage.setItem("id", user.userId)
                location.href = "./index.html"
            })
        }

    })


})

