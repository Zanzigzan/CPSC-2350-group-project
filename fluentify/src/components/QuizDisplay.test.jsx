import QuizDisplay from './QuizDisplay';
import { useLanguage } from '../context/LanguageContext.jsx'
import { describe, expect, it, vi } from 'vitest';
import {render, screen} from '@testing-library/react'

vi.mock('../context/LanguageContext.jsx', () => ({
    useLanguage: vi.fn(),
}));

useLanguage.mockReturnValue({
    translatedText: 'test',
    sourceLanguage: 'en',
});

describe('generate quiz', () => {
    it('should display error when an error is encountered', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                json: () => Promise.resolve({})
            })
        );

        render(<QuizDisplay translating={false}/>);

        await expect(screen.findByText('HTTP error! Status: 500')).resolves.toBeInTheDocument();
        await expect(screen.findByText('Try again.')).resolves.toBeInTheDocument();
    });
});