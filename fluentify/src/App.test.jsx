import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { useLanguage } from "./context/LanguageContext";

vi.mock("./context/LanguageContext", () => ({
  useLanguage: vi.fn(),
}));

useLanguage.mockReturnValue({
  translatedText: 'test',
  sourceLanguage: 'en',
});

describe("Main Page", () => {
  //file has more than 10 words
  it("allows user upload for files with more than 10 words", () => {
    render(<App />);

    // text file named Lost_Kitten.txt
    let file = new File(
      [
        "Title: The Lost Kitten \n Once upon a time, in a small village nestled between rolling green hills, there lived a little girl named Lily. Lily had always wanted a pet, so one sunny afternoon, she decided to take a walk through the meadow to see if she could find one. \n As she wandered, she heard a faint meowing coming from behind a bush. Curious, she approached and discovered a tiny, trembling kitten. Its fur was matted and dirty, and it looked very scared. \n Lily gently picked up the kitten and cradled it in her arms.",
      ],
      "Lost_Kitten.txt",
      { type: "text/plain" },
    );
    // input element
    let input = screen.getByLabelText("Choose a file");
    // submit button
    const submitButton = screen.getByText("Submit");

    //actions
    input.fire.change(file);
    submitButton.fire.click();

    //file name should be reflected in the page
    expect(screen.getByText("Lost_Kitten.txt")).toBeInTheDocument();
  });
});
