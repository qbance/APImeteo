// js/app.js
import { fetchMeteoParVille } from './api.js';
import { afficherMeteo } from './ui.js';

const btnRechercher = document.getElementById('btnRechercher');
const villeInput = document.getElementById('ville-input');
const divErreur = document.getElementById('erreur');
const divResultat = document.getElementById('resultat');
const divLoader = document.getElementById('loader');

async function lancerRecherche(ville) {
    if (!ville) {
        divErreur.textContent = "Veuillez entrer un nom de ville.";
        return;
    }

    divErreur.textContent = "";
    divResultat.innerHTML = "";
    if (divLoader) divLoader.style.display = "block";

    try {
        const data = await fetchMeteoParVille(ville);
        afficherMeteo(data);
        localStorage.setItem('derniereVille', ville);
    } catch (error) {
        divErreur.textContent = error.message;
    } finally {
        if (divLoader) divLoader.style.display = "none";
    }
}

btnRechercher.addEventListener('click', () => {
    const ville = villeInput.value.trim();
    lancerRecherche(ville);
});

villeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const ville = villeInput.value.trim();
        lancerRecherche(ville);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const villeSauvegardee = localStorage.getItem('derniereVille');
    if (villeSauvegardee) {
        villeInput.value = villeSauvegardee;
        lancerRecherche(villeSauvegardee);
    }
});