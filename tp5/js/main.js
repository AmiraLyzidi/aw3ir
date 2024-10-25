var app;
window.onload = function () {
    app = new Vue({
        el: "#weatherApp", // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
        data: {
            // Indicateur de chargement de l'application
            loaded: false,

            // Variable utilisée dans le formulaire via v-model
            formCityName: "",

            // Messages d'affichage
            message: "WebApp Loaded.",
            messageForm: "",

            // Liste des villes saisies, initialisée avec Paris
            cityList: [
                {
                    name: "Paris",
                },
            ],

            // Données météo reçues par OpenWeatherMap
            cityWeather: null,

            // Indicateur de chargement pour la météo
            cityWeatherLoading: false,
        },

        // Exécutée une fois l'application VUE totalement disponible
        mounted: function () {
            this.loaded = true;
            this.readData();
        },

        // Définition des méthodes pour traiter les données dans data
        methods: {
            // Méthode pour lire les données de la ville
            readData: function () {
                console.log("JSON.stringify(this.cityList)", JSON.stringify(this.cityList)); // Affiche la liste des villes
                console.log("this.loaded:", this.loaded); // Affiche 'this.loaded: true'
            },

            // Ajoute une ville à la liste
            addCity: function (event) {
                event.preventDefault(); // Empêche le rechargement de la page
                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = 'existe déjà';
                } else {
                    this.cityList.push({ name: this.formCityName });
                    this.messageForm = ""; // Réinitialise le message
                    this.formCityName = ""; // Réinitialise le champ de saisie
                }
            },

            // Vérifie si la ville existe déjà dans la liste
            isCityExist: function (_cityName) {
                return this.cityList.filter(item => item.name.toUpperCase() === _cityName.toUpperCase()).length > 0;
            },

            // Supprime une ville de la liste
            remove: function (_city) {
                this.cityList = this.cityList.filter(item => item.name !== _city.name);
            },

            // Demande des données météo à OpenWeatherMap pour la ville sélectionnée
            meteo: function (_city) {
                this.cityWeatherLoading = true;
                const apiKey = 'bb796d87af0ecef6d855b096cddf28a4'; // Remplacez par votre vraie clé d'API

                // Appel AJAX avec fetch
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${_city.name}&units=metric&lang=fr&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(json => {
                        this.cityWeatherLoading = false;
                        if (json.cod === 200) {
                            // Réponse OK, on met les données météo dans cityWeather
                            this.cityWeather = json;
                            this.message = null;
                        } else {
                            // Erreur, on affiche un message d'erreur
                            this.cityWeather = null;
                            this.message = 'Météo introuvable pour ' + _city.name + ' (' + json.message + ')';
                        }
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des données météo :", error);
                        this.cityWeatherLoading = false;
                    });
            }
        }
    });
};
