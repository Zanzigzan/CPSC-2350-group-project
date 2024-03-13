// API info
const apiUrl = import.meta.env.OPENAI_URL;
const apiKey = import.meta.env.OPENAI_KEY;

const OPENAI_GENERATE_TEXT_PROMPT_EASY = import.meta.env.OPENAI_GENERATE_TEXT_PROMPT_EASY;
const OPENAI_GENERATE_TEXT_PROMPT_MEDIUM = import.meta.env.OPENAI_GENERATE_TEXT_PROMPT_MEDIUM;
const OPENAI_GENERATE_TEXT_PROMPT_HARD = import.meta.env.OPENAI_GENERATE_TEXT_PROMPT_HARD;

// The function to translate given text
export async function generateText(difficulty) {
    difficulty = difficulty.toLowerCase();

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return `Unknown difficulty ${difficulty}! It should be easy, medium, or hard.`;
    }


}