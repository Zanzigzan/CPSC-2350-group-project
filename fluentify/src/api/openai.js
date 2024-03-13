// API info
const apiUrl = import.meta.env.OPENAI_URL;
const apiKey = import.meta.env.OPENAI_KEY;

// The function to translate given text
export async function generateText(difficulty) {
    difficulty = difficulty.toLowerCase();

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return `Unknown difficulty ${difficulty}! It should be easy, medium, or hard.`;
    }
}