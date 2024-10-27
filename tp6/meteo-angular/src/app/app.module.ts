// Début du fichier
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from "@angular/router"; // Importation du module Router

import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail.component'; // Importation correcte de MeteoDetailComponent
import { MeteoService } from './services/meteo.service'; // Importation de MeteoService

// Définition des routes
const appRoutes: Routes = [
  {
    path: "", // la page principale utilisera le component suivant
    component: MeteoComponent,
  },
  {
    path: "meteo/:name", // la page affichant la météo prendra comme paramètre 'name'
    component: MeteoDetailComponent, // Ce component fera l'appel AJAX et affichera les données reçues par openWeatherMap
  },
  {
    path: "**", // un chemin vers une page inexistante redirigera vers '/'
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    MeteoDetailComponent, // Ajout de MeteoDetailComponent ici
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }) // Ajout de RouterModule avec les routes
  ],
  providers: [DatePipe, MeteoService], // Ajout de MeteoService ici
  bootstrap: [AppComponent]
})
export class AppModule { }
