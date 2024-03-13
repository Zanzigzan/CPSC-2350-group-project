// API info
const apiUrl = import.meta.env.VITE_GOOGLE_URL;
const apiKey = import.meta.env.VITE_GOOGLE_KEY;

// function to translate given text
export async function Translate() {
    const data = { // TODO
        q: "Hello World!",
        target: "fr"
    };

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    const result = await response.json();

    if (response.ok) {
      // TODO
      console.log(":)");
      console.log(result.data.translations[0].translatedText);
    } else {
      // TODO
      console.log("T-T");
    }
}