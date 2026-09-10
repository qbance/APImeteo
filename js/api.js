
import { handleApiError } from './utils/errorHandler.js';

export async function fetchMeteoParVille(ville) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

    try {
        const response = await fetch(url);

     
        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        const data = await response.json();
        return data;

    } catch (error) {
        
        const userMessage = handleApiError(error);
        throw new Error(userMessage);
    }
}