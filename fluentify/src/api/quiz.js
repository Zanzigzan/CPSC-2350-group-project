import { isValidArrayFormat, selectRandom, capitalizeFirstLetter } from './util.js';
import { translate } from './google.js'


// API info
const VITE_OPENAI_URL = import.meta.env.VITE_OPENAI_URL;
const VITE_OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

const VITE_OPENAI_GENERATE_QUIZ_PROMPT = import.meta.env.VITE_OPENAI_GENERATE_QUIZ_PROMPT;


export async function generateQuiz(text, sourceLanguage, usedWords = []) {
    try {
        const words = await generateArrayOfWordsForQuiz(text, usedWords);

        const correctWord = selectRandom(words);

        const translatedCorrectWordData = await translate(correctWord, sourceLanguage);
        const translatedCorrectWord = translatedCorrectWordData['translatedText'];
        
        const response = {
            "question": capitalizeFirstLetter(translatedCorrectWord),
            "answer1": capitalizeFirstLetter(words[0]),
            "answer2": capitalizeFirstLetter(words[1]),
            "answer3": capitalizeFirstLetter(words[2]),
            "answer4": capitalizeFirstLetter(words[3]),
            "correctAnswer": capitalizeFirstLetter(correctWord)
        }
        
        console.log(response); 
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw (error instanceof Error) ? error : new Error(error);
    }
}

async function generateArrayOfWordsForQuiz(text, usedWords = []) {
    let prompt = `${VITE_OPENAI_GENERATE_QUIZ_PROMPT} "${text}". Do not pick `;

    for (let word of usedWords) {
        prompt += `${word}, `;
    }

    // Body
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "content": prompt,
        }]
    };

    // Request options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${VITE_OPENAI_KEY}`
        },
        body: JSON.stringify(data)
    };

    // The request
    try {
        const response = await fetch(VITE_OPENAI_URL, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        // Check for API errors
        if (result.error) {
            throw new Error(result.error.message);
        }

        // Extract and validate the generated text
        if (result.choices && result.choices.length > 0) {
            const content = result.choices[0].message.content;
            if (isValidArrayFormat(content)) {
                const parsedContent = JSON.parse(content);

                return parsedContent;
            } else {
                throw new Error('Result is not in the expected format.');
            }
        } else {
            throw new Error('No response from the API.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw (error instanceof Error) ? error : new Error(error);
    }
}