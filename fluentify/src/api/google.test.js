const { translate } = require('./google.js');

global.fetch = jest.fn(() =>
  Promise.resolve(
    {
    ok: true,
    json: () => Promise.resolve({
        "data": {
            "translations": [
                {
                    "detectedSourceLanguage": "en",
                    "translatedText": "Hallo Welt"
                }
            ]
        }
      }),
    })
);

describe('translate', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return Hallo Welt when translating Hello World to German', async () => {
        const result = await translate('Hello World', 'de');
        expect(result.translatedText).toBe('Hallo Welt');
    });

    it('should return en when detecting language given Hello World', async () => {
        const result = await translate('Hello World', 'de');
        expect(result.detectedSourceLanguage).toBe('en');
    });

    it('should throw error when encountering HTTP error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: () => Promise.resolve({})
            })
        );
        
        await expect(translate('Hello World', 'de')).rejects.toThrow('HTTP Error: 500 Internal Server Error');
    });

    it('should throw error when encountering other errors', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Network Error'))
        );
        
        await expect(translate('Hello World', 'de')).rejects.toThrow('Network Error');
    });
});