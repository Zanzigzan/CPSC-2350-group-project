import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SecondPage from "./SecondPage";
import { LanguageProvider } from "./context/LanguageContext";
import * as LanguageContextModule from "./context/LanguageContext";
import * as googleApi from "./api/google";

describe("SecondPage component", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });
  
    //rendering main page
    it("renders without crashing", () => {
      render(
        <LanguageProvider>
          <MemoryRouter>
            <SecondPage />
          </MemoryRouter>
        </LanguageProvider>,
      );
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