// Demande la localisation de l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.querySelector("#map").innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

// Si l'utilisateur l'autorise, on récupère les coordonnées
function showPosition(position) {
    const latlon = position.coords.latitude + "," + position.coords.longitude;
    const img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

    // Affiche la carte dans la div #map
    document.querySelector("#map").innerHTML = `<img src='${img_url}' alt="Carte de position">`;

    // Remplace l'adresse dans le champ inputAddress
    document.getElementById("inputAddress").value = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
}

// Gestion des erreurs de géolocalisation
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.querySelector("#map").innerHTML = "L'utilisateur a refusé la géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector("#map").innerHTML = "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            document.querySelector("#map").innerHTML = "La demande de localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            document.querySelector("#map").innerHTML = "Une erreur inconnue est survenue.";
            break;
    }
}
