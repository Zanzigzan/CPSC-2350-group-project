import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "./components/TranslatedText";
import Logo from "./components/Logo";
import QuizDisplay from "./components/QuizDisplay";
import { useLanguage } from "./context/LanguageContext";
import { translate } from './api/google';

const SecondPage = () => {
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const { language, text, setTranslatedText, setSourceLanguage} = useLanguage();
  
  useEffect(() => {
    TranslateText();
  }, []);

  async function TranslateText() {
    if (translating) return;
    setTranslating(true);

    try {
      const result = await translate(text, language);
      setTranslatedText(result.translatedText);
      setSourceLanguage(result.detectedSourceLanguage);
    } catch (e) {
      setError(e.message);
    } finally {
      setTranslating(false);
    }

  }

  return (
    <div>
      <div className="flex justify-between items-center pl-8 pr-8">
        <Link to="/"> {/* Link to the root route */}
          <Logo />
        </Link>
        <div className="flex">
          <Link
            to="/"
            className="bg-red-700 hover:bg-red-900 text-white text-lg font-bold py-2 px-4 rounded"
          >
            Click Here to Exit
          </Link>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="w-3/4 p-4 px-8 pb-8">
          <TranslatedText translating={translating}/>
        </div>
        <div className="w-1/4 p-4 px-8 pb-8 md:100svh">
          <QuizDisplay translating={translating}/>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
