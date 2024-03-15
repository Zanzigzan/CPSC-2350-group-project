const { generateText } = require('./openai.js');

describe('generateText', () => {
    it('should return an error message for very hard difficulty', async () => {
        const result = await generateText('very hard');
        expect(result).toBe('Unknown difficulty very hard! It should be easy, medium, or hard.');
    });
});