// API info
const OPENAI_URL = import.meta.OPENAI_URL;
const OPENAI_KEY = import.meta.OPENAI_KEY;

const OPENAI_GENERATE_QUIZ_PROMPT = import.meta.env.OPENAI_GENERATE_QUIZ_PROMPT;

async function generateQuiz(text, detectedSourceLanguage) {
    // Body
    const data = {
        "model": "gpt-3.5-turbo",
            "messages": [{
                "role": "user",
                "content": `OPENAI_GENERATE_QUIZ_PROMPT "${text}"`
            }]
    }

    // Request options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify(data)
    };
}