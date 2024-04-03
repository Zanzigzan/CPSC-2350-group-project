import { generateText } from './openai.js';
import { describe, expect, it, vi } from 'vitest';

const text = "Maria decided to visit the park. She put on her favorite blue hat and grabbed her water bottle.";

global.fetch = vi.fn();

describe('generateText', () => {
    it('should return a non-error response for valid input', async () => {
        const difficulties = ['easy', 'medium', 'hard'];
        const mockResponse = { choices: [{ message: { content: text } }] };

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        });

        for (const difficulty of difficulties) {
            const result = await generateText(difficulty);
            expect(result).toBe(text);
        }
    });

    it('should return an error message for very hard difficulty', async () => {
        const result = await generateText('very hard');
        expect(result).toBe('Unknown difficulty very hard! It should be easy, medium, or hard.');
    });
});
