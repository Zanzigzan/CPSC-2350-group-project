import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Main Page", () => {  
    //file has more than 10 words
    it("allows user upload for files with more than 10 words", () => {
        render(<App />);
    
        const file = new File(["Hello World"], "hello.txt", { type: "text/plain" });
        const input = screen.getByLabelText("Select a file");
        const submitButton = screen.getByText("Submit");
    
        vi(input).fire.change(file);
        vi(submitButton).fire.click();
    
        expect(screen.getByText("Hello World")).toBeInTheDocument();
    });
    

    it("renders translated text", async () => {
      render(
        <LanguageProvider>
          <MemoryRouter>
            <SecondPage />
          </MemoryRouter>
        </LanguageProvider>,
      );
  
      let testTranslate = await screen.findByText("Hallo Welt");
  
      expect(translateSpy).toHaveBeenCalledWith("Hello World", "de");
      expect(useLanguageSpy).toHaveBeenCalled();
      expect(testTranslate).toBeInTheDocument();
  
    });
  });