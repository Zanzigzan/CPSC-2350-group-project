import { generateQuiz } from './quiz.js';
import { describe, it, expect, vi } from 'vitest';

const text = "Maria decided to visit the park. She put on her favorite blue hat and grabbed her water bottle.";
const targetLanguage = "de";

vi.mock('./util.js', () => ({
    generateArrayOfWordsForQuiz: vi.fn().mockResolvedValue(['blue', 'hat', 'park', 'bottle']),
    selectRandom: vi.fn().mockReturnValue('bottle'),
    isValidArrayFormat: vi.fn().mockReturnValue(true),
}));

vi.mock('./google.js', () => ({
    translate: vi.fn().mockResolvedValue({ translatedText: 'flasche' }),
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: '["blue", "hat", "park", "bottle"]' } }] }),
    })
);

describe('generateQuiz', () => {
    it('should return a response with correctAnswer', async () => {
        const response = await generateQuiz(text, targetLanguage);
        expect(response).toHaveProperty('correctAnswer');
    });

    it('should have correctAnswer equal to one of the answers', async () => {
        const response = await generateQuiz(text, targetLanguage);
        const answers = [response.answer1, response.answer2, response.answer3, response.answer4];
        expect(answers).toContain(response.correctAnswer);
    });
});
