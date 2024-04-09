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

    it('should throw an error for HTTP errors', async () => {
        fetch.mockRejectedValue(new Error('HTTP error! Status: 500'));

        await expect(generateText('easy')).rejects.toThrow('HTTP error! Status: 500');
    });

    it('should return a specific error message for unexpected API responses', async () => {
        const mockResponse = {};

        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        });

        const result = await generateText('easy');
        expect(result).toBe('No response from the API.');
    });
});
