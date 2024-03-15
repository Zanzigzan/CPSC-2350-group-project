// API info
const OPENAI_URL = process.env.OPENAI_URL;
const OPENAI_KEY = process.env.OPENAI_KEY;

const OPENAI_GENERATE_TEXT_PROMPT_EASY = process.env.OPENAI_GENERATE_TEXT_PROMPT_EASY;
const OPENAI_GENERATE_TEXT_PROMPT_MEDIUM = process.env.OPENAI_GENERATE_TEXT_PROMPT_MEDIUM;
const OPENAI_GENERATE_TEXT_PROMPT_HARD = process.env.OPENAI_GENERATE_TEXT_PROMPT_HARD;

const prompt = {
    "easy": OPENAI_GENERATE_TEXT_PROMPT_EASY,
    "medium": OPENAI_GENERATE_TEXT_PROMPT_MEDIUM,
    "hard": OPENAI_GENERATE_TEXT_PROMPT_HARD
}

// The function to translate given text
async function generateText(difficulty) {
    // Validation
    difficulty = difficulty.toLowerCase();

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return `Unknown difficulty ${difficulty}! It should be easy, medium, or hard.`;
    }

    // Body
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "content": prompt[difficulty]
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

    // The request
    try {
        const response = await fetch(OPENAI_URL, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Extract and return the generated text
        if (result.choices && result.choices.length > 0) {
            return result.choices[0].message.content;
        } else {
            return 'No response from the API.';
        }
    } catch (error) {
        console.error('Error:', error);
        return `Error: ${error.message}`;
    }
}

module.exports = { generateText };