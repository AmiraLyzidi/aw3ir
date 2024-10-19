window.onload = function () {
    console.log("DOM ready!");


    window.validateForm = function (event) {
        event.preventDefault();
        const nom = document.getElementById("inputEmail4").value;
        const prenom = document.getElementById("inputPassword4").value;
        const email = document.getElementById("inputAddress").value;
        const birthday = document.getElementById("birthday").value;
        const birthdayDate = new Date(birthday);
        const nowTimestamp = Date.now();


        function showErrorModal(message) {
            document.getElementById("errorMessage").innerText = message;
            var myModal = new bootstrap.Modal(document.getElementById("errorModal"));
            myModal.show();
        }


        if (nom.length < 5 || prenom.length < 5) {
            showErrorModal("Le nom et le prénom doivent contenir au moins 5 caractères.");
            return false;
        }


        if (!validateEmail(email)) {
            showErrorModal("Veuillez entrer une adresse e-mail valide.");
            return false;
        }

        /
        if (birthdayDate.getTime() > nowTimestamp) {
            showErrorModal("La date de naissance ne peut pas être dans le futur.");
            return false;
        }

        alert("Formulaire soumis avec succès !");
        return true;
    };


    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
};
