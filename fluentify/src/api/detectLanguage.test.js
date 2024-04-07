import { detectLanguage } from './detectLanguage.js';
import { describe, expect, it, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('detectLanguage', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return en when detecting language given Hello World', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    detections: [[{
                        language: 'en',
                        isReliable: false,
                        confidence: 1
                    }]]
                }
            }),
        });

        const result = await detectLanguage('Hello World');
        expect(result).toBe('en');
    });

    it('should throw error when detection confidence is low', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    detections: [[{
                        language: 'en',
                        isReliable: false,
                        confidence: 0.56
                    }]]
                }
            }),
        });
        
        await expect(detectLanguage('akfhfhhgdso')).rejects.toThrow('Unable to detect language of given text.');
    });
});