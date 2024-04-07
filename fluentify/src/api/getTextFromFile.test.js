import { getTextFromFile } from './getTextFromFile.js';
import { describe, expect, it } from 'vitest';

describe('getTextFromFile', () => {

    it('should return the content of a text file with at least 10 words', async () => {
        const content = 'Hello! This is a file with at least 10 words.';

        const file = new File([content], 'test.txt', {
            type: 'text/plain',
        });

        const result = await getTextFromFile(file);
        expect(result).toBe('Hello! This is a file with at least 10 words.');
    });

    it('should throw error when given a text file containing less than 10 words.', async () => {
        const content = 'This is a file with less than 10 words.';

        const file = new File([content], 'test.txt', {
            type: 'text/plain',
        });
        
        await expect(getTextFromFile(file)).rejects.toThrow('Please upload a file that contains at least 10 words.');
    });

    it('should throw error when given files that are not of type text.', async () => {
        const content = 'Hello! This is a file with at least 10 words.';

        const file = new File([content], 'test.pdf', {
            type: 'application/pdf',
        });
        
        await expect(getTextFromFile(file)).rejects.toThrow('Only text files are accepted.');
    });
});