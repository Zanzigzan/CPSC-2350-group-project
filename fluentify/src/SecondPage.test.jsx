import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SecondPage from "./SecondPage";
import { LanguageProvider } from "./context/LanguageContext";
import * as LanguageContextModule from "./context/LanguageContext";
import * as googleApi from "./api/google";

//mock translate function
const translateSpy = vi.spyOn(googleApi, "translate").mockResolvedValue({
  translatedText: "Hallo Welt",
  detectedSourceLanguage: "en",
});

//mock useLanguage
const useLanguageSpy = vi
  .spyOn(LanguageContextModule, "useLanguage") 
  .mockReturnValue({
    language: "de", // target language
    text: "Hello World", // og text
  });

//rendering SecondPage
describe("SecondPage component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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
//add wait time for async functions
//print to console with and without texts



