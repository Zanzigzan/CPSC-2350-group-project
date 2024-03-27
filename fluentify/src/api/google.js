// API info
const apiUrl = import.meta.env.VITE_GOOGLE_URL;
const apiKey = import.meta.env.VITE_GOOGLE_KEY;

// The function to translate given text
async function translate(text, target) {
    const data = {
        "q": text,
        "target": target,
        "format": "text"
    };

    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.data.translations[0]);

            return {
                "detectedSourceLanguage": result.data.translations[0].detectedSourceLanguage,
                "translatedText": result.data.translations[0].translatedText
            }
        } else {
            // Handle HTTP errors
            console.error("HTTP Error:", response.status, response.statusText);

            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        // Handle other errors
        console.error("Error:", error.message);

        throw error;
    }
}

export  { translate };