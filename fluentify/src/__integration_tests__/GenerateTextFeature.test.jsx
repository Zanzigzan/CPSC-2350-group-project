import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../App'
import { LanguageProvider } from "../context/LanguageContext";


describe('Generate Text Feature - Check if modal shows up after clicking button',  ()=>{
    it('easy button', async () => {
        render(
            <LanguageProvider>
                <App />
            </LanguageProvider>
        );
        const easyButton = screen.getByTestId('easy');
        fireEvent.click(easyButton);

        await vi.waitFor(() => {
            expect(screen.getByText('Language')).toBeInTheDocument();
          }, { timeout: 5000 });
          
        expect(screen.getByText('language'), {hidden:true}).toBeInTheDocument();
  
        const languageDropdown = screen.getByRole('combobox', { name: 'Language' });

        fireEvent.change(languageDropdown, { target: { value: 'FR' } });

        const confirmButton = screen.getByText('Confirm');
        fireEvent.click(confirmButton);

    });

      
});