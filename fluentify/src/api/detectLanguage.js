// API info
const apiUrl = `${import.meta.env.VITE_GOOGLE_URL}/detect`;
const apiKey = import.meta.env.VITE_GOOGLE_KEY;

// The function to detects the language of the given text
async function detectLanguage(text) {
    const data = {
        "q": text
    };

    const confidenceThreshold = 0.9;

    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok && (result.data.detections[0][0].confidence > confidenceThreshold)) {
            // returns the detected language when confidence is above the given threshold
            return result.data.detections[0][0].language;
            
        } else if (response.ok) {
            // Low confidence in language detection
            console.error(`Unable to detect language of given text. Confidence of: ${result.data.detections[0][0].confidence}`);

            throw new Error("Unable to detect language of given text.");
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

export  { detectLanguage };