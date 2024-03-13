// API info
const OPENAI_URL = import.meta.env.OPENAI_URL;
const OPENAI_KEY = import.meta.env.OPENAI_KEY;

const OPENAI_GENERATE_TEXT_PROMPT_EASY = import.meta.env.OPENAI_GENERATE_TEXT_PROMPT_EASY;
const OPENAI_GENERATE_TEXT_PROMPT_MEDIUM = import.meta.env.OPENAI_GENERATE_TEXT_PROMPT_MEDIUM;
const OPENAI_GENERATE_TEXT_PROMPT_HARD = import.meta.env.OPENAI_GENERATE_TEXT_PROMPT_HARD;

const prompt = {
    "easy": OPENAI_GENERATE_TEXT_PROMPT_EASY,
    "medium": OPENAI_GENERATE_TEXT_PROMPT_MEDIUM,
    "hard": OPENAI_GENERATE_TEXT_PROMPT_HARD
}

// The function to translate given text
export async function generateText(difficulty) {
    // Validation
    difficulty = difficulty.toLowerCase();

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return `Unknown difficulty ${difficulty}! It should be easy, medium, or hard.`;
    }

    // Data to be send
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "message": prompt[difficulty]
        }]
    }
}