import { isValidArrayFormat, selectRandom } from './util.js';
import { translate } from './google.js'


// API info
const VITE_OPENAI_URL = import.meta.env.VITE_OPENAI_URL;
const VITE_OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

// console.log("OpenAI URL:", VITE_OPENAI_URL);
// console.log("OpenAI Key:", VITE_OPENAI_KEY);

const VITE_OPENAI_GENERATE_QUIZ_PROMPT = import.meta.env.VITE_OPENAI_GENERATE_QUIZ_PROMPT;

// console.log("OpenAI Prompt:", VITE_OPENAI_GENERATE_QUIZ_PROMPT);

export async function generateQuiz(text, sourceLanguage) {
    try {
        const words = await generateArrayOfWordsForQuiz(text);

        const correctWord = selectRandom(words);

        console.log(correctWord);

        const translatedCorrectWordData = await translate(correctWord, sourceLanguage)
        const translatedCorrectWord = translatedCorrectWordData['translatedText']

        console.log(translatedCorrectWord)
        
        return words;
    } catch (error) {
        console.error('Error:', error);
        throw (error instanceof Error) ? error : new Error(error);
    }
}

async function generateArrayOfWordsForQuiz(text) {
    // Body
    const data = {
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "user",
            "content": `${VITE_OPENAI_GENERATE_QUIZ_PROMPT} "${text}"`
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

// let text = "The annual summer festival is a highlight in our small town. The event brings together people from all walks of life to celebrate music, food, and community spirit. The festivities kick off with a parade through the main street, featuring colorful floats and marching bands. One of the main attractions at the festival is the local artisans' market, where visitors can browse and purchase handcrafted jewelry, pottery, and paintings. Food vendors line the streets, offering a variety of delicious dishes from around the world. From spicy tacos to sweet churros, there is something to please every palate. Live music fills the air throughout the weekend, with bands playing everything from rock and country to jazz and reggae. People can be seen dancing in the streets, enjoying the lively atmosphere. Children are entertained with games and activities, including face painting and a bouncy castle. The festival is a great opportunity for neighbors to come together and connect, sharing stories and laughter. It truly captures the essence of our tight-knit community. As the sun sets on the final day, fireworks light up the sky, marking the end of another successful event. We look forward to next year's festival with anticipation and excitement.";
// let frText = "Le festival d'été annuel est un moment fort dans notre petite ville. L'événement rassemble des personnes de tous horizons pour célébrer la musique, la gastronomie et l'esprit communautaire. Les festivités démarrent par un défilé dans la rue principale, avec des chars colorés et des fanfares. L'une des principales attractions du festival est le marché des artisans locaux, où les visiteurs peuvent parcourir et acheter des bijoux, des poteries et des peintures artisanales. Les vendeurs de nourriture bordent les rues, proposant une variété de plats délicieux du monde entier. Des tacos épicés aux churros sucrés, il y en a pour tous les goûts. La musique live remplit l'air tout au long du week-end, avec des groupes jouant de tout, du rock à la country en passant par le jazz et le reggae. On peut voir les gens danser dans les rues, profitant de l’atmosphère animée. Les enfants s'amuseront avec des jeux et des activités, notamment du maquillage et un château gonflable. Le festival est une excellente occasion pour les voisins de se réunir et de se connecter, de partager des histoires et de rire. Il capture véritablement l’essence de notre communauté soudée. Alors que le soleil se couche le dernier jour, des feux d'artifice illuminent le ciel, marquant la fin d'un autre événement réussi. Nous attendons avec impatience le festival de l’année prochaine avec impatience et enthousiasme."
// console.log(await generateQuiz(frText, "DE"))