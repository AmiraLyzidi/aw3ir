window.onload = function () {
    console.log("DOM ready!");

    // Fonction de validation du formulaire
    window.validateForm = function (event) {
        event.preventDefault();

        const nom = document.getElementById("inputNom").value;
        const prenom = document.getElementById("inputPrenom").value;
        const email = document.getElementById("inputEmail").value;
        const birthday = document.getElementById("birthday").value;
        const address = document.getElementById("inputAddress").value;
        const birthdayDate = new Date(birthday);
        const nowTimestamp = Date.now();

        if (nom.length < 5 || prenom.length < 5) {
            alert("Le nom et le prénom doivent contenir au moins 5 caractères.");
            return false;
        }

        if (!validateEmail(email)) {
            alert("Veuillez entrer une adresse e-mail valide.");
            return false;
        }

        if (birthdayDate.getTime() > nowTimestamp) {
            alert("La date de naissance ne peut pas être dans le futur.");
            return false;
        }

        // Ajouter les informations dans le localStorage
        contactStore.add(nom, prenom, birthday, address, email);

        // Afficher la liste mise à jour
        displayContactList();

        alert("Formulaire soumis avec succès !");
        return true;
    };

    // Validation de l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Fonction pour afficher le nombre de caractères saisis
    window.calcNbChar = function (id) {
        document.querySelector(`#${id} + span`).textContent = document.querySelector(`#${id}`).value.length;
    };

    // Fonction pour afficher la liste des contacts dans le tableau
    function displayContactList() {
        const contactListString = localStorage.getItem('contactList'); // Récupérer la liste
        const contactList = contactListString ? JSON.parse(contactListString) : []; // Parse si elle existe

        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ''; // Vide le tableau avant de l'actualiser

        // Ajouter chaque contact dans le tableau
        for (const contact of contactList) {
            tbody.innerHTML += `
                <tr>
                    <td>${contact.name}</td>
                    <td>${contact.firstname}</td>
                    <td>${contact.date}</td>
                    <td>${contact.address}</td>
                    <td>${contact.email}</td>
                </tr>`;
        }
    }

    // Appeler la fonction lors du chargement de la page
    displayContactList();
};

// Contact Store pour stock
