import { describe, it, expect } from "vitest";
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../App'
import { LanguageProvider } from "../context/LanguageContext";

describe('Generate Text Feature - Check if modal shows up',  ()=>{
    //1st test case
    it('easy button', async () => {
        render(
            <LanguageProvider>
                <App />
            </LanguageProvider>
        );
        const easyButton = screen.getByText('Easy');
        fireEvent.click(easyButton);

        await new Promise((r) => setTimeout(r, 5000));
        expect(screen.getByText('Please'), {hidden:true}).toBeInTheDocument();
  

        // // Find the select dropdown for language selection
        // const languageDropdown = screen.getByRole('combobox', { name: 'Language' });

        // // Select 'FR' from the dropdown menu
        // fireEvent.change(languageDropdown, { target: { value: 'FR' } });

        // // Find and click the 'Confirm' button
        // const confirmButton = screen.getByText('Confirm');
        // fireEvent.click(confirmButton);

    });

  
      
});