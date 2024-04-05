import React, { useEffect, useState } from "react";
import { getTextFromFile } from "../api/getTextFromFile";
import { useLanguage } from "../context/LanguageContext";
import Spinner from "./Spinner";
import { detectLanguage } from "../api/detectLanguage";
import languages from "../data/languages.json";

const SelectFile = (props) => {
  const [reading, setReading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [mouseInside, setMouseInside] = useState(false); // Track mouse inside

  const { setText } = useLanguage();

  useEffect(() => {
    if (selectedFile) setTextContext();
  }, [selectedFile]);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    e.target.value = null;
  }

  const showFileName = () => {
    return selectedFile ? (
      selectedFile.name
    ) : (
      <span>
        Click Here to Upload the File You Want to Translate
      </span>
    );
  };

  function handleSubmit() {
    if (props.loading || !selectedFile || reading) return;
    setSelectedFile(null);
    setDetectedLanguage("");
    props.setIsOpen(true);
  }

  async function setTextContext() {
    props.setLoading(true);
    setReading(true);

    try {
      const readText = await getTextFromFile(selectedFile);
      const detection = await detectLanguage(readText);
      setDetectedLanguage(detection);
      setText(readText);
    } catch (e) {
      if (e.message.startsWith("FileReader Error:")) {
        props.setError("Unable to read file. Please try again later.");
      } else if (e.message.startsWith("Error:HTTP Error:")) {
        props.setError(
          "There was an error with the network. Please try again later.",
        );
      } else {
        props.setError(`${e.message} Please try a different file.`);
      }
      setSelectedFile(null);
      setDetectedLanguage("");
      props.setIsOpen(true);
    } finally {
      setReading(false);
      props.setLoading(false);
    }
  }

  return (
    <div className="w-2/6 h-96 space-y-8 p-4">
      <div className="text-3xl font-medium">Select Your Own Text</div>
      <div
        className="items-center justify-center bg-grey-lighter"
        onMouseEnter={() => setMouseInside(true)} // Set mouse inside to true
        onMouseLeave={() => setMouseInside(false)} // Set mouse inside to false
      >
        <label className="h-40 flex flex-col items-center justify-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-lg leading-normal">
            {mouseInside ? (
              <span>
                Please ensure your document is:
                <br />
                1. Free of errors
                <br />
                2. Strictly in one language
                <br />
                3. Has at least ten words
              </span>
            ) : (
              showFileName()
            )}
          </span>

          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".txt"
          />
        </label>
        {reading ? (
          <div
            className={
              "mt-2 text-blue-400 flex justify-center transform -translate-x-3"
            }
          >
            <Spinner size={"25px"} color={"blue-400"} />
            Reading File...
          </div>
        ) : detectedLanguage ? (
          <div className="mt-2 text-blue-400 font-bold">
            Detected Language: {languages[detectedLanguage]}
          </div>
        ) : (
          <div className="mt-2 text-blue-400">
            Please upload file in the .txt format. <br />
          </div>
        )}
      </div>

      <button
        className={
          detectedLanguage && !reading
            ? "bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 pl-6 pr-6 rounded-full"
            : "bg-gray-500 cursor-default text-white text-lg font-bold py-2 pl-6 pr-6 rounded-full"
        }
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default SelectFile;
