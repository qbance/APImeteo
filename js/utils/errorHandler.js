

export function handleApiError(error, customMessage = "") {
    console.error("Erreur interceptée :", error);

    if (!navigator.onLine) {
        return "Vous semblez hors ligne. Vérifiez votre connexion Internet.";
    }

    switch (error.message) {
        case "404":
            return "Ville introuvable. Veuillez vérifier l'orthographe.";
        case "401":
            return "Erreur d'authentification : clé API invalide ou non activée.";
        case "429":
            return "Trop de requêtes effectuées. Veuillez patienter un instant.";
        default:
            return customMessage || "Une erreur est survenue lors de la récupération des données météo.";
    }
}