import { generateText } from './openai.js';
import { describe, expect, it } from 'vitest';

describe('generateText', () => {
    it('should return an error message for very hard difficulty', async () => {
        const result = await generateText('very hard');
        expect(result).toBe('Unknown difficulty very hard! It should be easy, medium, or hard.');
    });
});