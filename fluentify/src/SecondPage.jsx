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
      setError("Text and target language not chosen.");
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
    <div className="h-screen ml-auto mr-auto text-center w-4/5 p-4 rounded flex flex-col">
      <div className="flex justify-between items-center mt-4">
        <Link to="/">
          {" "}
          {/* Link to the root route */}
          <Logo />
        </Link>
        <div className="flex">
          <Link
            to="/"
            className="bg-red-700 hover:bg-red-900 text-white text-lg font-museo font-semibold py-2 px-4 rounded box-shadow: 0 0 0 5px rgba(59, 130, 246, 1.0)"
            style={{ boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
          >
            Click Here to Exit
          </Link>
        </div>
      </div>
      <div className="flex-grow mt-8 gap-20 flex flex-row pb-8">
        <div className="w-2/3">
          <TranslatedText translating={translating} error={error} />
        </div>
        <div className="w-1/3 mx-auto">
          <QuizDisplay translating={translating} />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
