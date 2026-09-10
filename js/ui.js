const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];


function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return '<i class="fa-solid fa-cloud-bolt" style="color:#7B68EE; font-size:2rem;"></i>';
    if (weatherId >= 300 && weatherId < 400) return '<i class="fa-solid fa-cloud-drizzle" style="color:#74b9ff; font-size:2rem;"></i>';
    if (weatherId === 511) return '<i class="fa-solid fa-cloud-meatball" style="color:#a29bfe; font-size:2rem;"></i>';
    if (weatherId >= 500 && weatherId < 600) return '<i class="fa-solid fa-cloud-showers-heavy" style="color:#0984e3; font-size:2rem;"></i>';
    if (weatherId >= 600 && weatherId < 700) return '<i class="fa-solid fa-snowflake" style="color:#81ecec; font-size:2rem;"></i>';
    if (weatherId >= 700 && weatherId < 800) return '<i class="fa-solid fa-smog" style="color:#b2bec3; font-size:2rem;"></i>';
    if (weatherId === 800) return '<i class="fa-solid fa-sun" style="color:#fdcb6e; font-size:2rem;"></i>';
    if (weatherId === 801 || weatherId === 802) return '<i class="fa-solid fa-cloud-sun" style="color:#fdcb6e; font-size:2rem;"></i>';
    return '<i class="fa-solid fa-cloud" style="color:#636e72; font-size:2rem;"></i>';
}


export function afficherMeteo(data) {
    const resultat = document.getElementById('resultat');
    const titreVille = document.getElementById('titre-ville');
    
    
    const previsions = data.list.filter((item, index) => index % 8 === 0);
    const aujourdHui = new Date();
    
   
    const debutAujourdHui = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), aujourdHui.getDate());

    const phrases = previsions.map(item => {
        const date = new Date(item.dt_txt);
        const debutDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const diffDays = Math.round((debutDate - debutAujourdHui) / (1000 * 60 * 60 * 24));

        let labelJour;
        if (diffDays === 0) labelJour = "Aujourd'hui";
        else if (diffDays === 1) labelJour = "Demain";
        else labelJour = jours[date.getDay()];

        const temp = Math.round(item.main.temp);
        let tempColor = temp >= 25 ? "#F54927" : (temp >= 20 ? "#C856BB" : "#3C36E7");

        const weatherId = item.weather[0].id;
        const descMaj = item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1);

        return `
            <div class="carte">
                <span>${labelJour}</span><br>
                <span class="weather-icon">${getWeatherIcon(weatherId)}</span>
                <span>${descMaj}</span>
                <span style="color:${tempColor}; font-weight: bold;"><i class="fa-solid fa-temperature-half"></i> ${temp}°C</span>
                <span><i class="fa-solid fa-droplet" style="color:#64b5f6"></i> ${item.main.humidity}%HR</span>
                <span><i class="fa-solid fa-wind" style="color:#64b5f6"></i> ${Math.round(item.wind.speed)} km/h</span>
            </div>
        `;
    });

    titreVille.textContent = `Ma météo de ${data.city.name}`;
    resultat.innerHTML = phrases.join('');
}

export function afficherErreur(message) {
    const erreur = document.getElementById('erreur');
    const resultat = document.getElementById('resultat');
    erreur.textContent = `❌ ${message}`;
    resultat.innerHTML = '';
}

export function effacerErreur() {
    document.getElementById('erreur').textContent = '';
}