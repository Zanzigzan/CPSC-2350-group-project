import QuizDisplay from './QuizDisplay';
import { useLanguage } from '../context/LanguageContext.jsx'
import { describe, expect, it, vi } from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react'

vi.mock('../context/LanguageContext.jsx', () => ({
    useLanguage: vi.fn(),
}));

useLanguage.mockReturnValue({
    translatedText: 'test',
    sourceLanguage: 'en',
});

describe('generate quiz', () => {

    it('should display quiz question and options in quiz display', async () => {
        global.fetch = vi.fn()
            .mockReturnValueOnce(Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    choices: [
                        {
                            message: {
                                content: "[\"test option a\", \"test option b\", \"test option c\", \"test option d\"]"
                            }
                        }
                    ]
                })
            }))
            .mockReturnValueOnce(Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        translations: [
                            {
                                detectedSourceLanguage: "de",
                                translatedText: "test question"
                            }
                        ]
                    }
                })
            }));

        render(<QuizDisplay translating={false}/>);

        const textContent = ['test question', 'test option a', 'test option b', 'test option c', 'test option d'];

        for (const text of textContent) {
            expect(screen.findByText(text)).resolves.toBeInTheDocument();
        }

        const nextButton = await screen.findByText('Next');
        expect(nextButton).toBeInTheDocument();

        expect(nextButton).toHaveClass('invisible');
        fireEvent.click(await screen.findByText('test option a'));
        expect(nextButton).toHaveClass('visible');
    });


    it('should display error when an error is encountered while generating quiz', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: () => Promise.resolve({})
            })
        );

        render(<QuizDisplay translating={false}/>);

        expect(screen.findByText('HTTP error! Status: 500')).resolves.toBeInTheDocument();
        expect(screen.findByText('Try again.')).resolves.toBeInTheDocument();
    });
});