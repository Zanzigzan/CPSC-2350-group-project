import QuizDisplay from './QuizDisplay';
import { useLanguage } from '../context/LanguageContext.jsx';
import { generateQuiz } from '../api/quiz.js';
import { describe, expect, it, vi } from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';

vi.mock('../context/LanguageContext.jsx', () => ({
    useLanguage: vi.fn(),
}));

useLanguage.mockReturnValue({
    translatedText: 'test',
    sourceLanguage: 'en',
});

vi.mock('../api/quiz.js', () => ({
    generateQuiz: vi.fn(),
}));

describe('generate quiz', () => {

    it('should display quiz question and options in quiz display', async () => {
        generateQuiz.mockReturnValue(Promise.resolve({
            "question": "test question",
            "answer1": "test option a",
            "answer2": "test option b",
            "answer3": "test option c",
            "answer4": "test option d",
            "correctAnswer": "test option a"
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
        generateQuiz.mockReturnValue(Promise.reject(
            new Error('HTTP error! Status: 500')
        ));

        render(<QuizDisplay translating={false}/>);

        expect(screen.findByText('HTTP error! Status: 500')).resolves.toBeInTheDocument();
        expect(screen.findByText('Try again.')).resolves.toBeInTheDocument();
    });
});