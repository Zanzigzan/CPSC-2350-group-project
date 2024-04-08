# Fluentify
#### convenient language learning web application for intermediate level learners. Expand your vocabulary and improve your reading comprehension in fun ways!

[🚀**TAKE ME THERE**🚀](https://fluent-ify.netlify.app)

## Features

- Natural translation in 5 languages: English, Chinese (Simplified), French, German, Japanese, Spanish
- Upload files for translation
- Automatic language detection of files
- Generate texts for translation (*NOTE: not available in English*)
- Customize difficulty of generated text
- Quiz to practice vocabulary using words from the translated text 

## Instructions

### Prerequisites

1. [Node and npm](https://nodejs.org/en/download/) are installed. Please note that Node v18+ and npm v10+ is required.

    ```fish
    $ node --version
    vv18.18.0

    $ npm --version
    10.5.0
    ```

2. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is installed. 

    ```fish
    $ git --version
    git version 2.43.0.windows.1
    ```

### Environment Variable

Enter the following commands on your terminal:
```fish
$ git clone https://github.com/Zanzigzan/CPSC-2350-group-project.git
$ cd fluentify
```

Create a `.env` file on a text - editing software and configure the environment variables using the format: `VITE_GOOGLE_KEY= AIzaSyxxxxxx...xxxxxx`.

Refer to the table below:

| Environment Variable | Required | Description                                                                                                                                                               | Example                                                                                                              |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `VITE_GOOGLE_URL`     | Yes      | If you manually configure the Google interface proxy, you can use this configuration item to override the default Google API request base URL page                                                                                                                  | The default value is<br/>`https://translation.googleapis.com/language/translate/v2`                                                                                                 |
| `VITE_GOOGLE_KEY`   | Yes       | This is the API key you apply on the Google Cloud account                              | `AIzaSyxxxxxx...xxxxxx` |
| `VITE_OPENAI_URL`        | Yes       | If you manually configure the OpenAI interface proxy, you can use this configuration item to override the default OpenAI API request base URL                              | The default value is<br/> `https://api.openai.com/v1/chat/completions`                                                                                                                   |
| `VITE_OPENAI_KEY`      | Yes       | This is the API key you apply on the OpenAI account | `sk-xxxxxx...xxxxxx`                                                                                |
| `VITE_OPENAI_GENERATE_TEXT_PROMPT_EASY`     | Yes      | This is the prompt used to generate text for easy level.                                                                                                                  | The default value is<br/>`Generate an easy-to-read text suitable for beginners learning a language. The text should be between 500-700 words.`                                                                                                                                  |
| `VITE_OPENAI_GENERATE_TEXT_PROMPT_MEDIUM`   | Yes       | This is the prompt used to generate text for medium level.                             | The default value is<br/>`Generate a text with medium difficulty, including a mix of simple and intermediate vocabulary and sentence structures. The text should be between 500-700 words, suitable for learners with some prior knowledge of a language.` |
| `VITE_OPENAI_GENERATE_TEXT_PROMPT_HARD`        | Yes       | This is the prompt used to generate text for hard level.                              | The default value is<br/>`Generate a challenging text with advanced vocabulary and complex sentence structures. The text should be between 500-700 words, suitable for advanced learners of a language.`                                                            |
| `VITE_OPENAI_GENERATE_QUIZ_PROMPT`      | Yes       | This is the prompt used to generate words for the vocabulary quiz. | The default value is<br/>`Extract the four hardest words from the following text in the ["word1", "word2", "word3", "word4"] format, and replay with only those words. The text:`                                                                                |

### Enter the following commands on your terminal to run Fluentify locally:

```fish
$ npm install 
$ npm run dev
> fluentify@0.0.0 dev
> vite
  VITE v5.2.6  ready in 855 ms

  ➜  Local:   http://localhost:xxxx/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
Press `ctrl` while clicking `http://localhost:xxxx/`.

Fluentify should start in your default browser.

### To run tests, enter the following command on your terminal:

```fish
$ npm run test
```

## Tech stack

- React
- Tailwind CSS
- Vite for Builds
- Vitest and Cypress for Testing
- Netlify

## License

Fluentify is [MIT licensed](https://github.com/Zanzigzan/CPSC-2350-group-project/blob/main/LICENSE).

## Contributors
[Pawel Michalski](https://github.com/Zanzigzan), [Shushama Tahsin](https://github.com/stahsin00), [Van Valdez](https://github.com/vanvaldez), [Isabelle Wang](https://github.com/Isabellewn)
