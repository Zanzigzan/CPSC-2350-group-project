import { describe, it, expect } from "vitest";
import {render, fireEvent} from '../utils/test.utils';
import App from '../App'
import { LanguageProvider } from "../context/LanguageContext";

describe('Generate Text Feature - Check if modal shows up', ()=>{
    //1st test case
    it('check if the generateText component is present', () => {
        const { getByTestId } = render(
            <LanguageProvider>
                <App />
            </LanguageProvider>
        );
        const GenerateTextComponent = getByTestId('generate-text')
        expect(GenerateTextComponent).toBeInTheDocument();  
    });

    //2nd test case
    it('opens modal when button in generateText component is clicked', async () => {
        const { getByTestId } = render(
            <LanguageProvider>
                <App />
            </LanguageProvider>
        );

        const generateTextButton = getByTestId('easy');
        fireEvent.click(generateTextButton); 

        await new Promise((r) => setTimeout(r, 5000));
        const modal = getByTestId('main-page-modal', {hidden:true});
        expect(modal).toBeInTheDocument();

      }); 
      
      //3rd test case
      it('check if the article is present after choosing a language', ()=>{

      })
});