import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "./components/TranslatedText";
import Logo from "./components/Logo";
import QuizDisplay from "./components/QuizDisplay";
import { useLanguage } from "./context/LanguageContext";
import { translate } from "./api/google";

const SecondPage = () => {
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");
  const { language, text, setTranslatedText, setSourceLanguage } =
    useLanguage();

  useEffect(() => {
    if (!language || !text) {
      setError("Text and target language not chosen.")
    } else {
      TranslateText();
    }
  }, []);

  async function TranslateText() {
    if (translating) return;
    setTranslating(true);

    try {
      const result = await translate(text, language);
      setTranslatedText(result.translatedText);
      setSourceLanguage(result.detectedSourceLanguage);
    } catch (e) {
      setError("Unable to translate text.");
    } finally {
      setTranslating(false);
    }
  }

  return (
    <div className="max-h-screen ml-auto mr-auto mr-container text-center w-4/5 p-4 rounded flex flex-col ">
      <div className="flex justify-between items-center">
        <Link to="/">
          {" "}
          {/* Link to the root route */}
          <Logo />
        </Link>
        <div className="flex">
          <Link
            to="/"
            className="bg-red-700 hover:bg-red-900 text-white text-lg font-museo font-semibold py-2 px-4 rounded"
          >
            Click Here to Exit
          </Link>
        </div>
      </div>
      <div className="flex-grow mt-8 gap-20 flex flex-row pb-8">
        <div className="mx-auto w-2/3">
          <TranslatedText translating={translating} error={error} />
        </div>
        <div className="mx-auto w-1/3">
          <QuizDisplay translating={translating} />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
