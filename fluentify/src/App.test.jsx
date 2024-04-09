import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { useLanguage } from "./context/LanguageContext.jsx";



vi.mock("./context/LanguageContext.jsx", () => ({
  useLanguage: vi.fn(),
}));

useLanguage.mockReturnValue({
  setText: vi.fn(),
});


describe("Main Page", () => {
//(Upload) integration test: add file + check if the file has more than 10 words + notify user
  it("error message shows up when the uploaded file is less than 10 words", async () => {
    render(<App />);

    // Create a text file with less than 10 words named Lost_Kitten.txt
    const fileContent = "Title: The Lost Kitten";

    const file = new File([fileContent], "Lost_Kitten.txt", {
      type: "text/plain",
    });

    // Get the UI elements for the submission box and submit button
    const input = screen.getByLabelText("Upload the File You Want to Translate");
    const submitButton = screen.getByText("Submit");

    //user uploads the file and submits
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(submitButton);

    //pop up should be displayed with the error message
    await screen.findByTestId("upload-error-content")
  });

  it("error message shows up when the uploaded file is in unsupported language", async () => {
    render(<App />);

    // Create a text file in Greenlandic named Greenland.txt
    const fileContent = "Ulla nunatsinni Uumasut Ikinngutaannut qaammatip aappaata affaata matuma siorna tunniunneqarpoq, qitsuararlu sapaatit akunneri arlaqanngitsut ingerlariitsiaannartut puallaarippasippallaaleqimmat uumasut ikinngutaanniittut qitsuaraq uumasut nakorsaannukaanniarlugu isumaqatigiipput.";

    const file = new File([fileContent], "Greenland.txt", {
      type: "text/plain",
    });

    // Get the UI elements for the submission box and submit button
    const input = screen.getByLabelText("Upload the File You Want to Translate");
    const submitButton = screen.getByText("Submit");

    //user uploads the file and submits
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(submitButton);

    //pop up should be displayed with the error message
    await screen.findByTestId("upload-error-content")
  });
});
